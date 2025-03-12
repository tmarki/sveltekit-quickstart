import { dev } from '$app/environment';
import sgMail from '@sendgrid/mail';
import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Validate environment variables
const envSchema = z.object({
	JWT_SECRET: z.string().min(32),
	SENDGRID_API_KEY: z.string().optional(),
	EMAIL_FROM: z.string().email(),
	REDIS_URL: z.string().optional()
});

const env = envSchema.parse(process.env);

const prisma = new PrismaClient();

// Initialize SendGrid in production
if (!dev && env.SENDGRID_API_KEY) {
	sgMail.setApiKey(env.SENDGRID_API_KEY);
}

// Initialize rate limiter if Redis URL is provided
let ratelimit: Ratelimit | null = null;
if (env.REDIS_URL) {
	const redis = new Redis({
		url: env.REDIS_URL,
		token: env.REDIS_URL.split('@')[1] || '' // Extract token from URL
	});
	ratelimit = new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(5, '5 m') // 5 attempts per 5 minutes
	});
}

interface MagicLinkOptions {
	expiresIn?: string; // JWT expiration time
	emailTemplate?: {
		subject?: string;
		text?: string;
		html?: string;
	};
}

const DEFAULT_OPTIONS: MagicLinkOptions = {
	expiresIn: '15m',
	emailTemplate: {
		subject: 'Your Magic Login Link',
		text: 'Click on this link to log in: {magicLink}',
		html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Login to Your App</h1>
        <p>Click the button below to log in:</p>
        <a href="{magicLink}" 
           style="background-color: #4CAF50; color: white; padding: 14px 20px; 
                  text-align: center; text-decoration: none; display: inline-block; 
                  border-radius: 4px; margin: 20px 0;">
          Login
        </a>
        <p style="color: #666;">Or copy and paste this link in your browser:</p>
        <p style="color: #666; word-break: break-all;">{magicLink}</p>
        <p style="color: #666; font-size: 0.9em;">This link will expire in 15 minutes.</p>
      </div>
    `
	}
};

// Generate a secure CSRF token
export const generateCsrfToken = (): string => {
	return randomBytes(32).toString('hex');
};

// Generate a JWT token
export const generateToken = (email: string, csrfToken: string): string => {
	const payload = {
		email,
		csrfToken,
		type: 'magic-link' as const
	};
	return jwt.sign(payload, env.JWT_SECRET, {
		expiresIn: (DEFAULT_OPTIONS.expiresIn || '15m') as jwt.SignOptions['expiresIn']
	});
};

// Send magic link email
export const sendMagicLink = async (
	email: string,
	options: MagicLinkOptions = DEFAULT_OPTIONS
): Promise<{ success: boolean; error?: string }> => {
	try {
		// Rate limiting check
		if (ratelimit) {
			const result = await ratelimit.limit(email);
			if (!result.success) {
				return {
					success: false,
					error: 'Too many magic link requests. Please try again later.'
				};
			}
		}

		const csrfToken = generateCsrfToken();
		const token = generateToken(email, csrfToken);
		const baseUrl = dev ? 'http://localhost:5173' : 'https://your-production-url.com';
		const magicLink = `${baseUrl}/auth/verify?token=${token}`;

		// Store CSRF token in database
		await prisma.magicLink.create({
			data: {
				email,
				csrfToken,
				expires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
			}
		});

		if (dev) {
			console.log('Magic Link (DEV MODE):', magicLink);
			return { success: true };
		}

		const emailTemplate = {
			...DEFAULT_OPTIONS.emailTemplate,
			...options.emailTemplate
		};

		const msg: sgMail.MailDataRequired = {
			to: email,
			from: env.EMAIL_FROM,
			subject: emailTemplate.subject || 'Your Magic Login Link',
			text: emailTemplate.text?.replace('{magicLink}', magicLink) || '',
			html: emailTemplate.html?.replace(/{magicLink}/g, magicLink) || ''
		};

		await sgMail.send(msg);
		return { success: true };
	} catch (error) {
		console.error('Error sending magic link:', error);
		return {
			success: false,
			error: 'Failed to send magic link. Please try again.'
		};
	}
};

// Verify magic link token
export const verifyToken = async (
	token: string
): Promise<{ valid: boolean; email?: string; error?: string }> => {
	try {
		const decoded = jwt.verify(token, env.JWT_SECRET) as {
			email: string;
			csrfToken: string;
			type: string;
		};

		if (decoded.type !== 'magic-link') {
			return { valid: false, error: 'Invalid token type' };
		}

		const magicLink = await prisma.magicLink.findFirst({
			where: {
				email: decoded.email,
				csrfToken: decoded.csrfToken,
				expires: { gt: new Date() }
			}
		});

		if (!magicLink) {
			return { valid: false, error: 'Invalid or expired token' };
		}

		// Delete the magic link to prevent reuse
		await prisma.magicLink.delete({
			where: { id: magicLink.id }
		});

		return { valid: true, email: decoded.email };
	} catch (error) {
		console.error('Error verifying token:', error);
		return { valid: false, error: 'Invalid token' };
	}
};

// Create or update user session
export const createSession = async (
	email: string
): Promise<{
	sessionToken: string;
	error?: string;
}> => {
	try {
		// Find or create user
		let user = await prisma.user.findUnique({
			where: { email }
		});

		if (!user) {
			user = await prisma.user.create({
				data: { email }
			});
		}

		// Create session token with JWT
		const payload = {
			userId: user.id,
			email: user.email,
			type: 'session' as const
		};
		const sessionToken = jwt.sign(payload, env.JWT_SECRET, {
			expiresIn: '30d' as jwt.SignOptions['expiresIn']
		});

		// Store session in database
		await prisma.session.create({
			data: {
				token: sessionToken,
				userId: user.id,
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
			}
		});

		return { sessionToken };
	} catch (error) {
		console.error('Error creating session:', error);
		return {
			sessionToken: '',
			error: 'Failed to create session'
		};
	}
};

// Verify session token
export const verifySession = async (
	sessionToken: string
): Promise<{
	valid: boolean;
	user?: { id: string; email: string; name?: string };
	error?: string;
}> => {
	try {
		const decoded = jwt.verify(sessionToken, env.JWT_SECRET) as {
			userId: string;
			email: string;
			type: string;
		};

		if (decoded.type !== 'session') {
			return { valid: false, error: 'Invalid token type' };
		}

		const session = await prisma.session.findFirst({
			where: {
				token: sessionToken,
				userId: decoded.userId,
				expires: { gt: new Date() }
			},
			include: { user: true }
		});

		if (!session) {
			return { valid: false, error: 'Invalid or expired session' };
		}

		return {
			valid: true,
			user: {
				id: session.user.id,
				email: session.user.email,
				name: session.user.name || undefined
			}
		};
	} catch (error) {
		console.error('Error verifying session:', error);
		return { valid: false, error: 'Invalid session' };
	}
};

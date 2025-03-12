import { dev } from '$app/environment';
import sgMail from '@sendgrid/mail';
import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Generate a secure token
export const generateToken = (): string => {
  return randomBytes(32).toString('hex');
};

// Send magic link email
export const sendMagicLink = async (email: string, token: string): Promise<boolean> => {
  const baseUrl = dev ? 'http://localhost:5173' : 'https://your-production-url.com';
  const magicLink = `${baseUrl}/auth/verify?token=${token}`;
  
  const msg = {
    to: email,
    from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
    subject: 'Your Magic Login Link',
    text: `Click on this link to log in: ${magicLink}`,
    html: `
      <div>
        <h1>Login to Your App</h1>
        <p>Click the button below to log in:</p>
        <a href="${magicLink}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">
          Login
        </a>
        <p>Or copy and paste this link in your browser:</p>
        <p>${magicLink}</p>
        <p>This link will expire in 15 minutes.</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    
    // Store the token in the database
    await prisma.magicLink.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });
    
    return true;
  } catch (error) {
    console.error('Error sending magic link:', error);
    return false;
  }
};

// Verify magic link token
export const verifyToken = async (token: string): Promise<{ valid: boolean; email?: string }> => {
  const magicLink = await prisma.magicLink.findUnique({
    where: { token },
  });

  if (!magicLink) {
    return { valid: false };
  }

  if (new Date() > magicLink.expires) {
    // Token has expired
    await prisma.magicLink.delete({
      where: { token },
    });
    return { valid: false };
  }

  // Delete the token to prevent reuse
  await prisma.magicLink.delete({
    where: { token },
  });

  return { valid: true, email: magicLink.email };
};

// Create or update user session
export const createSession = async (email: string): Promise<string> => {
  // Find or create user
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email },
    });
  }

  // Create new session
  const sessionToken = generateToken();
  await prisma.session.create({
    data: {
      token: sessionToken,
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  return sessionToken;
};

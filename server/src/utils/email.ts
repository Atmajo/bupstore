// Email utility functions
// For development, we'll just log the verification links
// In production, you would integrate with an email service like SendGrid, AWS SES, etc.

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const verificationUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${verificationToken}`;
  
  // In development, log to console
  console.log('\n========================================');
  console.log('📧 EMAIL VERIFICATION');
  console.log('========================================');
  console.log(`To: ${email}`);
  console.log(`Verification URL: ${verificationUrl}`);
  console.log('========================================\n');

  // TODO: In production, integrate with email service
  // Example with SendGrid:
  // await sendgrid.send({
  //   to: email,
  //   from: 'noreply@yourapp.com',
  //   subject: 'Verify your email',
  //   html: `Click here to verify: ${verificationUrl}`
  // });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;
  
  console.log('\n========================================');
  console.log('🔑 PASSWORD RESET');
  console.log('========================================');
  console.log(`To: ${email}`);
  console.log(`Reset URL: ${resetUrl}`);
  console.log('========================================\n');

  // TODO: In production, integrate with email service
};

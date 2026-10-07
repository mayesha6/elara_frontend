import { z } from 'zod';
import { passwordValidationSchema } from '@/utils/authFlows';

export const otpSchema = z.object({
  otp: z.string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

export const createPasswordSchema = z.object({
  password: passwordValidationSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});

export type OtpFormData = z.infer<typeof otpSchema>;
export type CreatePasswordFormData = z.infer<typeof createPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

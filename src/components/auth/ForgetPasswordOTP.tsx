'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const forgetPasswordOTPSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type ForgetPasswordOTPFormData = z.infer<typeof forgetPasswordOTPSchema>;

interface ForgetPasswordOTPProps {
  isOpen: boolean;
  email?: string;
  onClose: () => void;
  onSuccess?: (otp: string) => void;
}

export default function ForgetPasswordOTP({ isOpen, email = 'user@gmail.com', onClose, onSuccess }: ForgetPasswordOTPProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordOTPFormData>({
    resolver: zodResolver(forgetPasswordOTPSchema),
  });

  const onSubmit = (data: ForgetPasswordOTPFormData) => {
    toast.success('OTP verified successfully!');
    if (onSuccess) {
      onSuccess(data.otp);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-md bg-white rounded-2xl border-2 border-cyan-400 p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-2xl font-bold">
            <span className="text-orange-500">✓</span> Elara
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Enter Verification Code
        </h1>
        <p className="text-center text-gray-500 text-sm mb-2">
          We&apos;ve sent a verification code to the email
        </p>
        <p className="text-center text-orange-500 font-semibold mb-8">
          {email}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              OTP
            </label>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup className="flex justify-center gap-2">
                    <InputOTPSlot index={0} className="w-12 h-12 border-2 border-gray-300 rounded-lg text-lg font-semibold" />
                    <InputOTPSlot index={1} className="w-12 h-12 border-2 border-gray-300 rounded-lg text-lg font-semibold" />
                    <InputOTPSlot index={2} className="w-12 h-12 border-2 border-gray-300 rounded-lg text-lg font-semibold" />
                    <InputOTPSlot index={3} className="w-12 h-12 border-2 border-gray-300 rounded-lg text-lg font-semibold" />
                    <InputOTPSlot index={4} className="w-12 h-12 border-2 border-gray-300 rounded-lg text-lg font-semibold" />
                    <InputOTPSlot index={5} className="w-12 h-12 border-2 border-gray-300 rounded-lg text-lg font-semibold" />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-2">
                {errors.otp.message}
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Verify OTP
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <a href="#" className="text-orange-500 font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

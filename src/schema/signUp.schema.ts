import { z } from "zod";
import { passwordValidationSchema } from "@/utils/authFlows";

export const signUpSchema = z.object({
  name: z.string().nonempty("Name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: passwordValidationSchema,
  terms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the terms and privacy policy.",
    }),
  }),
});

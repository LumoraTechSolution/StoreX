/**
 * Shared contact-form schema — used by both the client form and the API route
 * so validation rules can never drift between front-end and back-end.
 */
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long."),
  business: z
    .string()
    .trim()
    .min(2, "Please enter your business name.")
    .max(120, "Business name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number.")
    .max(30, "Phone number is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Message is too long."),
  // Honeypot — must stay empty. Bots fill it; humans never see it.
  company_website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Field-keyed error map produced from a ZodError for easy form rendering. */
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function formatZodErrors(error: z.ZodError<ContactInput>): ContactErrors {
  const errors: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

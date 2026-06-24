"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  contactSchema,
  formatZodErrors,
  type ContactErrors,
  type ContactInput,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: ContactInput = {
  name: "",
  business: "",
  email: "",
  phone: "",
  message: "",
  company_website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const reduced = useReducedMotion();

  // GSAP entrance for the form fields.
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const fields = el.querySelectorAll("[data-field]");

    if (reduced) {
      gsap.set(fields, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from(fields, {
        opacity: 0,
        y: 18,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  function update<K extends keyof ContactInput>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear a field's error as soon as the user edits it.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(formatZodErrors(parsed.error));
      setStatus("error");
      // Focus the first invalid field for accessibility.
      const firstKey = Object.keys(formatZodErrors(parsed.error))[0];
      if (firstKey) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
          ?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string; fieldErrors?: ContactErrors }
          | null;
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setValues(EMPTY);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Unexpected error. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-emerald-600" aria-hidden />
        <h3 className="text-xl font-bold text-navy">Thanks — message sent!</h3>
        <p className="max-w-sm text-navy/70">
          We&apos;ve received your details and the StoreX team will be in touch
          shortly to schedule your demo.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-describedby={serverError ? "form-error" : undefined}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          value={values.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          name="business"
          label="Business name"
          value={values.business}
          onChange={(v) => update("business", v)}
          error={errors.business}
          autoComplete="organization"
        />
        <Field
          name="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          name="phone"
          type="tel"
          label="Phone"
          value={values.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <Field
        name="message"
        label="How can we help?"
        value={values.message}
        onChange={(v) => update("message", v)}
        error={errors.message}
        textarea
      />

      {/* Honeypot — visually hidden, off the tab order. Bots fill it. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_website}
          onChange={(e) => update("company_website", e.target.value)}
        />
      </div>

      {serverError && (
        <p
          id="form-error"
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {serverError}
        </p>
      )}

      <div data-field className="flex items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Send message
            </>
          )}
        </button>
        <p className="text-xs text-navy/50">
          We&apos;ll never share your details.
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  name: keyof ContactInput;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}

function Field({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  autoComplete,
}: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const base =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";
  const borderClass = error
    ? "border-red-300 focus-visible:ring-red-500"
    : "border-navy/15 hover:border-navy/25";

  return (
    <div data-field className={textarea ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${base} ${borderClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${base} ${borderClass}`}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

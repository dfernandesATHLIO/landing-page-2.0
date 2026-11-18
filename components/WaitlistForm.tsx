"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useWaitlist, type WaitlistSource } from "./WaitlistProvider";

interface WaitlistFormProps {
  source: WaitlistSource;
  placeholder?: string;
  label: ReactNode;
  inputId?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9.35262 3.35262C9.15787 3.15787 8.84213 3.15787 8.64738 3.35262C8.45273 3.54727 8.45263 3.86283 8.64715 4.05762L12.085 7.5L2.5 7.5C2.22386 7.5 2 7.72386 2 8C2 8.27614 2.22386 8.5 2.5 8.5L12.085 8.5L8.64715 11.9424C8.45263 12.1372 8.45273 12.4527 8.64738 12.6474C8.84213 12.8421 9.15787 12.8421 9.35262 12.6474L14 8L9.35262 3.35262Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function WaitlistForm({
  source,
  placeholder = "Enter your email address...",
  label,
  inputId,
  className,
  inputClassName,
  buttonClassName,
}: WaitlistFormProps) {
  const { submit } = useWaitlist();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || pending) return;
    setPending(true);
    const clear = await submit(value, source);
    if (clear) setEmail("");
    setPending(false);
  };

  return (
    <form className={className} onSubmit={onSubmit}>
      <input
        id={inputId}
        className={inputClassName}
        type="email"
        name="email"
        placeholder={placeholder}
        aria-label="Email address"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className={buttonClassName} disabled={pending}>
        {pending ? "Joining..." : label}
      </button>
    </form>
  );
}

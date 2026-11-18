"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getSupabase } from "@/lib/supabase";
import styles from "./WaitlistProvider.module.css";

export type WaitlistSource = "hero" | "cta" | "footer";

type ToastType = "success" | "error";

interface WaitlistContextValue {
  /** Resolves true when the email should be cleared from the input. */
  submit: (email: string, source: WaitlistSource) => Promise<boolean>;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used inside <WaitlistProvider>");
  return ctx;
}

const DEFAULT_TITLE = "You're on the waitlist!";

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(DEFAULT_TITLE);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  const showToast = useCallback((msg: string, type: ToastType = "success") => {
    setToast({ msg, type });
    requestAnimationFrame(() => setToastVisible(true));
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 4000);
  }, []);

  const showSuccess = useCallback((title: string = DEFAULT_TITLE) => {
    setModalTitle(title);
    setShareLink(window.location.href.split("#")[0]);
    setCopied(false);
    setModalOpen(true);
  }, []);

  const closeSuccess = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    shareButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const submit = useCallback<WaitlistContextValue["submit"]>(
    async (email, source) => {
      const supabase = getSupabase();

      if (!supabase) {
        // Demo mode — no Supabase configured
        await new Promise((r) => setTimeout(r, 600));
        showSuccess();
        return true;
      }

      try {
        const { error } = await supabase.from("waitlist").insert({ email, source });
        if (error) {
          if (error.code === "23505") {
            showSuccess("You're already on the waitlist!");
            return false;
          }
          console.error(error);
          showToast("Something went wrong. Please try again.", "error");
          return false;
        }
        showSuccess();
        return true;
      } catch {
        showToast("Something went wrong. Please try again.", "error");
        return false;
      }
    },
    [showSuccess, showToast],
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
    } catch {
      window.prompt("Copy this link and share it with your football friends:", shareLink);
    }
  };

  return (
    <WaitlistContext.Provider value={{ submit }}>
      {children}

      <div
        className={[styles.toast, toast && styles[toast.type], toastVisible && styles.show]
          .filter(Boolean)
          .join(" ")}
        role="status"
        aria-live="polite"
      >
        {toast?.msg}
      </div>

      <div
        className={`${styles.overlay} ${modalOpen ? styles.show : ""}`}
        aria-hidden={!modalOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeSuccess();
        }}
      >
        <section
          className={styles.card}
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-success-title"
          aria-describedby="signup-success-copy"
        >
          <button className={styles.close} type="button" aria-label="Close" onClick={closeSuccess}>
            ×
          </button>
          <div className={styles.icon} aria-hidden="true">
            ✓
          </div>
          <h2 id="signup-success-title">{modalTitle}</h2>
          <p id="signup-success-copy">
            Thanks for signing up. We&apos;ll contact you when Athlio is ready. Share the link
            with your football friends so they can join too.
          </p>
          <a className={styles.shareLink} href={shareLink || "#"}>
            {shareLink}
          </a>
          <button
            ref={shareButtonRef}
            className={styles.shareButton}
            type="button"
            onClick={copyLink}
          >
            {copied ? "Link copied! Share it with your friends" : "Copy link to share"}
          </button>
        </section>
      </div>
    </WaitlistContext.Provider>
  );
}

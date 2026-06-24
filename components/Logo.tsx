import Link from "next/link";
import { site } from "@/content/site";

/**
 * StoreX lockup: the cart-in-circle mark + "StoreX" wordmark (Store in the bar
 * color, X in the brand cyan). Rendered as inline SVG/markup so it stays crisp
 * at any size and inherits theme colors for light vs dark bars.
 */
export function Logo({
  variant = "dark",
  withWordmark = true,
  showPoweredBy = false,
  className = "",
}: {
  variant?: "dark" | "light";
  withWordmark?: boolean;
  showPoweredBy?: boolean;
  className?: string;
}) {
  const storeColor = variant === "light" ? "#ffffff" : "#0a1b4d";
  const poweredColor = variant === "light" ? "rgba(255,255,255,0.55)" : "rgba(10,27,77,0.5)";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark className="h-9 w-9 shrink-0" />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ color: storeColor }}
          >
            Store<span className="text-primary-500">X</span>
          </span>
          {showPoweredBy && (
            <span
              className="mt-1 text-[10px] font-medium tracking-wide"
              style={{ color: poweredColor }}
            >
              {site.poweredBy}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}

/** The standalone shopping-cart-in-circle mark. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="StoreX mark"
    >
      <circle
        cx="50"
        cy="44"
        r="33"
        stroke="#13a4f4"
        strokeWidth="4"
        fill="none"
      />
      {/* Cart body */}
      <g stroke="#13a4f4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M28 33h6l4 27h28" />
        <path d="M39 39h36l-4 16H42" />
      </g>
      {/* Wheels */}
      <circle cx="46" cy="66" r="2.6" fill="#13a4f4" />
      <circle cx="62" cy="66" r="2.6" fill="#13a4f4" />
      {/* Base line under the circle */}
      <rect x="36" y="84" width="28" height="4.5" rx="2.25" fill="#13a4f4" />
    </svg>
  );
}

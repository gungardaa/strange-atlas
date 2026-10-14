import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { SearchIcon } from "./icons";

// One variant function serves <button> and <Link>. No variant library.
// ponytail: template strings, not cva. Add cva only past ~6 variants.
type BtnVariant = "primary" | "secondary" | "ghost";
type BtnSize = "sm" | "md";

export function btnClasses(variant: BtnVariant = "secondary", size: BtnSize = "md"): string {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-md active:brightness-95";
  const sizes = {
    sm: "tappable min-h-[36px] px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-[15px]",
  } as const;
  const variants = {
    primary: "bg-accent text-white dark:text-[#0E1724] hover:brightness-110",
    secondary: "border border-border bg-surface text-text-primary hover:border-accent",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-secondary",
  } as const;
  return `${base} ${sizes[size]} ${variants[variant]}`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BtnVariant;
  size?: BtnSize;
  loading?: boolean;
};

export function Button({ variant, size, loading, disabled, className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${btnClasses(variant, size)} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <svg aria-hidden viewBox="0 0 16 16" className="baw-spinner h-4 w-4">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 30" />
        </svg>
      )}
      {children}
    </button>
  );
}

export function FilterChip({
  pressed,
  glyph,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { pressed: boolean; glyph?: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={`tappable inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-sm border px-3 py-1.5 text-xs transition-colors ${
        pressed
          ? "border-accent font-semibold text-text-primary"
          : "border-border text-text-secondary hover:border-accent hover:text-text-primary"
      }`}
      {...rest}
    >
      {glyph}
      {children}
    </button>
  );
}

export function Chip({ swatch, glyph, children }: { swatch?: string; glyph?: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface-secondary px-2.5 py-0.5 text-xs font-medium text-text-secondary">
      {glyph ?? (swatch ? <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: swatch }} /> : null)}
      {children}
    </span>
  );
}

export function Card({
  as = "div",
  crosshair,
  className = "",
  children,
  ...rest
}: {
  as?: "div" | "article" | "section";
  crosshair?: boolean;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const Tag = as as "div";
  return (
    <Tag className={`rounded-md border border-border bg-surface p-4 ${crosshair ? "crosshair" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Container({
  width = "page",
  as = "div",
  id,
  className = "",
  children,
}: {
  width?: "page" | "prose";
  as?: "div" | "main";
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as as "div";
  return (
    <Tag id={id} className={`mx-auto w-full ${width === "page" ? "max-w-6xl" : "max-w-3xl"} px-4 ${className}`}>
      {children}
    </Tag>
  );
}

// Coordinate-style micro label. Encodes position or catalogue keys, never decoration.
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-widest text-text-muted">{children}</p>;
}

export function SectionHead({ id, eyebrow, title, lede, as = "h2" }: { id?: string; eyebrow?: ReactNode; title: string; lede?: string; as?: "h1" | "h2" }) {
  const Tag = as as "h2";
  return (
    <div>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag id={id} className="mt-1 font-display text-2xl font-bold tracking-tight text-text-primary">{title}</Tag>
      {lede ? <p className="mt-1 text-text-secondary">{lede}</p> : null}
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-border ${className}`} />;
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-text-primary">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="mt-1 text-xs text-text-muted">{hint}</p> : null}
      {error ? (
        <p role="alert" className="mt-1 text-xs font-medium text-text-primary">
          Cannot continue. {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClasses = (invalid?: boolean) =>
  `w-full rounded-sm border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors hover:border-accent focus:border-accent ${
    invalid ? "border-2 border-text-primary" : "border-border"
  }`;

export function TextInput(props: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  const { invalid, ...rest } = props;
  return <input aria-invalid={invalid || undefined} className={inputClasses(invalid)} {...rest} />;
}

export function SearchField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative min-w-52 flex-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClasses()} pl-9`}
      />
    </div>
  );
}

// Empty states direct action. No apologies, no vagueness.
export function EmptyState({ title, hint, action }: { title: string; hint: string; action?: ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-surface p-6 text-center">
      <p className="font-display font-bold text-text-primary">{title}</p>
      <p className="mt-1 text-sm text-text-secondary">{hint}</p>
      {action ? <div className="mt-4 flex flex-wrap justify-center gap-2">{action}</div> : null}
    </div>
  );
}

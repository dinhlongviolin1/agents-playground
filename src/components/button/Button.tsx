import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  accentColor: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  accentColor,
  children,
  className,
  disabled,
  ...allProps
}) => {
  const accent = accentColor || "#F17455";
  return (
    <button
      style={{ ["--btn-accent" as any]: accent }}
      className={`flex flex-row ${
        disabled ? "pointer-events-none opacity-70" : ""
      } text-[#121212] text-sm justify-center border border-transparent bg-[color:var(--btn-accent)] px-3 py-1 rounded-md transition ease-out duration-250 hover:bg-transparent hover:border-[color:var(--btn-accent)] hover:text-[color:var(--btn-accent)] active:scale-[0.98] ${className}`}
      {...allProps}
    >
      {children}
    </button>
  );
};

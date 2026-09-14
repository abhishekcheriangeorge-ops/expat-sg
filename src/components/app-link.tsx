import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AppLink({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const [pathname, qs] = to.split("?");
  const search = qs ? Object.fromEntries(new URLSearchParams(qs)) : undefined;
  return (
    <Link
      to={pathname as "/"}
      search={search as never}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Compat wrapper para NavLink do react-router: aceita `className` e variantes
// Comentários curtos para localizar props e comportamento

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  // className padrão que será mesclado
  className?: string;
  // classe aplicada quando o link está ativo
  activeClassName?: string;
  // classe aplicada quando o link está pending (rota em transição)
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    // Usa `cn` para mesclar classes conforme estado (active/pending)
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };

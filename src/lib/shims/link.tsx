import * as React from "react";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

// Drop-in replacement for next/link: plain anchor, full-page navigation.
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, target, rel, children, ...props }, ref) => {
    const isExternal = /^https?:\/\//.test(href);
    const computedRel =
      rel ?? (target === "_blank" || isExternal ? "noopener noreferrer" : undefined);
    return (
      <a ref={ref} href={href} target={target} rel={computedRel} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";

export default Link;

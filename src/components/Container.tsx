import type { CSSProperties, ReactNode } from "react";

/**
 * Shared container matching the standalone bundle's convention:
 *   max-width:1200px; margin:0 auto; padding:0 24px
 * The FAQ section uses a narrower 820px max-width, exposed via `narrow`.
 * Extra vertical padding / other overrides are passed via `style`.
 */
export default function Container({
  children,
  narrow = false,
  as: Tag = "div",
  id,
  className,
  style,
}: {
  children: ReactNode;
  narrow?: boolean;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const Component = Tag as any;
  return (
    <Component
      id={id}
      className={className}
      style={{
        maxWidth: narrow ? 820 : "var(--container-max)",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: 24,
        paddingRight: 24,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}

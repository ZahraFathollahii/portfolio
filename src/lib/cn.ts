type ClassValue = string | false | null | undefined;

/**
 * Joins class names, skipping falsy values.
 * No class merging: a `className` prop is for additions (layout, spacing),
 * never for overriding a component's own variant classes.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

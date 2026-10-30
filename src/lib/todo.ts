/** Unwritten translation values start with "TODO". Components render nothing for them. */
export function isTodo(value: string): boolean {
  return value.trimStart().startsWith("TODO");
}

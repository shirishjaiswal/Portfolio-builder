export function validateString(
  input: string | undefined,
  maxLength: number = 255
): boolean {
  if (!input) return false;
  if (typeof input !== "string") return false;
  const validPattern = /^[a-zA-Z0-9\s.,!?'"()-]*$/;
  return input.length <= maxLength && validPattern.test(input);
}

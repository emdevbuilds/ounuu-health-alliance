const rateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60000
): boolean {
  const now = Date.now();
  const userLimit = rateLimit.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count++;
  return true;
}

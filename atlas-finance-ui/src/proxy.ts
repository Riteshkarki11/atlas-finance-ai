// File: src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Only initialize Ratelimit if credentials exist to prevent crashing
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, '10 s'), // 20 requests per 10 seconds
    analytics: true,
  });
}

// Must be named 'proxy' for Next.js 16 to run it (renamed from 'middleware')
export default async function proxy(request: NextRequest) {
  // Safely extract client IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

  // If ratelimit is configured, enforce it
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return new NextResponse('Rate limit exceeded. Try again in a few seconds.', {
          status: 429,
        });
      }
    } catch (err) {
      console.error('Rate limit error:', err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function AuthCallbackHandler() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      window.location.href = `${window.location.origin}/auth/callback?code=${code}`;
    }
  }, [code]);

  return null;
}


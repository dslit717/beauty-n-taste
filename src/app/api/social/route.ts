import { NextRequest, NextResponse } from 'next/server';
import socialData from '@/data/social.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const platform = searchParams.get('platform'); // youtube, instagram, blog

  let filtered = [...socialData];

  if (platform && platform !== 'all') {
    filtered = filtered.filter(s => s.platform === platform);
  }

  return NextResponse.json({ data: filtered });
}


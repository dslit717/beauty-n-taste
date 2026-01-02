import { NextRequest, NextResponse } from 'next/server';
import reviewsData from '@/data/community-reviews.json';
import eventsData from '@/data/events.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type'); // reviews, events

  if (type === 'events') {
    const activeOnly = searchParams.get('active') === 'true';
    let events = [...eventsData];
    
    if (activeOnly) {
      events = events.filter(e => e.isActive);
    }
    
    return NextResponse.json({ data: events });
  }

  // 기본: reviews
  return NextResponse.json({ data: reviewsData });
}


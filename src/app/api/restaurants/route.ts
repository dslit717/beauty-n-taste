import { NextRequest, NextResponse } from 'next/server';
import restaurantsData from '@/data/restaurants.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const type = searchParams.get('type'); // all, chefsTable, photoSpot
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  let filtered = [...restaurantsData];

  // 탭 필터
  if (type === 'chefsTable') {
    filtered = filtered.filter(r => r.isChefsTable);
  } else if (type === 'photoSpot') {
    filtered = filtered.filter(r => r.isPhotoSpot);
  }

  if (category && category !== 'all') {
    filtered = filtered.filter(r => r.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(r => 
      r.name.toLowerCase().includes(searchLower) ||
      r.description.toLowerCase().includes(searchLower)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return NextResponse.json({
    data,
    pagination: { 
      page, 
      limit, 
      total, 
      totalPages: Math.ceil(total / limit) 
    },
  });
}


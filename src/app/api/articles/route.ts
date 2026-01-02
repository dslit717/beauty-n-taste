import { NextRequest, NextResponse } from 'next/server';
import articlesData from '@/data/articles.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  let filtered = [...articlesData];

  if (category && category !== 'all') {
    filtered = filtered.filter(a => a.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchLower) ||
      a.excerpt.toLowerCase().includes(searchLower)
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


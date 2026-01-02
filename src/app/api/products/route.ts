import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type'); // all, beauty-clinic, taste-inner
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  let filtered = [...productsData];

  // 탭 필터
  if (type === 'beauty-clinic') {
    filtered = filtered.filter(p => p.category === 'beauty' || p.category === 'clinic-voucher');
  } else if (type === 'taste-inner') {
    filtered = filtered.filter(p => p.category === 'taste' || p.category === 'inner-beauty');
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
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


import { NextRequest, NextResponse } from 'next/server';
import reviewsData from '@/data/reviews.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'treatment' | 'clinic'
  const targetId = searchParams.get('targetId');
  const limit = searchParams.get('limit');

  let filteredReviews = [...reviewsData];

  // 타입 필터 (시술 리뷰 or 병원 리뷰)
  if (type) {
    filteredReviews = filteredReviews.filter((review) => review.type === type);
  }

  // 특정 대상 필터 (특정 시술 or 특정 병원)
  if (targetId) {
    filteredReviews = filteredReviews.filter((review) => review.targetId === targetId);
  }

  // helpful 순으로 정렬 (긍정 리뷰 큐레이션)
  filteredReviews.sort((a, b) => b.helpful - a.helpful);

  // 개수 제한
  if (limit) {
    filteredReviews = filteredReviews.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    data: filteredReviews,
    total: filteredReviews.length,
  });
}


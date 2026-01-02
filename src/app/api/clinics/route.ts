import { NextRequest, NextResponse } from 'next/server';
import clinicsData from '@/data/clinics.json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get('specialty');
  const search = searchParams.get('search');
  const bntOnly = searchParams.get('bntOnly');
  const limit = searchParams.get('limit');

  let filteredClinics = [...clinicsData];

  // B&T Selection 필터
  if (bntOnly === 'true') {
    filteredClinics = filteredClinics.filter((clinic) => clinic.isBnTSelection);
  }

  // 전문분야 필터
  if (specialty && specialty !== 'all') {
    filteredClinics = filteredClinics.filter((clinic) =>
      clinic.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase()))
    );
  }

  // 검색 필터
  if (search) {
    const searchLower = search.toLowerCase();
    filteredClinics = filteredClinics.filter(
      (clinic) =>
        clinic.name.toLowerCase().includes(searchLower) ||
        clinic.description.toLowerCase().includes(searchLower) ||
        clinic.address.toLowerCase().includes(searchLower)
    );
  }

  // 개수 제한
  if (limit) {
    filteredClinics = filteredClinics.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    data: filteredClinics,
    total: filteredClinics.length,
  });
}



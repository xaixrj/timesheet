import { NextRequest } from 'next/server';
import { timesheetEntriesByUserAndWeek } from '@/lib/mockDate';

export async function GET(req: NextRequest, { params }: { params: { week: string } }) {
  const week = Number(params.week);
  const userId = req.headers.get('x-user-id') || 'u1';

  const entries = timesheetEntriesByUserAndWeek[userId]?.[week] || [];

  return new Response(JSON.stringify({ ok: true, entries }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

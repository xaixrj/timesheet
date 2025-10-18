'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { timesheetEntriesByUserAndWeek, users } from '@/lib/mockDate';

function formatDateRange(start: Date, end: Date) {
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = start.toLocaleString('en-US', { month: 'long' });
  const year = start.getFullYear();

  return `${startDay} to ${endDay} ${month} ${year}`;
}

function generateWeeks() {
  const start = new Date(2024, 0, 1);
  const end = new Date(2025, 11, 31);
  const weeks: { week: number; range: string }[] = [];

  let current = new Date(start);
  let weekNum = 1;

  while (current <= end) {
    const weekStart = new Date(current);
    const weekEnd = new Date(current);
    weekEnd.setDate(weekStart.getDate() + 6);

    weeks.push({
      week: weekNum,
      range: formatDateRange(weekStart, weekEnd),
    });

    weekNum++;
    current.setDate(current.getDate() + 7);
  }

  return weeks;
}

function getWeekStatus(userId: string, week: number): 'Complete' | 'Incomplete' | 'Missing' {
  const userWeeks = timesheetEntriesByUserAndWeek[userId];
  const weekEntries = userWeeks?.[week];
  if (!weekEntries || weekEntries.length === 0) return 'Missing';
  const allComplete = weekEntries.every((e) => e.status === 'Complete');
  const someIncomplete = weekEntries.some((e) => e.status === 'Incomplete');
  if (allComplete) return 'Complete';
  if (someIncomplete) return 'Incomplete';
  return 'Missing';
}

export default function TimesheetsOverview() {
  const allWeeks = useMemo(() => generateWeeks(), []);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Complete' | 'Incomplete' | 'Missing'>('All');


  const loggedInUser = users[0]; 
  const loggedInUserId = loggedInUser.id;


  const filteredWeeks = allWeeks.filter((week) => {
    const status = getWeekStatus(loggedInUserId, week.week);
    return statusFilter === 'All' || status === statusFilter;
  });

  const totalPages = Math.ceil(filteredWeeks.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentWeeks = filteredWeeks.slice(startIndex, startIndex + perPage);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const visiblePages = useMemo(() => {
    const pages: (number | string)[] = [];
    const delta = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-xl mx-auto p-8 rounded-t-xl max-w-[70%]">
        <div className="flex justify-between items-center mb-6 pb-6 border-gray-200 border-b">
          <p className="font-bold text-gray-900 text-2xl">Timesheet</p>
        </div>

        <div className="flex space-x-4 mb-6">
          <select className="bg-white px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700">
            <option>All Weeks</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
            className="bg-white px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="All">All</option>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Missing">Missing</option>
          </select>
        </div>

        <div className="bg-white mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <table className="divide-y divide-gray-200 min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left">WEEK #</th>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left">DATE RANGE</th>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left">STATUS</th>
                <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentWeeks.map((week) => {
                const status = getWeekStatus(loggedInUserId, week.week);
                return (
                  <tr key={week.week} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-700 text-sm">{week.week}</td>
                    <td className="px-6 py-3 text-gray-600 text-sm">{week.range}</td>
                    <td className="px-6 py-4 text-gray-900 text-sm">
                      <span
                        className={`
                          px-3 py-1 text-xs font-semibold uppercase rounded-full
                          ${status === 'Complete'
                            ? 'text-green-800 bg-green-200'
                            : status === 'Incomplete'
                              ? 'text-yellow-800 bg-yellow-200'
                              : 'text-red-600 bg-red-200'}
                        `}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <Link
                        href={`/timesheets/${loggedInUserId}/${week.week}`}
                        className="font-medium text-blue-600 text-sm hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
		
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="hover:bg-gray-100 disabled:opacity-50 px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              Previous
            </button>

            {visiblePages.map((page, idx) =>
              page === '...' ? (
                <span key={idx} className="px-2 text-gray-500">...</span>
              ) : (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`px-3 py-1 text-sm border rounded-md ${currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="hover:bg-gray-100 disabled:opacity-50 px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl m-5 mx-auto p-8 rounded-b-xl max-w-[70%]">
        <div className="text-gray-400 text-sm text-center">
          &copy; 2024 tentwenty. All rights reserved.
        </div>
      </div>
    </div>
  );
}
export type user = {
	id:string,
	name:string,
	email:string,
	password:string
};

export const users: user[] = [
  { id: 'u1', 
	email: 'demo@example.com', 
	password: 'password123', 
	name: 'Demo User' 
},
  { id: 'u2', 
	email: 'alice@example.com', 
	password: 'alicepass', 
	name: 'Alice' 
},];

export type TimesheetStatus = 'Complete' | 'Incomplete' | 'Missing';


export type TimesheetEntry = {
  id: string;
  date: string; 
  hours: number;
  project: string;
  task: string;
  status: TimesheetStatus;
};


export const timesheetEntriesByUserAndWeek: Record<string, Record<number, TimesheetEntry[]>> = {
  u1: {
    1: [
      { id: 'e1', date: '2025-01-06', hours: 8, project: 'Website Redesign', task: 'UI implementation', status: 'Complete' },
      { id: 'e2', date: '2025-01-08', hours: 7, project: 'API', task: 'Integration work', status: 'Incomplete' },
    ],
    3: [
      { id: 'e3', date: '2025-01-29', hours: 6, project: 'Internal Tool', task: 'Bug Fixes', status: 'Complete' },
	  { id: 'e3', date: '2025-01-29', hours: 6, project: 'Internal Tool', task: 'Bug Fixes', status: 'Complete' },
	  { id: 'e3', date: '2025-01-29', hours: 6, project: 'Internal Tool', task: 'Bug Fixes', status: 'Complete' },
    ],
	    5: [
      { id: 'e1', date: '2025-01-06', hours: 8, project: 'Website Redesign', task: 'UI implementation', status: 'Complete' },
      { id: 'e2', date: '2025-01-08', hours: 7, project: 'API', task: 'Integration work', status: 'Incomplete' },
    ],
	    9: [
      { id: 'e1', date: '2025-01-06', hours: 8, project: 'Website Redesign', task: 'UI implementation', status: 'Complete' },
      { id: 'e2', date: '2025-01-08', hours: 7, project: 'API', task: 'Integration work', status: 'Incomplete' },
    ],
	    10: [
      { id: 'e3', date: '2025-01-29', hours: 6, project: 'Internal Tool', task: 'Bug Fixes', status: 'Incomplete' },
	  { id: 'e3', date: '2025-01-29', hours: 6, project: 'Internal Tool', task: 'Bug Fixes', status: 'Incomplete' },
	  { id: 'e3', date: '2025-01-29', hours: 6, project: 'Internal Tool', task: 'Bug Fixes', status: 'Incomplete' },
    ]
  },
  u2: {
    1: [
      { id: 'e4', date: '2025-01-06', hours: 8, project: 'Mobile App', task: 'Feature testing', status: 'Incomplete'},
      { id: 'e5', date: '2025-01-07', hours: 5, project: 'Landing Page', task: 'Design updates', status: 'Incomplete'},
    ],
    4: [
      { id: 'e6', date: '2025-02-29', hours: 7, project: 'Marketing Site', task: 'SEO improvements', status: 'Incomplete'},
    ],
  },
};


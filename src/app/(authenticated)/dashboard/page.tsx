import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import TimesheetsOverview from "./_component/timesheetview";
import Topbar from "./_component/topbar";

export default async function Dashboard() { 
	
  const cookieStore = await cookies();
  const token = cookieStore.get('ts_session')?.value;

    if (!token) {
    redirect('/login');
  }
  
  return (
	<div className="bg-gray-200 h-auto">
		<Topbar />
		<TimesheetsOverview />
	</div>
  )
}


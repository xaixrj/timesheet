'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      });

      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  return (
    <Button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white">
      Logout
    </Button>
  );
}

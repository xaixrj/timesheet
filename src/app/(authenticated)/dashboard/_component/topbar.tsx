import React from 'react'
import LogoutButton from './logoutButton'

export default function Topbar() {
  return (
	<div className="flex justify-between items-center bg-white shadow-md px-3 w-auto h-15">
		<div>
		<p className='font-bold text-3xl'>ticktock</p>
		</div>
		<div>
		<LogoutButton />		
		</div>
	</div>
  )
}


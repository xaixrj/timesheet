'use client';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage(){
const [email,setEmail] = useState("demo@example.com");
const [password,setPassword] =useState("password123");
const [loading,setLoading] =useState(false);
const [error,setError] =useState<string | null>(null);
const router = useRouter();

async function handleSubmit(e:React.FormEvent){
	e.preventDefault();
	setLoading(true);
	setError(null);

	try{
		const response = await fetch("/api/login",{
			method:"POST",
			headers:{"content-type":"application/json"},
			body:JSON.stringify({email,password})
		})
		if(!response.ok){
			const data = await response.json();
			setError(data.error);
			setLoading(false);
			return;
		} 
		router.push("/dashboard");

	}catch(err){
		setError("something went wrong");
		console.log("login error",err);
		setLoading(false);
	}
}

	return (
		<div className="flex md:flex-row flex-col h-screen">
			<div className="flex justify-center items-center bg-white w-auto md:w-[50%] h-screen">
				<div className="p-5 w-180 h-100">
						<form onSubmit={handleSubmit} className="" >
					<div className="gap-8 grid">


					<div><p className="font-bold text-2xl">Welcome Back</p>
					</div>
					
					<div className="flex flex-col gap-2">
					<Label htmlFor="email">Email</Label>
					<Input value={email} onChange={e=>setEmail(e.target.value)} required id="email" type="email" placeholder="Email" />
					</div>

					<div className="flex flex-col gap-2"> 
					<Label htmlFor="password">Password</Label>
					<Input value={password} onChange={e=>setPassword(e.target.value)} required id="password" type="password" placeholder="password" />
					</div>

					{error && <p className="text-red-500">{error}</p>}

					<Button className="bg-blue-600 hover:bg-blue-700 text-white">
						{loading ? "Signing In...": "Sign In"}
					</Button>

					</div>
						</form>
				</div>
			</div>
			<div className="flex justify-center items-center bg-blue-600 w-auto md:w-[50%] h-screen">
				<div className="px-8 min-w-100 h-50">
				<p className="mb-3 font-bold text-white text-5xl">ticktock</p>
				<p className="text-l text-white">Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected devide. </p></div>
			</div>
		</div>
	)
}
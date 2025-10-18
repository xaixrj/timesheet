import { NextRequest } from "next/server";
import { createSessionResponse } from "@/lib/auth";
import { users } from "@/lib/mockDate";


export async function POST(request:NextRequest){
	const body=await request.json();
	const {email,password}=body||{};
	// const user =users.find(u=>u.email==email && u.password==password);
	// if(!user){
	// 	return new Response(JSON.stringify({ ok: false, error: 'Invalid credentials' }), { status: 401 });
	// }

	const user = users.find(u=>u.email==email);
	if(!user){
		return new Response(
			JSON.stringify({ok:false,error:"user not found"}),
			{status:400,headers:{"content-type":"application/json"}}
		)
	}

	if(user.password !== password){
		return new Response(
			JSON.stringify({ok:false,error:"invalid password"}),
			{status:400,headers:{"conent-type":"application/json"}}
		)
	}

	const token = crypto.randomUUID();
	return createSessionResponse(token);

}


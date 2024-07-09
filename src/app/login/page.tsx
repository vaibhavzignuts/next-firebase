'use client';
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";


const Page = () => {



    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const router = useRouter();
    const user = auth?.currentUser;


    useEffect(() => {

        const user = auth?.currentUser;

        if (user) {
            router.replace('/')
            return;
        }
    }, [user])



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("User logged in Successfully");
            router.replace('/budget')
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='pt-32'><Card className="w-[350px] mx-auto sm:max-w-[500px] ">
            <CardHeader>
                <CardTitle>sign in</CardTitle>
                <CardDescription>welcome back!!</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center   grid-cols-1 sm:grid-cols-1 gap-4">

                        <div className="flex flex-col space-y-1.5 ">
                            <Label htmlFor="framework">Email</Label>
                            <Input id="name" placeholder="Enter yout Emailadress" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">password</Label>
                            <Input id="name" placeholder="Enter yout password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex  justify-between">
                <Button className='w-full' onClick={handleSubmit}>signin</Button>
            </CardFooter>
        </Card>
        </div>
    )
}

export default Page
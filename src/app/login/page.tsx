'use client';
import React from 'react'
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


const page = () => {
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
                            <Input id="name" placeholder="Enter yout Emailadress" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">password</Label>
                            <Input id="name" placeholder="Enter yout password" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex  justify-between">
                <Button className='w-full'>signin</Button>
            </CardFooter>
        </Card>
        </div>
    )
}

export default page
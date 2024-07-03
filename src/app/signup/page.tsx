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
        <div className='pt-32'>
            <Card className="max-w-[350px] mx-auto w-full sm:max-w-[500px]">
                <CardHeader>
                    <CardTitle>sign up</CardTitle>
                    <CardDescription>register here</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">username</Label>
                                <Input id="name" placeholder="Enter your username" className="w-full" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Enter your email address" className="w-full" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">password</Label>
                                <Input id="password" placeholder="Enter your password" className="w-full" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button className='w-full'>signup</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page;

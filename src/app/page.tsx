
'use client';
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import img from '../../public/20945331.jpg'
import Image from 'next/image'
import { auth } from '@/lib/firebase'

const Page = () => {
  const [isuser, seIsUser] = useState(false)
  useEffect(() => {

    const fetchUser = async () => {

      await auth.onAuthStateChanged(user => {
        if (user) {
          seIsUser(true);
        } else {
          seIsUser(false);
        }
      });
    };


    fetchUser();
  }, []);



  const handlelogout = async () => {
    try {
      await auth.signOut();

      console.log("User logged out successfully!");
      seIsUser(false)
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className=' m-auto' >
      <main className="flex flex-col text-gray-900">
        <section className="bg-gray-100 py-12 md:py-20 lg:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Expense Tracker
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Track your expenses efficiently with our powerful tools and intuitive interface.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href={isuser ? "/budget" : '/signup'}
                  >
                    Get Started
                  </Link>

                  {isuser ? <>     <button
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    onClick={handlelogout}
                  >
                    Logout
                  </button> </> : <>
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                      href="login"
                    >
                      Login
                    </Link>
                  </>}

                </div>
              </div>
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
                height="500"
                src={img}
                width="550"
              />
            </div>
          </div>
        </section>
        {/* <section className="bg-light py-12 md:py-20 lg:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">
                    Learning Resources
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Expand Your Knowledge</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Dive into a vast library of tutorials, articles, and video lessons covering the latest engineering
                    technologies and practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  )
}

export default Page
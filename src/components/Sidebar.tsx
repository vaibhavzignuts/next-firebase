/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
    ShoppingCart,
    LayoutDashboard,
    UsersRound,
    Settings,
    ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({ }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
            {!mobileWidth && (
                <div className="absolute right-[-20px] top-7">
                    <Button
                        onClick={toggleSidebar}
                        variant="secondary"
                        className=" rounded-full p-2"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            )}
            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    {
                        title: "home",
                        href: "/",
                        icon: LayoutDashboard,
                        variant: "default"
                    },
                    {
                        title: "dashboard",
                        href: "/dashboard",
                        icon: UsersRound,
                        variant: "ghost"
                    },
                    {
                        title: "budget",
                        href: "/budget",
                        icon: UsersRound,
                        variant: "ghost"
                    },
                    {
                        title: "expense",
                        href: "/expense",
                        icon: UsersRound,
                        variant: "ghost"
                    },
                    {
                        title: "profile",
                        href: "/profile",
                        icon: UsersRound,
                        variant: "ghost"
                    },
                    {
                        title: "login",
                        href: "/login",
                        icon: ShoppingCart,
                        variant: "ghost"
                    },
                    {
                        title: "Signup",
                        href: "/signup",
                        icon: Settings,
                        variant: "ghost"
                    }
                ]}
            />
        </div>
    );
}
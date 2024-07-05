/** @format */
import { useState } from "react";
import { Nav } from "./ui/nav";

import {
    ShoppingCart,
    LayoutDashboard,
    UsersRound,
    Settings,
    ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>; // Adjust size prop based on your icon component's needs
    variant: "default" | "ghost"; // Adjust variants based on your UI requirements
};

type Props = {};

export default function SideNavbar({ }: Props) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className="relative max-w-[140px] border-r px-3 pb-10 pt-24 ">
            {!mobileWidth && (
                <div className="absolute right-[-20px] top-7">
                    <Button
                        onClick={toggleSidebar}
                        variant="secondary"
                        className="rounded-full p-2"
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

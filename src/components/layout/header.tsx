"use client";

import logoImg from "@/assets/images/logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn, fallbackDisplayname } from "@/lib/utils";
import useUserStore from "@/stores/user";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

const Header = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { user, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    replace("/");
  };

  if (pathname === "/") return;

  return (
    <header>
      <div className="container">
        <div className="grid grid-cols-4 py-3">
          <div className="col-span-1">
            <Image src={logoImg} width={32} height={32} alt="logo" />
          </div>
          <div className="col-span-3">
            <ul className="flex items-center justify-end gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/chat" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Chat
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.photoURL ?? ""} />
                <AvatarFallback>
                  {fallbackDisplayname(user?.displayName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Button onClick={handleLogout}>
                  <LogOut size={12} />
                </Button>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

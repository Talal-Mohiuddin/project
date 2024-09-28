"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Button2 from "./Button2";

const navItems = [
  { name: "Features", href: "/features" },
  { name: "Demo", href: "/demo" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md p-4 text-white">
      <div className="w-full md:max-w-[90%] mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          BridgeNLP
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Button2 className={"hidden md:block"}>Get Started</Button2>
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden text-white">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px]  bg-[#17161D] text-white outline-none"
          >
            <nav className="flex flex-col space-y-4 mt-10 text-[1rem]">
              <Link href="/" className="text-2xl font-bold text-[#60A5FA]">
                BridgeNLP
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors ${
                    pathname === item.href
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button2>Get Started</Button2>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

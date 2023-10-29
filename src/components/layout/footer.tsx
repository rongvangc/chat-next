"use client";

import React from "react";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/") return;

  return (
    <footer>
      <div className="container">
        <Separator />
      </div>
    </footer>
  );
};

export default Footer;

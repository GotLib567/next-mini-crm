'use client';
import React, {useState} from 'react';
import {NAV} from "@/constants";
import Link from "next/link";
import {cn} from "@/lib/utils";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <nav className="space-y-1">
      {NAV.map((item) => (
        <Link
          href={item.id === "dashboard" ? "/" : `/${item.id}`}
          key={item.id}
          onClick={() => {setActive(item.id); console.log(item.id); } }
          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors border ${
            active === item.id
              ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white"
              : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          }`}
        >
          {item.icon}{item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
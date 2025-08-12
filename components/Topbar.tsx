'use client';
import React, {useState} from 'react';
import Input from "@/components/ui/input";
import {Bell, LogIn, Plus, Search} from "lucide-react";
import Button from "@/components/ui/button";
import Link from "next/link";

const Topbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/70 bg-white dark:bg-neutral-950 border-b border-neutral-200/70 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-neutral-900 dark:bg-white" />
            <span className="font-semibold">MiniCRM</span>
          </div>
          <div className="ml-2 hidden md:block w-80">
            <Input icon={Search} placeholder="Поиск (Ctrl/⌘+K)…" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="soft">{true ? "Светлая" : "Тёмная"}</Button>
            <Button variant="ghost"><Bell className="h-5 w-5"/></Button>
            <Button variant="primary"><Plus className="h-4 w-4"/> Заказ</Button>
            <Button asChild variant="soft" size="md">
              <Link href="/sign-in" onClick={() => { setLoggedIn(true); }}>
                <LogIn className="h-4 w-4" /> Войти
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
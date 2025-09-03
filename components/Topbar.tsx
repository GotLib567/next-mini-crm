'use client';
import React, {useState} from 'react';
import Input from "@/components/ui/input";
import {Bell, Building2, ChevronDown, LogIn, LogOut, MapPin, Plus, Search} from "lucide-react";
import Button from "@/components/ui/button";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {companies} from "@/constants";

const Topbar = () => {
  const { data: session, status } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);

  const [companyMenu, setCompanyMenu] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0].id);
  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

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
            {/* Company picker */}
            <div className="relative">
              <Button variant="soft" onClick={()=>setCompanyMenu(v=>!v)}>
                <Building2 className="h-4 w-4"/> {currentCompany.title} <ChevronDown className="h-4 w-4"/>
              </Button>
              {companyMenu && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg p-2 z-50">
                  <Button variant="primary" className="w-full mb-2"><Plus className="h-4 w-4"/> Создать компанию</Button>
                  <div className="max-h-80 overflow-auto">
                    {companies.map((c)=> (
                      <button key={c.id} onClick={()=>{setSelectedCompanyId(c.id); setCompanyMenu(false);}} className={`w-full text-left rounded-lg px-3 py-2 flex items-start gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 ${selectedCompanyId===c.id?"bg-neutral-100 dark:bg-neutral-800":""}`}>
                        <div className="mt-0.5"><Building2 className="h-4 w-4 text-neutral-500"/></div>
                        <div>
                          <div className="font-medium flex items-center gap-2">{c.title} <span className="text-xs text-neutral-500 inline-flex items-center gap-1"><MapPin className="h-3 w-3"/>{c.city}</span></div>
                          <div className="text-xs text-neutral-500 line-clamp-1">{c.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button variant="ghost"><Bell className="h-5 w-5"/></Button>
            <Button variant="primary"><Plus className="h-4 w-4"/> Заказ</Button>
            <div>
              {status === "authenticated" ? (
                <div className="flex items-center gap-2">
                  <span>{session?.user?.first_name}</span>
                  <Button variant="soft" className="cursor-pointer" onClick={() => signOut()} size="md">
                      <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button asChild variant="soft" size="md">
                  <Link href="/login" onClick={() => { setLoggedIn(true); }}>
                    <LogIn className="h-4 w-4" /> Войти
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
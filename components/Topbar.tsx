'use client';
import React, {useMemo, useState} from 'react';
import Input from "@/components/ui/input";
import {Bell, Building2, ChevronDown, LogIn, LogOut, MapPin, Plus, Search} from "lucide-react";
import Button from "@/components/ui/button";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {companies} from "@/constants";
import {useParams, usePathname, useRouter} from "next/navigation";
import CompanyPicker from "@/components/CompanyPicker";

const Topbar = () => {
  const { data: session, status } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ companyId?: string }>();

  const companyIdFromUrl = useMemo(() => {
    const id = params?.companyId ?? pathname.split("/").filter(Boolean)[0];
    return id ?? String(companies[0].id);
  }, [params?.companyId, pathname]);

  const currentCompany = useMemo(() => {
    const idNum = Number(companyIdFromUrl);
    return companies.find(c => String(c.id) === companyIdFromUrl || c.id === idNum) ?? companies[0];
  }, [companyIdFromUrl]);

  const [companyMenu, setCompanyMenu] = useState(false);

  const onSelectCompany = (id: number) => {
    const parts = pathname.split("/").filter(Boolean);
    parts[0] = String(id);
    router.push("/" + parts.join("/"));
    setCompanyMenu(false);
  };

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-950/70 bg-white dark:bg-neutral-950 border-b border-neutral-200/70 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-neutral-900 dark:bg-white" />
            <span className="font-semibold">MiniCRM</span>
          </div>

          {status === "authenticated" ? (
            <>
              <div className="ml-2 hidden md:block w-80">
                <Input icon={Search} placeholder="Поиск (Ctrl/⌘+K)…" />
              </div>

              <div className="ml-auto flex items-center gap-2">
                <CompanyPicker
                  currentCompany={currentCompany}
                  companyId={companyIdFromUrl}
                  companyMenu={companyMenu}
                  onSelectCompany={onSelectCompany}
                  setCompanyMenu={setCompanyMenu}
                />
                <Button variant="ghost"><Bell className="h-5 w-5"/></Button>
                <Button variant="primary"><Plus className="h-4 w-4"/> Заказ</Button>
                <div className="flex items-center gap-2">
                  <span>{session?.user?.first_name}</span>
                  <Button variant="soft" className="cursor-pointer" onClick={() => signOut()} size="md">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="ml-auto">
              <Button asChild variant="soft" size="md">
                <Link href="/login">
                  <LogIn className="h-4 w-4" /> Войти
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
'use client'
import React from 'react';
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import {useSession} from "next-auth/react";
import {CompanyProvider} from "@/app/companyProvider";
import {companies} from "@/constants";
import {useParams} from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const { companyId } = useParams<{ companyId: string }>();
  const company = { id: companyId };

  return (
    <div className={`dark min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}>
      <Topbar />

      <div className="mx-auto max-w-7xl px-4">

          {status === "authenticated" ? (
            <CompanyProvider value={{company}} >
              <div className="grid grid-cols-12 gap-6 py-6">
                <aside className="col-span-12 md:col-span-3 lg:col-span-2">
                  <Sidebar />
                </aside>

                <main className="col-span-12 md:col-span-9 lg:col-span-10">
                  {children}
                </main>
              </div>
            </CompanyProvider>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen space-y-4">
              <h1 className="text-bold">MiniCRM</h1>
              <p>Авторизуйтесь, чтобы получить доступ к Вашей CRM</p>
            </div>
          )}
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-500">v1 • Дизайн‑прототип без бэкенда</div>
    </div>
  );
};

export default Layout;
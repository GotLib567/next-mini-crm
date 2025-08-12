import React from 'react';
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${true ? "dark" : ""} min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}>
      <Topbar />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-12 gap-6 py-6">
          {/* Nav rail */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2">
            <Sidebar />
          </aside>

          {/* Content */}
          <main className="col-span-12 md:col-span-9 lg:col-span-10">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-500">v1 • Дизайн‑прототип без бэкенда</div>
    </div>
  );
};

export default Layout;
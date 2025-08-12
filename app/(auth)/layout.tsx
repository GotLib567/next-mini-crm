import React from 'react';
import {Card, CardContent} from "@/components/ui/card";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid place-items-center dark min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default Layout;
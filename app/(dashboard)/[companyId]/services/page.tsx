import React from 'react';
import Input from "@/components/ui/input";
import {Plus, Search} from "lucide-react";
import Button from "@/components/ui/button";
import Table from "@/components/ui/table";
import {services} from "@/constants";
import Badge from "@/components/ui/badge";

const cols = [
  { title: "Услуга" },
  { title: "Стоимость" },
];

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input icon={Search} placeholder="Поиск услуг…" className="w-full sm:w-72" />
        <div className="ml-auto" />
        <Button variant="ghost">Настройка</Button>
        <Button variant="primary"><Plus className="h-4 w-4"/> Добавить услугу</Button>
      </div>
      <Table columns={cols} rows={services} renderRow={(s) => {
        return (
          <>
            <td className="px-4 py-3 font-medium">{s.name}</td>
            <td className="px-4 py-3">{s.price.toLocaleString()} ₽</td>
          </>
        );
      }} />
    </div>
  );
};

export default Page;
import React from 'react';
import Input from "@/components/ui/input";
import {ChevronDown, Plus, Search, Star} from "lucide-react";
import Button from "@/components/ui/button";
import Table from "@/components/ui/table";
import {clients} from "@/constants";
import Badge from "@/components/ui/badge";

const cols = [
  { title: "Клиент" },
  { title: "Телефон" },
  { title: "Последний визит" },
  { title: "Метки" },
  { title: "Всего заказов", className: "text-right" },
];

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input icon={Search} placeholder="Поиск клиентов…" className="w-full sm:w-72" />
        <Button variant="soft">Метки <ChevronDown className="h-4 w-4" /></Button>
        <Button variant="soft">Сортировка <ChevronDown className="h-4 w-4" /></Button>
        <div className="ml-auto" />
        <Button variant="primary"><Plus className="h-4 w-4"/> Новый клиент</Button>
      </div>
      <Table columns={cols} rows={clients} renderRow={(c) => (
        <>
          <td className="px-4 py-3 font-medium">{c.name}</td>
          <td className="px-4 py-3">{c.phone}</td>
          <td className="px-4 py-3">{c.last}</td>
          <td className="px-4 py-3 space-x-2">
            {c.tags.map((t, i) => (
              <Badge key={i} tone={t.includes("VIP") ? "success" : t.includes("пропускает") ? "danger" : "default"}>{t.includes("Отзыв") ? (<span className="inline-flex items-center gap-1"><Star className="h-3 w-3"/>{t.replace("Отзыв ", "")}</span>) : t}</Badge>
            ))}
          </td>
          <td className="px-4 py-3 text-right">{c.total}</td>
        </>
      )} />
    </div>
  );
};

export default Page;
import React from 'react';
import Input from "@/components/ui/input";
import {Plus, Search} from "lucide-react";
import Button from "@/components/ui/button";
import Table from "@/components/ui/table";
import {services} from "@/constants";
import Badge from "@/components/ui/badge";

const cols = [
  { title: "Материал" },
  { title: "Ед." },
  { title: "Цена закупки" },
  { title: "Остаток / Порог", className: "w-64" },
  { title: "Статус", className: "w-40" },
];

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input icon={Search} placeholder="Поиск материалов…" className="w-full sm:w-72" />
        <div className="ml-auto" />
        <Button variant="ghost">Приход</Button>
        <Button variant="primary"><Plus className="h-4 w-4"/> Добавить</Button>
      </div>
      <Table columns={cols} rows={services} renderRow={(s) => {
        const pct = Math.min(100, Math.round((s.stock / Math.max(1, s.threshold * 2)) * 100));
        const low = s.stock < s.threshold;
        return (
          <>
            <td className="px-4 py-3 font-medium">{s.name}</td>
            <td className="px-4 py-3">{s.unit}</td>
            <td className="px-4 py-3">{s.price.toLocaleString()} ₽</td>
            <td className="px-4 py-3">
              <div className="text-xs text-neutral-500 mb-1">{s.stock} / {s.threshold} {s.unit}</div>
              <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div className={`${low ? "bg-amber-500" : "bg-emerald-500"} h-2 rounded-full`} style={{ width: `${pct}%` }} />
              </div>
            </td>
            <td className="px-4 py-3">
              <Badge tone={low ? "warning" : "success"}>{low ? "Ниже порога" : "Ок"}</Badge>
            </td>
          </>
        );
      }} />
    </div>
  );
};

export default Page;
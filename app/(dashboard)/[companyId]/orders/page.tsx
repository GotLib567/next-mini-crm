import React from 'react';
import Input from "@/components/ui/input";
import {ChevronDown, Plus, Search} from "lucide-react";
import Button from "@/components/ui/button";
import Table from "@/components/ui/table";
import {orders, statuses} from "@/constants";
import Badge from "@/components/ui/badge";

const cols = [
  { title: "#", className: "w-12" },
  { title: "Клиент" },
  { title: "Дата/время" },
  { title: "Услуга" },
  { title: "Цена", className: "text-right" },
  { title: "С/с", className: "text-right" },
  { title: "Прибыль", className: "text-right" },
  { title: "Статус", className: "w-40" },
];

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input icon={Search} placeholder="Поиск заказов…" className="w-full sm:w-64" />
        <Button variant="soft">Статус <ChevronDown className="h-4 w-4" /></Button>
        <Button variant="soft">Период <ChevronDown className="h-4 w-4" /></Button>
        <Button variant="soft">Услуга <ChevronDown className="h-4 w-4" /></Button>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost">Экспорт</Button>
          <Button variant="primary"><Plus className="h-4 w-4"/> Новый заказ</Button>
        </div>
      </div>
      <Table columns={cols} rows={orders} renderRow={(o) => (
        <>
          <td className="px-4 py-3 text-neutral-500">{o.id}</td>
          <td className="px-4 py-3 font-medium">{o.client}</td>
          <td className="px-4 py-3">{o.datetime}</td>
          <td className="px-4 py-3">{o.service}</td>
          <td className="px-4 py-3 text-right">{o.price.toLocaleString()} ₽</td>
          <td className="px-4 py-3 text-right">{o.cost.toLocaleString()} ₽</td>
          <td className="px-4 py-3 text-right font-medium">{(o.price - o.cost).toLocaleString()} ₽</td>
          <td className="px-4 py-3">
            <Badge tone={statuses[o.status].tone}>{statuses[o.status].icon}{o.status}</Badge>
          </td>
        </>
      )} />
    </div>
  );
};

export default Page;
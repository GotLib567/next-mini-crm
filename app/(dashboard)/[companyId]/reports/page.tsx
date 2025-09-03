'use client';
import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {chartData} from "@/constants";

const Page = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Card>
        <CardHeader title="Выручка vs Расходы" subtitle="За 7 дней" />
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="d" tickLine={false} axisLine={false} dy={6} />
              <YAxis tickLine={false} axisLine={false} dx={-6} />
              <Tooltip />
              <Bar dataKey="revenue" />
              <Bar dataKey="cost" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Конверсия" subtitle="Заявки → Выполненные" />
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Card className="col-span-1">
              <CardContent className="p-4">
                <div className="text-xs text-neutral-500">Заявки</div>
                <div className="text-2xl font-semibold">52</div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardContent className="p-4">
                <div className="text-xs text-neutral-500">Записанные</div>
                <div className="text-2xl font-semibold">38</div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardContent className="p-4">
                <div className="text-xs text-neutral-500">Выполненные</div>
                <div className="text-2xl font-semibold">31</div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">Конверсия: 31 / 52 = <span className="font-semibold">59.6%</span></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
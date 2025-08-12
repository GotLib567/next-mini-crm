'use client';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Button from "@/components/ui/button";
import {chartData, kpis, materials, notifications} from "@/constants";
import Badge from "@/components/ui/badge";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-500">{k.title}</div>
                    <div className="mt-1 text-2xl font-semibold">{k.value}</div>
                    <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">{k.delta}</div>
                  </div>
                  <div className="rounded-xl bg-neutral-100 p-3 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">{k.icon}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Finance chart + Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader title="Динамика — 7 дней" subtitle="Выручка и расходы" actions={
            <Button variant="soft" size="sm">За неделю</Button>
          }/>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="d" tickLine={false} axisLine={false} dy={6} />
                <YAxis tickLine={false} axisLine={false} dx={-6} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="cost" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Уведомления" subtitle="Последние события" />
          <CardContent>
            <ul className="space-y-3">
              {notifications.map((n, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-1 h-2.5 w-2.5 rounded-full ${n.type === "warning" ? "bg-amber-500" : n.type === "success" ? "bg-emerald-500" : "bg-blue-500"}`} />
                  <div>
                    <div className="text-sm text-neutral-800 dark:text-neutral-200">{n.text}</div>
                    <div className="text-xs text-neutral-500">{n.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Low stock */}
      <Card>
        <CardHeader title="Низкие остатки" subtitle="Материалы ниже порога" />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {materials.filter(m => m.stock < m.threshold).map((m, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 p-3">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-neutral-500">Остаток: {m.stock} {m.unit} • Порог: {m.threshold}</div>
                </div>
                <Badge tone="warning">Пополнить</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

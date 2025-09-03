'use client';
import React from 'react';
import Button from "@/components/ui/button";
import {Plus} from "lucide-react";
import { motion } from "framer-motion";

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const events = [
  { day: 0, start: 10, end: 11, title: "Консультация — Ким", tone: "info" },
  { day: 0, start: 12, end: 13, title: "Полировка — Иванов", tone: "primary" },
  { day: 1, start: 14, end: 16, title: "Покраска — Петрова", tone: "violet" },
  { day: 2, start: 12, end: 13, title: "Реставрация — Сидоров", tone: "success" },
];

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="soft">Сегодня</Button>
        <Button variant="soft">Неделя</Button>
        <div className="ml-auto" />
        <Button variant="primary"><Plus className="h-4 w-4"/> Запись</Button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-7 text-xs bg-neutral-50 dark:bg-neutral-900/50">
          {days.map((d) => (
            <div key={d} className="px-3 py-2 font-medium text-neutral-600 dark:text-neutral-300">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 h-[680px] bg-white dark:bg-neutral-900">
          {Array.from({ length: 7 }).map((_, col) => (
            <div key={col} className="relative border-l border-neutral-100 dark:border-neutral-800">
              {/* hour grid */}
              {Array.from({ length: 12 }).map((_, h) => (
                <div key={h} className="h-[56px] border-t border-neutral-50 dark:border-neutral-800/70" />
              ))}
              {/* events */}
              {events.filter((e) => e.day === col).map((e, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute left-2 right-2 rounded-xl p-2 text-xs shadow-sm border ${
                    e.tone === "success"
                      ? "bg-emerald-100/70 border-emerald-200 text-emerald-900 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-200"
                      : e.tone === "violet"
                        ? "bg-violet-100/70 border-violet-200 text-violet-900 dark:bg-violet-900/30 dark:border-violet-800 dark:text-violet-200"
                        : e.tone === "primary"
                          ? "bg-blue-100/70 border-blue-200 text-blue-900 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200"
                          : "bg-neutral-100/70 border-neutral-200 text-neutral-900 dark:bg-neutral-800/50 dark:border-neutral-700 dark:text-neutral-200"
                  }`}
                  style={{ top: e.start * 56, height: (e.end - e.start) * 56 }}
                >
                  {e.title}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
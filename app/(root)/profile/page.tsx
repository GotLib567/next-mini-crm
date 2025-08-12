import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {CalendarDays, Mail, MessageSquare, Phone, Search, UserIcon} from "lucide-react";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import {chatList, chatMessages} from "@/constants";

const Page = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
      {/* Left column: profile cards */}
      <div className="xl:col-span-4 space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-neutral-500" />
              </div>
              <div>
                <div className="text-lg font-semibold">Алексей Мастер</div>
                <div className="text-sm text-neutral-500">Мастерская «Handcraft Lab»</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Профи</Badge>
              <Badge tone="success">Онлайн‑оплата</Badge>
              <Badge tone="info">Виджет активен</Badge>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="soft">Редактировать</Button>
              <Button variant="ghost">Загрузить лого</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Контакты" />
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> +7 999 123‑45‑67</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> master@example.com</div>
            <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4"/> Пн‑Пт 10:00–19:00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Предпочтения" />
          <CardContent>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">Предоплата 30%, напоминания −24 ч и −1 ч, двусторонняя синхронизация календаря.</div>
          </CardContent>
        </Card>
      </div>

      {/* Right column: chats */}
      <div className="xl:col-span-8">
        <Card>
          <CardHeader title="Чаты" subtitle="Диалог с клиентами" actions={<Button variant="soft"><MessageSquare className="h-4 w-4"/> Новый диалог</Button>} />
          <CardContent className="p-0">
            <div className="grid grid-cols-12 h-[520px]">
              {/* chat list */}
              <div className="col-span-5 border-r border-neutral-200 dark:border-neutral-800 p-3">
                <div className="mb-2"><Input icon={Search} placeholder="Поиск диалогов…" /></div>
                <ul className="space-y-1 overflow-auto h-[460px] pr-1">
                  {chatList.map((c) => (
                    <li key={c.id} className="rounded-xl p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-neutral-400">{c.time}</div>
                      </div>
                      <div className="mt-1 line-clamp-1 text-sm text-neutral-500">{c.last}</div>
                      <div className="mt-2"><Badge tone={c.badge === "VIP" ? "success" : c.badge === "Оплачено" ? "info" : "default"}>{c.badge}</Badge></div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* chat window */}
              <div className="col-span-7 flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center"><UserIcon className="h-5 w-5 text-neutral-500"/></div>
                    <div>
                      <div className="text-sm font-medium">Иван Иванов</div>
                      <div className="text-xs text-neutral-500">В сети</div>
                    </div>
                  </div>
                  <Button variant="soft" size="sm">Карточка клиента</Button>
                </div>
                <div className="flex-1 overflow-auto p-4 space-y-3 bg-white dark:bg-neutral-900">
                  {chatMessages[1].map((m, i) => (
                    <div key={i} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${m.from === "master" ? "ml-auto bg-blue-600 text-white" : "bg-neutral-100 dark:bg-neutral-800"}`}>
                      <div>{m.text}</div>
                      <div className={`mt-1 text-[10px] ${m.from === "master" ? "text-white/70" : "text-neutral-500"}`}>{m.at}</div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-neutral-200 dark:border-neutral-800 p-3 flex items-center gap-2">
                  <Input placeholder="Написать сообщение…" className="flex-1" />
                  <Button variant="primary">Отправить</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
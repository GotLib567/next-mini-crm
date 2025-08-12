'use client';
import React from 'react';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import {Lock, LogIn, Mail, Phone} from "lucide-react";
import {useRouter} from "next/navigation";

const AuthForm = () => {
  const [tab, setTab] = React.useState("phone");
  const router = useRouter();

  const handleSubmit = () => {
    console.log('Вход');
    router.push("/");
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="h-10 w-10 rounded-xl bg-neutral-900 dark:bg-white" />
        <div>
          <div className="font-semibold">MasterCRM</div>
          <div className="text-xs text-neutral-500">Вход / Регистрация</div>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <Button variant={tab === "phone" ? "solid" : "soft"} onClick={() => setTab("phone")}><Phone className="h-4 w-4"/> Телефон</Button>
        <Button variant={tab === "email" ? "solid" : "soft"} onClick={() => setTab("email")}><Mail className="h-4 w-4"/> Email</Button>
      </div>
      {tab === "phone" ? (
        <div className="space-y-3">
          <Input icon={Phone} placeholder="Телефон" />
          <div className="grid grid-cols-4 gap-2">
            <Input placeholder="Код" />
            <Input placeholder="Код" />
            <Input placeholder="Код" />
            <Input placeholder="Код" />
          </div>
          <Button variant="primary" className="w-full" onClick={handleSubmit}><LogIn className="h-4 w-4"/> Войти</Button>
          <div className="text-xs text-neutral-500 text-center">Нажимая «Войти», вы соглашаетесь с условиями сервиса.</div>
        </div>
      ) : (
        <div className="space-y-3">
          <Input icon={Mail} placeholder="Email" type="email" />
          <Input icon={Lock} placeholder="Пароль" type="password" />
          <Button variant="primary" className="w-full" onClick={handleSubmit}><LogIn className="h-4 w-4"/> Войти</Button>
          <div className="text-xs text-neutral-500 text-center">Или войдите по одноразовому коду на email.</div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
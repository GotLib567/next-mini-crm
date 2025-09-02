'use client';
import React from 'react';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Lock, LogIn, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type PageType = 'register' | 'login';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(API_BASE)

const AuthForm = ({ pageType = "register" }: { pageType: PageType }) => {
  const [tab, setTab] = React.useState<"phone" | "email">("email");

  // login
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // register
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("MASTER");

  const [err, setErr] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!res?.error) {
        router.push("/");
      } else {
        // res.error часто "CredentialsSignin"
        setErr("Неверный email или пароль");
      }
    } catch (e) {
      setErr("Ошибка входа. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!firstName || !lastName || !email || !phone || !password || !role) {
      setErr("Заполните все поля");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          password,
          role,
        }),
      });

      if (!r.ok) {
        // 400 / 409 и т.п.
        const text = await r.text();
        setErr(text || "Не удалось зарегистрироваться");
        return;
      }

      // автологин после регистрации
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!res?.error) {
        router.push("/");
      } else {
        setErr("Регистрация успешна, но вход не выполнен. Попробуйте войти вручную.");
      }
    } catch (e) {
      setErr("Сбой сети. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {pageType === "register" ? (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-neutral-900 dark:bg-white" />
            <div>
              <div className="font-semibold">MasterCRM</div>
              <div className="text-xs text-neutral-500">Регистрация</div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-3">
            <Input
              icon={User}
              placeholder="Имя"
              type="text"
              value={firstName}
              autoComplete="given-name"
              disabled={loading}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              icon={User}
              placeholder="Фамилия"
              type="text"
              value={lastName}
              autoComplete="family-name"
              disabled={loading}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              icon={Mail}
              placeholder="Email"
              type="email"
              value={email}
              autoComplete="email"
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Phone}
              placeholder="Телефон"
              type="tel"
              value={phone}
              autoComplete="tel"
              disabled={loading}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              icon={Lock}
              placeholder="Пароль"
              type="password"
              value={password}
              autoComplete="new-password"
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Роль (например, USER)"
              type="text"
              value={role}
              disabled={loading}
              onChange={(e) => setRole(e.target.value)}
            />

            {err && <div className="text-sm text-red-500">{err}</div>}

            <Button variant="primary" className="w-full" type="submit" disabled={loading}>
              <LogIn className="h-4 w-4" /> {loading ? "Отправка..." : "Зарегистрироваться"}
            </Button>
            <div className="text-xs text-neutral-500 text-center">
              Нажимая «Зарегистрироваться», вы соглашаетесь с условиями сервиса.
            </div>
          </form>
        </div>
      ) : pageType === "login" ? (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-neutral-900 dark:bg-white" />
            <div>
              <div className="font-semibold">MasterCRM</div>
              <div className="text-xs text-neutral-500">Вход</div>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button variant={tab === "phone" ? "solid" : "soft"} onClick={() => setTab("phone")}>
              <Phone className="h-4 w-4" /> Телефон
            </Button>
            <Button variant={tab === "email" ? "solid" : "soft"} onClick={() => setTab("email")}>
              <Mail className="h-4 w-4" /> Email
            </Button>
          </div>

          {tab === "phone" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setErr("Вход по телефону пока не реализован.");
              }}
              className="space-y-3"
            >
              <Input icon={Phone} placeholder="Телефон" disabled />
              <div className="grid grid-cols-4 gap-2">
                <Input placeholder="Код" disabled />
                <Input placeholder="Код" disabled />
                <Input placeholder="Код" disabled />
                <Input placeholder="Код" disabled />
              </div>
              <Button variant="primary" className="w-full" type="submit" disabled>
                <LogIn className="h-4 w-4" /> Войти
              </Button>
              <div className="text-xs text-neutral-500 text-center">
                Включите вход по телефону на бэке, чтобы активировать.
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-3">
              <Input
                icon={Mail}
                placeholder="Email"
                type="email"
                value={email}
                autoComplete="email"
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon={Lock}
                placeholder="Пароль"
                type="password"
                value={password}
                autoComplete="current-password"
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
              {err && <div className="text-sm text-red-500">{err}</div>}
              <Button variant="primary" className="w-full" type="submit" disabled={loading}>
                <LogIn className="h-4 w-4" /> {loading ? "Входим..." : "Войти"}
              </Button>
              <div className="text-xs text-neutral-500 text-center">
                Или войдите по одноразовому коду на email (скоро).
              </div>
            </form>
          )}
        </div>
      ) : (
        "Такой страницы не существует"
      )}
    </div>
  );
};

export default AuthForm;

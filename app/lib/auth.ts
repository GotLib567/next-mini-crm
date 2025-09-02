// app/lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

type BackendLoginResponse = {
  access_token: string;        // подстройте названия полей под свой бэк
  refresh_token: string;
  expires_in: number;          // в секундах
  user: {
    id: string | number;
    email: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    phone?: string;
  };
};

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
    });

    if (!res.ok) throw new Error("Failed to refresh");
    const data: { access_token: string; refresh_token?: string; expires_in: number } = await res.json();

    return {
      ...token,
      accessToken: data.access_token,
      // если бэк выдает новый refresh, обновим
      refreshToken: data.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      error: undefined,
    };
  } catch (e) {
    // сбой обновления — пометим ошибку, на клиенте можно будет разлогинить
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // для app router:
  trustHost: true,
  session: { strategy: "jwt" }, // работаем с JWT в cookie

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // логинимся на /auth/login вашего бэка
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;

        const data: BackendLoginResponse = await res.json();

        // Вернем объект “user”. Токены передадим дальше через jwt callback
        return {
          id: String(data.user.id),
          email: data.user.email,
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          role: data.user.role,
          phone: data.user.phone,

          // переложим в user, чтобы сразу попасть в jwt()
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in,
        } as any;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    /**
     * JWT кладем в cookie. Здесь сохраняем и освежаем токены.
     */
    async jwt({ token, user }) {
      // Первый вход: переносим с authorize()
      if (user) {
        return {
          ...token,
          user: {
            id: (user as any).id,
            email: (user as any).email,
            first_name: (user as any).first_name,
            last_name: (user as any).last_name,
            role: (user as any).role,
            phone: (user as any).phone,
          },
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          accessTokenExpires: Date.now() + ((user as any).expiresIn ?? 0) * 1000,
        };
      }

      // Если токен ещё валиден — оставляем
      if (token.accessToken && token.accessTokenExpires && Date.now() < (token.accessTokenExpires as number) - 30_000) {
        return token;
      }

      // Иначе обновляем
      return await refreshAccessToken(token);
    },

    /**
     * Что отдадим клиенту через useSession()/auth()
     */
    async session({ session, token }) {
      session.user = token.user as any;
      (session as any).accessToken = token.accessToken;
      (session as any).error = token.error;
      return session;
    },

    /**
     * Авторизация для middleware: пускать ли на маршрут
     */
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = request.nextUrl;

      // Разрешим гостям login/register
      if (pathname.startsWith("/login") || pathname.startsWith("/register")) return true;

      return isLoggedIn; // остальные — только если залогинен
    },
  },
});

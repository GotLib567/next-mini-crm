async function registerAndLogin(payload: {
  first_name: string; last_name: string; email: string;
  phone: string; password: string; role: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.log(text);
    throw new Error(text || "Не удалось зарегистрировать");
  }

  // при успехе сразу логиним через NextAuth
  // await signIn("credentials", {
  //   email: payload.email,
  //   password: payload.password,
  //   redirect: true,
  //   callbackUrl: "/", // куда попасть после логина
  // });
}

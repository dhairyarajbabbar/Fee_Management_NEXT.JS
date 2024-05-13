import { LoginForm } from "./loginForm";
const Url = "http://localhost:5000/v1";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export default async function Student() {
  const cookieStore = cookies();

  async function formProcessor(formdata) {
    "use server";
    const response = await fetch(`http://localhost:5000/v1/auth/school/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formdata),
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      const headers = response.headers;
      const cookiesHeader = headers.get("Set-Cookie");
      console.log(cookiesHeader);
      if (cookiesHeader) {
        const cookiesArray = cookiesHeader.split("; ");
        const accessTokenCookie = cookiesArray.find((cookie) =>
          cookie.includes("accessToken")
        );
        if (accessTokenCookie) {
          const [name, value] = accessTokenCookie.split("=");
          const options = {};
          cookiesArray.forEach((cookie) => {
            if (!cookie.includes("accessToken")) {
              const [paramName, paramValue] = cookie.split("=");
              const lowerParamName =
                paramName.charAt(0).toLowerCase() + paramName.slice(1);
              options[lowerParamName] = paramValue || true;
            }
          });
          console.log(options);
          // const exp=options?.expires;
          cookies().set(name.trim(), value.trim(), {
            httpOnly: true,
            path: "/",
            expires: new Date(options.expires),
          });
          redirect('/students');
        }
      }
      const result = await response.json();
    } else {
      console.error("Failed to login. Status:", response.status);
    }
  }

  return (
    <div className="">
      <div className="items-center">
        <header className="text-[36px] font-[700]">Login</header>
        <LoginForm action={formProcessor} />
      </div>
    </div>
  );
}

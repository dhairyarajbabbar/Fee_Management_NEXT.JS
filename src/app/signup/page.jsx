import { SignupForm } from "./signupForm";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
export const dynamic = 'force-dynamic'
export default async function Student() {

  async function formProcessor(formdata) {
    "use server";
    const response = await fetch(`${process.env.baseUrl}/auth/school/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formdata),
      mode: "cors",
      credentials: "include",
    });
    console.log(response);
    if(response.ok)
      redirect('/login');

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
          cookies().set(name.trim(), value.trim(), {
            httpOnly: true,
            path: "/",
            expires: new Date(options.expires),
          });
          redirect('/login');
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
        <header className="text-[36px] font-[700]" >Sign Up</header>
        <SignupForm action={formProcessor} />
      </div>
    </div>
  );
}

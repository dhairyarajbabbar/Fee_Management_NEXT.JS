import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  let redirectPath = "/login";

  console.log("token by me : ", token);
  if (token.value) {
    redirectPath = "/students";
  }
  if (redirectPath) redirect(redirectPath);
  return <>home</>;
}

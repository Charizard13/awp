import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  if (user) {
    return (
      <form action={signOut}>
        <Button variant="ghost">Logout</Button>
      </form>
    );
  }
  return (
    <Button asChild variant="secondary">
      <Link href="/login">Login</Link>
    </Button>
  );
}

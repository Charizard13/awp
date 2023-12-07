import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import SubmitButton from "./SubmitButton";

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
        <SubmitButton variant="ghost">Logout</SubmitButton>
      </form>
    );
  }
  return (
    <Button asChild variant="secondary">
      <Link href="/login">Login</Link>
    </Button>
  );
}

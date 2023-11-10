import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    "use server";
    const provider = formData.get("provider") as Provider;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect(data.url);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signIn}>
        <h1 className="text-3xl font-semibold">Login</h1>
        <h2 className="text-xl font-semibold">Welcome to Awp</h2>
        <Button variant="outline" type="submit" name="provider" value="google">
          Google
        </Button>
        {searchParams?.message && <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>}
      </form>
    </div>
  );
}

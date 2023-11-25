import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/url";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const provider = formData.get("provider") as Provider;
    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getSiteUrl() + "auth/callback",
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    redirect(data.url);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <h1 className="text-3xl font-semibold">Login</h1>
        <h2 className="text-xl font-semibold">Welcome to Awp</h2>
        <Button variant="outline" type="submit" name="provider" value="google">
          Google
        </Button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}

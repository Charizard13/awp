import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";
import { getDefaultUrl } from "@/lib/url";
import SubmitButton from "@/components/SubmitButton";
import GoogleIcon from "./_components/GoogleIcon";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    "use server";

    const provider = formData.get("provider") as Provider;
    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);
    const redirectTo = getDefaultUrl() + "auth/callback";
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    redirect(data.url);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={signIn}>
        <h1 className="text-3xl font-semibold">Login</h1>
        <h2 className="text-xl font-semibold">Welcome to Awp</h2>
        <SubmitButton variant="outline" name="provider" value="google">
          <GoogleIcon className="w-6 h-6 mr-2" /> Google
        </SubmitButton>
        {searchParams?.message && <p className="mt-4 p-4 rounded-md bg-foreground/10 text-foreground text-center">{searchParams.message}</p>}
      </form>
    </div>
  );
}

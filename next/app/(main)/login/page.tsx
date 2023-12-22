import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";
import { getDefaultUrl } from "@/lib/url";
import SubmitButton from "@/components/SubmitButton";
import GoogleIcon from "../../../components/icons/Google";

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
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        className="animate-in text-foreground flex w-full flex-1 flex-col justify-center gap-2"
        action={signIn}
      >
        <h1 className="text-3xl font-semibold">Login</h1>
        <h2 className="text-xl font-semibold">Welcome to Awp</h2>
        <SubmitButton variant="outline" name="provider" value="google">
          <GoogleIcon className="mr-2 h-6 w-6" /> Google
        </SubmitButton>
        {searchParams?.message && (
          <p className="bg-foreground/10 text-foreground mt-4 rounded-md p-4 text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}

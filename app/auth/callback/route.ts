import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  console.log({ code });

  if (code) {
    const cookieStore = cookies();

    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(next);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect("/login/auth-code-error");
}

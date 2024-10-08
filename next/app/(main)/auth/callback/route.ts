import { getDefaultUrl } from "@/lib/url";
import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  // const next = searchParams.get("next") ?? "/";

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const url = getDefaultUrl();
      return NextResponse.redirect(url);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect("/login/auth-code-error");
}

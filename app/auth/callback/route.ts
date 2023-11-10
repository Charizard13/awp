import { getURL } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  // const next = searchParams.get("next") ?? "/";

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(getURL());
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect("/login/auth-code-error");
}

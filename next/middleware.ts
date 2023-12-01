import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createMiddlewareClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user.id;
    const redirect = isAuthorized(request, userId);
    if (redirect) {
      const message = `You must be signed in to access ${request.nextUrl.pathname}`;
      return NextResponse.redirect(new URL(`/login?message=${message}`, request.url));
    }
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

function isAuthorized(request: NextRequest, userId: string | undefined) {
  return protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route) && !userId);
}

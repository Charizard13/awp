import { Database } from "@/types";
import { createBrowserClient } from "@supabase/ssr";

export const createWebClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
export const supabaseWebClient = createWebClient();

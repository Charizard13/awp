import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import { getAppAssetsUrls } from "@/lib/url";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppCard from "./AppCard";

const getApps = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { error: appError, data: apps } = await supabase.from("apps").select();

  if (appError) {
    return redirect(
      "/dashboard?message=There was an error getting your app metadata.",
    );
  }

  const output = apps.map((app) => {
    const { iconUrl, manifestUrl, scriptUrl } = getAppAssetsUrls(app.id);
    return {
      ...app,
      iconUrl,
      manifestUrl,
      scriptUrl,
    };
  });

  return output;
};

export default async function AppsList() {
  const apps = await getApps();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      {apps.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
          <p>You don&apos;t have any apps yet.</p>
          <Button asChild>
            <Link href="/dashboard/apps/create">Create App</Link>
          </Button>
        </div>
      )}
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}

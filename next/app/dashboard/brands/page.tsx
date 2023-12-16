import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import { getAppAssetsUrls } from "@/lib/url";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AppCard from "./_components/Card";

const getApps = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { error: appError, data: apps } = await supabase
    .from("brands")
    .select();

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

export default async function AppsPage() {
  const apps = await getApps();

  if (apps.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <p>You don&apos;t have any apps yet.</p>
        <Button asChild>
          <Link href="/dashboard/brands/create">Create App</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      {apps.map((app) => (
        <AppCard key={app.id} app={app} />
      ))}
    </div>
  );
}

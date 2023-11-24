import CodeSnippet from "@/components/CodeSnippet";
import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
import { getAppAssetsUrls } from "@/lib/url";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const getApps = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { error: appError, data: apps } = await supabase.from("apps").select();

  if (appError) {
    return redirect("/dashboard?message=There was an error getting your app metadata.");
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

export default async function Info() {
  const apps = await getApps();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      {apps.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
          <p>You don&apos;t have any apps yet.</p>
          <Button asChild>
            <Link href="/dashboard/manifest">Create App</Link>
          </Button>
        </div>
      )}
      {apps.map(({ iconUrl, name, description, manifestUrl, scriptUrl }) => (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4" key={name}>
          <Image src={iconUrl} alt="App Icon" height={128} width={128} className="rounded-md" />
          <p>{name}</p>
          <p>{description}</p>
          <CodeSnippet
            code={`<link rel="manifest" href="${manifestUrl}" />
                  <script src="${scriptUrl}" defer />`}
            description="Copy this and paste between the <head> tags of your app."
          />
        </div>
      ))}
    </div>
  );
}

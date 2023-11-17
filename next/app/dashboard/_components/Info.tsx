import CodeSnippet from "@/components/CodeSnippet";
import { Button } from "@/components/ui/button";
import { createServerClient } from "@/lib/supabase/server";
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
    const { data: icon } = supabase.storage.from("app_icon").getPublicUrl(app.icon);

    const { data: manifest } = supabase.storage.from("app_manifest").getPublicUrl(app.name);

    return {
      ...app,
      iconURL: icon.publicUrl,
      manifestURL: manifest.publicUrl,
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
          <p>Click the button below to create one.</p>
          <Button asChild>
            <Link href="/dashboard/manifest">Create App</Link>
          </Button>
        </div>
      )}
      {apps.map(({ iconURL, name, description, manifestURL }) => (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4" key={name}>
          <Image src={iconURL} alt="App Icon" height={128} width={128} className="rounded-md" />
          <p>{name}</p>
          <p>{description}</p>
          <CodeSnippet code={`<link rel="manifest" href="${manifestURL}" />`} description="Copy this and paste between the <head> tags of your app." />
        </div>
      ))}
    </div>
  );
}

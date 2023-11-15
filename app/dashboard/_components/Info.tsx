import CodeSnippet from "@/components/CodeSnippet";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const getApps = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
      {apps.map(({ iconURL, name, description, manifestURL }) => (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
          <Image src={iconURL} alt="App Icon" width={128} height={128} className="rounded-md" />
          <p>{name}</p>
          <p>{description}</p>
          <CodeSnippet code={`<link rel="manifest" href="${manifestURL}" />`} description="Copy this and paste between the <head> tags of your app." />
        </div>
      ))}
    </div>
  );
}

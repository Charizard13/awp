import CodeSnippet from "@/components/CodeSnippet";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const getManifest = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error: appError, data: app } = await supabase.from("apps").select().limit(1).single();

  if (appError) {
    return redirect("/dashboard?message=There was an error getting your app metadata.");
  }

  const { data: icon } = supabase.storage.from("app_icon").getPublicUrl(app.icon);

  const { data: manifest } = supabase.storage.from("app_manifest").getPublicUrl(app.name);

  return {
    app,
    iconURL: icon.publicUrl,
    manifestURL: manifest.publicUrl,
  };
};

export default async function Info() {
  const { app, iconURL, manifestURL } = await getManifest();

  const manifestLink = `<link rel="manifest" href="${manifestURL}" />`;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <h3 className="text-2xl">App Metadata</h3>
      <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
        <Image src={iconURL} alt="App Icon" width={128} height={128} className="rounded-md" />
        <p>{app.name}</p>
        <p>{app.description}</p>
        <CodeSnippet code={manifestLink} description="Copy this and paste between the <head> tags of your app." />
      </div>
    </div>
  );
}

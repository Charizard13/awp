import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const getManifest = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error: appError, data: app } = await supabase.from("apps").select().single();

  if (appError) {
    throw new Error("There was an error getting your app metadata.");
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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <h1 className="text-4xl font-bold">App Metadata</h1>
      <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
        <img src={iconURL} alt="App Icon" />
        <p>{app.name}</p>
        <p>{app.description}</p>
        <a href={manifestURL}>Download Manifest</a>
      </div>
    </div>
  );
}

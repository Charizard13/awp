import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { generateManifest } from "@/lib/pwa/manifest";
import { generateScript } from "@/lib/pwa/script";
import { appAssets } from "@/lib/consts";
import SubmitButton from "@/components/SubmitButton";
import Image from "next/image";
import { getAppAssetsUrls } from "@/lib/url";
export default async function EditAppPage({
  params,
}: {
  params: { message: string; id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { error: appError, data: app } = await supabase
    .from("apps")
    .select()
    .eq("id", params.id)
    .single();

  if (appError || !app) {
    throw new Error("Could not find your app");
  }

  const { iconUrl } = getAppAssetsUrls(app.id);

  const handleSubmitEditApp = async (formData: FormData) => {
    "use server";
    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);

    const route = `/dashboard/apps/${app.id}/edit`;

    const icon = formData.get("icon") as File;
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;

    if (icon) {
      const pngIcon = new Blob([icon], { type: "image/png" });
      supabase.storage
        .from("apps")
        .upload(`${app.id}/${appAssets.icon}`, pngIcon, {
          upsert: true,
          contentType: "Blob",
        });
    }

    const { error: updateError } = await supabase
      .from("apps")
      .update({ name, description, url })
      .match({ id: app.id });

    if (updateError) {
      return redirect(
        `${route}?message=There was an error updating your metadata.`,
      );
    }

    const appManifest = generateManifest(app, icon?.type);
    const { error: manifestError } = await supabase.storage
      .from("apps")
      .upload(`${app.id}/${appAssets.manifest}`, appManifest, {
        contentType: "Blob",
        upsert: true,
      });

    if (manifestError) {
      return redirect(
        `${route}?message=There was an error updating your metadata.`,
      );
    }

    const appScript = await generateScript();
    const { error: scriptError } = await supabase.storage
      .from("apps")
      .upload(`${app.id}/${appAssets.script}`, appScript, {
        contentType: "Blob",
        upsert: true,
      });

    if (scriptError) {
      return redirect(
        `${route}?message=There was an error updating your metadata.`,
      );
    }

    return redirect(`/dashboard/apps`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <Card className="m-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Edit App</CardTitle>
        </CardHeader>
        <form action={handleSubmitEditApp}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="icon-upload">Icon</Label>
                <Input
                  accept="image/*"
                  id="icon-upload"
                  type="file"
                  name="icon"
                />
                <Image
                  src={iconUrl}
                  alt={app.name}
                  className="w-16 h-16 rounded-full"
                  width={100}
                  height={100}
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Upload your app&apos;s icon.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-name">Name</Label>
                <Input
                  id="app-name"
                  placeholder="App Name"
                  required
                  name="name"
                  maxLength={50}
                  minLength={3}
                  defaultValue={app.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-url">URL</Label>
                <Input
                  id="app-url"
                  placeholder="https://www.example.com"
                  required
                  name="url"
                  maxLength={150}
                  minLength={10}
                  defaultValue={app.url}
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Enter the link of your website.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-description">
                  App Description (Optional)
                </Label>
                <Textarea
                  className="min-h-[100px]"
                  id="app-description"
                  placeholder="Describe your app"
                  name="description"
                  maxLength={150}
                  minLength={10}
                  defaultValue={app.description ?? undefined}
                />
              </div>
              {params?.message && (
                <p className="mt-4 p-4 rounded-sm  bg-foreground/10 text-foreground text-center text-red-500">
                  {params.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton className="ml-auto">Update App</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

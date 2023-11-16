import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateManifest } from "@/lib/pwa/manifest";

export default function MetaData({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const handleSubmit = async (formData: FormData) => {
    "use server";

    const icon = formData.get("icon") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id;
    const route = "/dashboard/manifest";

    if (!userId) {
      return redirect(
        `${route}?message=You must be logged in to create metadata.`,
      );
    }

    const pngIcon = new Blob([icon], { type: "image/png" });
    const { data: iconData, error: iconError } = await supabase.storage
      .from("app_icon")
      .upload(name, pngIcon, {
        upsert: true,
      });

    if (iconError || !iconData) {
      console.log(iconError, iconData);
      return redirect(
        `${route}?message=There was an error uploading your icon.`,
      );
    }

    const { error, data } = await supabase
      .from("apps")
      .insert({
        name,
        description,
        user_id: userId,
        icon: iconData.path,
      })
      .select()
      .single();

    if (error) {
      return redirect(
        `${route}?message=There was an error creating your metadata.`,
      );
    }

    const appManifest = generateManifest(data, pngIcon.type);

    const { error: manifestError } = await supabase.storage
      .from("app_manifest")
      .upload(name, appManifest, {
        upsert: true,
      });

    if (manifestError) {
      return redirect(
        `${route}?message=There was an error creating your manifest.`,
      );
    }

    redirect("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <Card className="m-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Create PWA Metadata</CardTitle>
          <CardDescription>
            Provide information for your Progressive Web App
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="icon-upload">App Icon</Label>
                <Input
                  accept="image/*"
                  id="icon-upload"
                  type="file"
                  name="icon"
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Upload your app&apos;s icon.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="app-name">App Name</Label>
                <Input
                  id="app-name"
                  placeholder="App Name"
                  required
                  name="name"
                />
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
                />
              </div>
              {searchParams?.message && (
                <p className="mt-4 p-4 rounded-sm  bg-foreground/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" type="submit">
              Create Metadata
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

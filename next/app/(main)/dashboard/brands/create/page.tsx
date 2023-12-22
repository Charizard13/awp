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
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { appAssets } from "@/lib/consts";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LinksForm from "../[id]/edit/_components/LinksForm";

export default async function CreateBrandPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const route = "/dashboard/brands/create";

    const icon = formData.get("icon") as File;
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;

    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id;

    if (!userId) {
      return redirect(
        `${route}?message=You must be logged in to create metadata.`,
      );
    }

    const { error, data: brand } = await supabase
      .from("brands")
      .insert({
        name,
        description,
        url,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      return redirect(
        `${route}?message=There was an error creating your metadata.`,
      );
    }

    const pngIcon = new Blob([icon], { type: "image/png" });
    const uploadOptions = { contentType: "Blob", upsert: true };
    const uploadIcon = supabase.storage
      .from("brands")
      .upload(`${brand.id}/${appAssets.logo}`, pngIcon, uploadOptions);

    const [iconData] = await Promise.all([uploadIcon]);

    if (iconData.error) {
      await supabase.from("brands").delete().match({ id: brand.id });
      return redirect(
        `${route}?message=There was an error uploading your metadata.`,
      );
    }

    redirect("/dashboard/brands");
  };

  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  const { data: brand } = await supabase.from("brands").select().single();

  if (brand) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <p>You can only create one brand.</p>
        <Button asChild>
          <Link href="/dashboard/brands">
            View <q className="m-2">{brand.name}</q> Brand
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <Card className="m-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Create Brand</CardTitle>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="icon-upload">ogo</Label>
                <Input
                  accept="image/*"
                  id="icon-upload"
                  type="file"
                  name="icon"
                  required
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Upload your brand&apos;s icon.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-name">Name</Label>
                <Input
                  id="brand-name"
                  placeholder="Brand Name"
                  required
                  name="name"
                  maxLength={50}
                  minLength={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-description">
                  Description (150 characters)
                </Label>
                <Textarea
                  className="min-h-[100px]"
                  id="brand-description"
                  placeholder="Tell others about your brand"
                  name="description"
                  maxLength={150}
                  minLength={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-url">Personal Website</Label>
                <Input
                  id="brand-url"
                  placeholder="https://www.example.com"
                  name="url"
                  maxLength={150}
                  minLength={10}
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Enter the link of your website.
                </p>
              </div>
              {searchParams?.message && (
                <p className="bg-foreground/10 text-foreground mt-4  rounded-sm p-4 text-center text-red-500">
                  {searchParams.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton className="ml-auto">Create Brand</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

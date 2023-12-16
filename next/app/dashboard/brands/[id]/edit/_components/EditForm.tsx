"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import LinkButton from "../../../_components/LinkButton";
import { CardTitle, CardHeader, CardFooter, Card } from "@/components/ui/card";

import SubmitButton from "@/components/SubmitButton";
import { Tables } from "@/types/supabase.gen";
type EditProfileProps = {
  brand: Tables<"brands"> & {
    iconUrl: string;
  };
  setNextBrand: (brand: any) => void;
};

export default function EditForm({ brand, setNextBrand }: EditProfileProps) {
  const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNextBrand({ ...brand, [name]: value });
  };
  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Edit App</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="icon-upload">Icon</Label>
            <Input accept="image/*" id="icon-upload" type="file" name="icon" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-name">Name</Label>
            <Input
              id="app-name"
              placeholder="App Name"
              required
              value={brand.name}
              onChange={handleOnChangeEvent}
              name="name"
              maxLength={50}
              minLength={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-url">URL</Label>
            <Input
              id="app-url"
              placeholder="https://www.example.com"
              required
              name="url"
              onChange={handleOnChangeEvent}
              value={brand.url}
              maxLength={150}
              minLength={10}
            />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Enter the link of your website.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="app-description">App Description (Optional)</Label>
            <Textarea
              className="min-h-[100px]"
              id="app-description"
              placeholder="Describe your app"
              name="description"
              maxLength={150}
              minLength={10}
              defaultValue={brand.description ?? undefined}
            />
          </div>
          <LinkButton />
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton className="ml-auto">Update App</SubmitButton>
      </CardFooter>
    </Card>
  );
}

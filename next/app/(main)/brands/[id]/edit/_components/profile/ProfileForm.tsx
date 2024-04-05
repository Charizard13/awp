"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";
import { CardTitle, CardHeader, CardFooter, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TablesInsert, TablesUpdate } from "@/types/supabase.gen";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createWebClient } from "@/lib/supabase/client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { appAssets } from "@/lib/consts";
import * as z from "zod";
import { formSchema } from "./utils";
import { useDebounce } from "@/hooks/useDebounce";
import { SetBrand } from "@/app/(main)/brands/[id]/edit/_lib/types";
import {QUERY_KEYS} from "@/lib/queries";

type EditProfileProps = {
  brand: TablesInsert<"brands"> & {
    logoUrl: string;
  };
  setNextBrand: SetBrand;
  brandId: string;
};

export default function ProfileForm({
  brand,
  setNextBrand,
  brandId,
}: EditProfileProps) {
  const [iconFile, setIconFile] = useState<File | null>(null);
  const supabase = createWebClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: undefined,
      name: brand.name ?? "",
      description: brand.description ?? "",
      website: brand.website ?? "",
    },
  });

  const debouncedUsername = useDebounce(form.getValues("name"), 500);

  useQuery({
    queryKey: [QUERY_KEYS.IS_NAME_AVAILABLE, debouncedUsername],
    enabled: !!debouncedUsername,
    queryFn: async () => {
      if (form.getValues("name") === brand.name) {
        return;
      }
      const { count, error } = await supabase
        .from("brands")
        .select("*", { count: "exact", head: true })
        .eq("name", form.getValues("name"))
        .single();

      if (!error && count && count > 0) {
        form.setError("name", {
          type: "manual",
          message: "This username is already taken",
        });
      }
    },
  });

  useEffect(() => {
    form.watch((values) => {
      const { name, website, description } = values;
      setNextBrand((prevState) => {
        if (!prevState) return;
        return {
          ...prevState,
          name,
          website,
          description,
        };
      });
    });
  }, [form, setNextBrand]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const icon = files[0];
      const iconUrl = URL.createObjectURL(icon);
      setNextBrand((prevState) => {
        if (!prevState) return;
        return {
          ...prevState,
          logoUrl: iconUrl,
        };
      });
      setIconFile(icon);
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.BRAND, brandId],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const user = await supabase.auth.getUser();
      const userId = user?.data?.user?.id;
      if (!userId) {
        throw new Error("You must be logged in to update metadata.");
      }
      const { error } = await supabase
        .from("brands")
        .upsert({
          name: values.name,
          description: values.description,
          website: values.website,
          user_id: userId,
        })
        .eq("id", brandId);
      if (error) {
        throw new Error(error.message);
      }
      if (!iconFile) {
        return;
      }
      const { error: iconError } = await supabase.storage
        .from("brands")
        .upload(`${brandId}/${appAssets.logo}`, iconFile, {
          upsert: true,
          contentType: "Blob",
        });
      if (iconError) {
        throw new Error(iconError.message);
      }
    },
    onSuccess: () =>
      toast({
        title: "Brand updated",
        description: "Your brand has been updated successfully",
      }),
    onError: (e) =>
      toast({
        title: "Error",
        description: e.message,
      }),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) =>
    mutateAsync(values);

  return (
    <Card className="flex flex-col p-4">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="logo"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="icon-upload">Logo</FormLabel>
                  <FormControl>
                    <Input
                      accept="image/*"
                      id="icon-upload"
                      type="file"
                      name="icon"
                      onChange={handleImageUpload}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your public brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Tell us a little bit about yourself"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mt-auto">
            <LoadingButton
              isLoading={isPending}
              type="submit"
              className="w-full"
            >
              Save Changes
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

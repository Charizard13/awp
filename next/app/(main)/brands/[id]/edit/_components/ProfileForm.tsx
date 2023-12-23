"use client";
import { useEffect } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { createWebClient } from "@/lib/supabase/client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { appAssets } from "@/lib/consts";
import * as z from "zod";

const optionalUrl = z.union([
  z.string().url().max(500).optional(),
  z.literal(""),
]);
const optionalDescription = z.union([
  z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters long",
    })
    .max(150, {
      message: "Description must be less than 150 characters long",
    })
    .optional(),
  z.literal(""),
]);
const formSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Only letters, numbers and underscores are allowed",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(50, {
      message: "Name must be less than 50 characters long",
    }),
  website: optionalUrl,
  description: optionalDescription,
});

type EditProfileProps = {
  brand: TablesInsert<"brands"> & {
    logoUrl: string;
  };
  setNextBrand: (
    value: React.SetStateAction<
      | (TablesUpdate<"brands"> & {
          logoUrl: string;
          links: TablesUpdate<"links">[];
        })
      | undefined
    >,
  ) => void;
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
      name: brand.name,
      website: brand.website ?? undefined,
      description: brand.description ?? undefined,
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
    mutationKey: ["brand", brandId],
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

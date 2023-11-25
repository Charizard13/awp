"use client";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabaseWebClient } from "@/lib/supabase/client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import LoadingButton from "@/components/LoadingButton";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

type DeleteButtonProps = {
  appId: string;
};

export default function DeleteButton({ appId }: DeleteButtonProps) {
  const { isPending, mutateAsync: handleDelete } = useMutation({
    mutationKey: ["apps", appId],
    mutationFn: async () => {
      const { error } = await supabaseWebClient.from("apps").delete().match({ id: appId });
      if (error) {
        toast({
          title: "Error",
          description: error.message,
        });
        return;
      }
      return revalidatePath("/dashboard");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete app and remove relevant data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild variant="destructive">
            <LoadingButton onClick={handleDelete} variant="destructive" isPending={isPending}>
              Delete
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

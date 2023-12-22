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

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import SubmitButton from "@/components/SubmitButton";
import { appAssets } from "@/lib/consts";

type DeleteButtonProps = {
  brandId: string;
};

export default function DeleteButton({ brandId }: DeleteButtonProps) {
  const handleDelete = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);
    const { error } = await supabase
      .from("brands")
      .delete()
      .match({ id: brandId });

    if (error) {
      throw new Error("Could not delete brand");
    }

    const { error: deleteError } = await supabase.storage
      .from("brands")
      .remove([`${brandId}/${appAssets.logo}`]);

    if (deleteError) {
      throw new Error("Could not delete brand assets");
    }

    return revalidatePath("/dashboard/brands");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete brand and
            remove relevant data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild variant="destructive">
            <form action={handleDelete}>
              <SubmitButton variant="destructive">Delete</SubmitButton>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

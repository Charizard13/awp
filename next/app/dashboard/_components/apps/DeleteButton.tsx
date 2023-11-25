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
import { toast } from "@/components/ui/use-toast";
import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import SubmitButton from "@/components/SubmitButton";

type DeleteButtonProps = {
  appId: string;
};

export default function DeleteButton({ appId }: DeleteButtonProps) {
  const handleDelete = async () => {
    "use server";
    const cookieStore = cookies();
    const supabase = createServerClient(cookieStore);
    const { error } = await supabase.from("apps").delete().match({ id: appId });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
      return;
    }
    return revalidatePath("/dashboard");
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
            This action cannot be undone. This will permanently delete app and
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

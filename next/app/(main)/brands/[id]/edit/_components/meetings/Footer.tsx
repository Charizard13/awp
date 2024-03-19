import LoadingButton from "@/components/LoadingButton";
import { CardFooter } from "@/components/ui/card";

type LinksFormProps = {
  isPending: boolean;
};

export default function Footer({ isPending }: LinksFormProps) {
  return (
    <CardFooter className="mt-auto">
      <LoadingButton isLoading={isPending} type="submit" className="w-full">
        Save Changes
      </LoadingButton>
    </CardFooter>
  );
}

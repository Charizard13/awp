import { TablesInsert } from "@/types";
import { Button } from "../ui/button";
import { getLinkIcon } from "@/app/(main)/dashboard/brands/[id]/edit/_components/LinksForm";

type LinksProps = {
  links: TablesInsert<"links">[];
};

export default function Links({ links }: LinksProps) {
  return (
    <div className="flex w-full flex-col  gap-4">
      {links.map((link) => (
        <Button key={link.id} variant={"outline"} asChild className="min-w-96">
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.description}
            {getLinkIcon(link.description)}
          </a>
        </Button>
      ))}
    </div>
  );
}

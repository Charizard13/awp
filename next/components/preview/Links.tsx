import { TablesInsert, TablesUpdate } from "@/types";
import { Button } from "../ui/button";
import { getLinkIcon } from "@/app/(main)/brands/[id]/edit/_components/LinksForm";

type LinksProps = {
  links: TablesInsert<"links">[] | TablesUpdate<"links">[];
};

export default function Links({ links }: LinksProps) {
  const filteredLinks = links.filter(
    (link) => link.url && link.description,
  ) as TablesInsert<"links">[];
  return (
    <div className="flex w-full flex-col  gap-4">
      {filteredLinks.map((link) => (
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

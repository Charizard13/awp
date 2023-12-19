import { TablesInsert } from "@/types";
import { Button } from "../ui/button";

type LinksProps = {
  links: TablesInsert<"links">[];
};

export default function Links({ links }: LinksProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <Button key={link.id}>
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.description}
          </a>
        </Button>
      ))}
    </div>
  );
}

import { Tables, TablesInsert, TablesUpdate } from "@/types";
import { Button } from "../ui/button";
import Icon from "../Icon";

type LinksProps = {
  links: TablesInsert<"links">[] | TablesUpdate<"links">[];
};

export default function Links({ links }: LinksProps) {
  const filteredLinks = links.filter(
    (link) => link.type !== undefined && link.sub_type !== undefined,
  ) as Tables<"links">[];
  return (
    <div className="flex w-full flex-col  gap-4">
      {filteredLinks.map((link) => (
        <Button
          key={link.type + link.sub_type}
          variant={"outline"}
          asChild
          className="w-full"
        >
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.description}
            <Icon name={link.description ?? ""} className="mx-2 h-4  w-4" />
          </a>
        </Button>
      ))}
    </div>
  );
}

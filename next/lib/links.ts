import { TablesInsert, TablesUpdate } from "@/types/supabase.gen";
import { ZodType, z } from "zod";
import { createWebClient } from "./supabase/client";
import { linkType } from "@/lib/consts";
import { LinkType } from "@/types";

export async function handleLinks(
  brandId: string,
  outputLinks: TablesUpdate<"links">[],
  linkType: LinkType,
) {
  const supabase = createWebClient();
  const user = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const userId = user.data.user?.id;
  const linksToDelete = outputLinks.filter((l) => l.url === "");
  const linksToInsert: TablesInsert<"links">[] = outputLinks
    .filter((l) => !!l.url && !!l.description) // Filter out objects where url or description is undefined
    .map((l, index) => ({
      ...l,
      brand_id: brandId,
      description: l.description || "", // Provide a default empty string if description is undefined
      url: l.url || "", // Provide a default empty string if url is undefined
      type: l.type || linkType, // Provide a default empty string if type is undefined
      sub_type: l.sub_type || index.toString(), // Provide a default empty string if sub_type is undefined
      user_id: userId, // Provide a default empty string if user_id is undefined
    }));

  if (linksToInsert.length === 0) {
    return;
  }

  linksToInsert.forEach((o) => {
    if (!o.id) {
      delete o.id;
    }
  });
  const { error } = await supabase.from("links").upsert(linksToInsert);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  if (linksToDelete.length > 0) {
    const { error } = await supabase
      .from("links")
      .delete()
      .in(
        "id",
        linksToDelete.map((l) => l.id),
      );
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

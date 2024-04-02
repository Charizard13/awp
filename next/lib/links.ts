import { TablesInsert, TablesUpdate } from "@/types/supabase.gen";
import { ZodType, z } from "zod";
import { createWebClient } from "./supabase/client";

export async function handleLinks(brandId : string, values: Record<any, any>) {
    const supabase = createWebClient();

    const outputLinks: TablesUpdate<"links">[] = Object.entries(values).map(
        ([description, url]) => ({
          description,
          url,
          brand_id: brandId,
        }),
      );
      const linksToDelete = outputLinks.filter((l) => l.url === "");
      const linksToInsert: TablesInsert<"links">[] = outputLinks
        .filter((l) => !!l.url && !!l.description) // Filter out objects where url or description is undefined
        .map((l) => ({
          ...l,
          brand_id: brandId,
          description: l.description || "", // Provide a default empty string if description is undefined
          url: l.url || "", // Provide a default empty string if url is undefined
        }));

      if (linksToInsert.length === 0) {
        return;
      }
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
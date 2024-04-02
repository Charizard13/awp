import React from "react";
import { TablesUpdate } from "@/types";

export type SetBrand = (
  value: React.SetStateAction<
    | (TablesUpdate<"brands"> & {
        logoUrl: string;
        links: TablesUpdate<"links">[];
      })
    | undefined
  >,
) => void;

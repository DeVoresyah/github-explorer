import { create } from "zustand";
import { Api } from "~/services/api";

// Types
import type { ConfigStore } from "./types";

export const useConfig = create<ConfigStore>(() => ({
  apiInstance: new Api({
    url: process.env.BASE_API_URL!,
    timeout: 30000,
  }),
}));

import { ApisauceInstance, create } from "apisauce";

export interface ApiConfig {
  url: string;
  timeout: number;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: process.env.NUXT_PUBLIC_BASE_API_URL || "http://localhost:3000",
  timeout: 30000, // miliseconds
};

export class Api {
  api!: ApisauceInstance;
  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;

    // construct the apisauce instance
    this.api = create({
      baseURL: config.url,
      timeout: config.timeout,
      headers: {
        Accept: "application/json",
      },
    });

    this.api.addAsyncRequestTransform((request) => async () => {
      // TODO: add token to request if user logged in
    });
  }
}

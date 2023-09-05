import { getGeneralApiProblem } from "./api-problem";

// Stores
import { useConfig } from "~/stores/config";

// Types
import type { ApisauceInstance } from "apisauce";
import type { ApiResponse } from "apisauce";
import type {
  GetGithubSearchUserResult,
  GetGithubUserReposResult,
} from "./api.types";
import type {
  GithubSearchUsersPayload,
  GithubSearchReposPayload,
} from "~/stores/github/types";

export class GithubApi {
  private api: ApisauceInstance;

  constructor() {
    this.api = useConfig.getState().apiInstance.api;
  }

  async getGithubSearchUsers(
    payload: GithubSearchUsersPayload
  ): Promise<GetGithubSearchUserResult> {
    try {
      const response: ApiResponse<any> = await this.api.get("search/users", {
        ...payload,
        per_page: 5,
      });

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      return {
        kind: "ok",
        data: response.data,
      };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }

  async getGithubUserRepos(
    payload: GithubSearchReposPayload
  ): Promise<GetGithubUserReposResult> {
    try {
      const response: ApiResponse<any> = await this.api.get(
        `users/${payload.username}/repos`,
        payload
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      return {
        kind: "ok",
        data: response.data,
      };
    } catch (e) {
      return { kind: "bad-data" };
    }
  }
}

import type {
  GithubRepos,
  GithubSearchUsersResponse,
} from "~/stores/github/types";
import type { GeneralApiProblem } from "./api-problem";

export type GetGithubSearchUserResult =
  | { kind: "ok"; data: GithubSearchUsersResponse }
  | GeneralApiProblem;

export type GetGithubUserReposResult =
  | { kind: "ok"; data: GithubRepos[] }
  | GeneralApiProblem;

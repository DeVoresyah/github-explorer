import { create } from "zustand";
import { GithubApi } from "~/services/api/github-api";

import type { GithubSearchUsersResponse, GithubRepos } from "./types";

/**
 * Initial State
 */
export const useGithubUser = create<
  StoreState<GithubSearchUsersResponse | null>
>(() => ({
  _fetching: false,
  _data: null,
  _error: "",
}));
export const useGithubRepos = create<StoreState<GithubRepos[]>>(() => ({
  _fetching: false,
  _data: [],
  _error: "",
}));

/**
 * Actions
 */
export const getGithubUser = async (username: string) => {
  useGithubUser.setState({ _fetching: true, _data: null, _error: "" });

  const githubApi = new GithubApi();
  const result = await githubApi.getGithubSearchUsers({ q: username });

  if (result.kind === "ok") {
    useGithubUser.setState({
      _fetching: false,
      _data: result.data,
      _error: "",
    });
  } else {
    useGithubUser.setState({
      _fetching: false,
      _data: null,
      _error: result.message,
    });
  }
};

export const getGithubRepos = async (username: string) => {
  useGithubRepos.setState({ _fetching: true, _data: [], _error: "" });

  const githubApi = new GithubApi();
  const result = await githubApi.getGithubUserRepos({ username });

  if (result.kind === "ok") {
    useGithubRepos.setState({
      _fetching: false,
      _data: result.data,
      _error: "",
    });
  } else {
    useGithubRepos.setState({
      _fetching: false,
      _data: [],
      _error: result.message,
    });
  }
};

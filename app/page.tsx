"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

// Stores
import {
  getGithubUser,
  getGithubRepos,
  useGithubUser,
  useGithubRepos,
} from "~/stores/github";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const isFetching = useGithubUser((state) => state._fetching);
  const data = useGithubUser((state) => state._data);
  const isRepoFetching = useGithubRepos((state) => state._fetching);
  const repos = useGithubRepos((state) => state._data);

  const onSearch = useCallback(() => {
    getGithubUser(keyword);
    setSelectedUsername("");
  }, [keyword]);

  const renderRepos = useMemo(() => {
    return isRepoFetching
      ? Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 animate-pulse flex flex-col"
          >
            <div className="h-3 bg-gray-200 rounded-full w-4/12 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full w-12/12 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full w-8/12 mb-2"></div>
          </div>
        ))
      : repos.map((repo, repoIndex) => (
          <div
            key={repoIndex}
            className="bg-gray-100 rounded-lg p-4 grid grid-cols-12 gap-3"
          >
            <div className="col-span-9 flex flex-col gap-1">
              <h3 className="font-medium text-base">{repo.name}</h3>
              <p className="text-sm text-gray-900 line-clamp-2">
                {repo.description}
              </p>
            </div>

            <div className="col-span-3 flex flex-row justify-end">
              <span className="font-medium mr-1 text-gray-900">
                {repo.stargazers_count}
              </span>

              <div className="text-yellow-500 w-[24px] h-[24px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
                </svg>
              </div>
            </div>
          </div>
        ));
  }, [isRepoFetching, repos]);

  const renderUser = useMemo(() => {
    return data?.items.map((user, userIndex) => (
      <div key={userIndex} className="flex flex-col">
        <div
          className="w-full bg-gray-100 rounded-md border border-gray-200 p-3 flex flex-row items-center justify-between mb-3 cursor-pointer"
          onClick={() => setSelectedUsername(user.login)}
        >
          <h2 className="font-medium text-gray-900 text-lg">{user.login}</h2>

          <div className="text-black w-[24px] h-[24px] flex items-center justify-center">
            {selectedUsername === user.login ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            )}
          </div>
        </div>

        {selectedUsername === user.login && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-3 mb-2">
            {renderRepos}
          </div>
        )}
      </div>
    ));
  }, [data, selectedUsername, renderRepos]);

  useEffect(() => {
    if (selectedUsername) {
      getGithubRepos(selectedUsername);
    }
  }, [selectedUsername]);

  return (
    <main>
      <div className="p-5 flex flex-col">
        <h1 className="font-mono text-gray-900 text-2xl mb-2">
          <span className="font-semibold">GitHub</span> Explorer
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <input
            type="text"
            placeholder="Enter username"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="col-span-1 lg:col-span-6 bg-gray-100 border border-gray-300 py-2 px-3 rounded-md placeholder:text-gray-400 mb-5"
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-6 lg:py-3 h-fit text-center text-sm"
            onClick={onSearch}
          >
            <span>Search</span>
          </button>
        </div>
      </div>

      {isFetching && (
        <div className="px-5 flex flex-col animate-plus">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-3 bg-gray-200 rounded-full w-full mb-3"
            ></div>
          ))}
        </div>
      )}

      {!isFetching && data && (
        <div className="flex flex-col px-5">
          <span className="text-sm text-gray-400 mb-5">
            Showing users for &quot;{keyword}&quot;
          </span>

          {renderUser}
        </div>
      )}
    </main>
  );
}

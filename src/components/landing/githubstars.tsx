"use client";

import { useEffect, useState } from "react";

import { GitHubStars } from "@/components/ui/github-stars";
import { SOURCE_CODE_GITHUB_REPO } from "@/config/site";

export function NavItemGitHub() {
  const [stargazersCount, setStargazersCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStars() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          },
        );

        if (!response.ok) {
          return;
        }

        const json = (await response.json()) as { stargazers_count?: number };
        setStargazersCount(Number(json?.stargazers_count) || 0);
      } catch {
        return;
      }
    }

    loadStars();

    return () => controller.abort();
  }, []);

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  );
}

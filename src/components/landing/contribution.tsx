import { Suspense } from "react";

import { Reveal } from "@/components/animations/reveal";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/ui/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";

const GITHUB_USERNAME = "Rival-05";
const GITHUB_PROFILE_URL = "https://github.com/Rival-05";

export default function Contributions() {
  const contributions = getCachedContributions(GITHUB_USERNAME);

  return (
    <Reveal>
      <Suspense fallback={<GitHubContributionsFallback />}>
        <GitHubContributions
          contributions={contributions}
          githubProfileUrl={GITHUB_PROFILE_URL}
        />
      </Suspense>
    </Reveal>
  );
}

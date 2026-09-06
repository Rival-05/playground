import { execSync } from "child_process";

type GitHubCommitResponse = {
    commit?: {
        author?: { date?: string };
        committer?: { date?: string };
    };
};

const GITHUB_REPOSITORY = "Rival-05/playground";

export async function getLastCommitDate(filePath?: string): Promise<string> {
    try {
        const cmd = filePath
            ? `git log -1 --format=%cI -- "${filePath}"`
            : `git log -1 --format=%cI`;

        const date = execSync(cmd).toString().trim();
        if (date) return date;
    } catch {
    }

    const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;

    if (commitSha) {
        try {
            const response = await fetch(
                `https://api.github.com/repos/${GITHUB_REPOSITORY}/commits/${commitSha}`,
                {
                    headers: { Accept: "application/vnd.github+json" },
                    cache: "force-cache",
                },
            );

            if (response.ok) {
                const data = (await response.json()) as GitHubCommitResponse;
                const date = data.commit?.committer?.date ?? data.commit?.author?.date;

                if (date) return date;
            }
        } catch {
        }
    }

    return new Date().toISOString();
}
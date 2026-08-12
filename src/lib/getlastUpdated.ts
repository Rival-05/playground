import { execSync } from "child_process";

export function getLastCommitDate(filePath?: string): string {
    try {
        const cmd = filePath
            ? `git log -1 --format=%cI -- "${filePath}"`
            : `git log -1 --format=%cI`;

        const date = execSync(cmd).toString().trim();
        return date || new Date().toISOString();
    } catch {
        return new Date().toISOString();
    }
}
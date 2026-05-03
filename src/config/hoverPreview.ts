export type PreviewType = "music";

export interface MusicPreviewData {
    title: string;
    subtitle: string;
    image: string;
}

export interface HoverPreviewConfig {
    type: PreviewType;
    href: string;
    platformLabel: string;
    data?: MusicPreviewData;
}

export const hoverPreviews: Record<string, HoverPreviewConfig> = {
    music: {
        type: "music",
        href: "https://open.spotify.com/track/6UgcN95w7vQxkR8sEFmwHG",
        platformLabel: "Spotify",
        data: {
            title: "Chahun Main Ya Naa",
            subtitle: "Aashiqui 2 · Soundtrack",
            image: "/song.png",
        } as MusicPreviewData,
    },
    movies: {
        type: "music",
        href: "https://www.hotstar.com/in/movies/shiddat/",
        platformLabel: "Hotstar",
        data: {
            title: "Movies",
            subtitle: "Shiddat",
            image: "/movie.png",
        } as MusicPreviewData,
    },
};

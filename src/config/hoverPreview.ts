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
        href: "https://open.spotify.com/track/5hx7w26Zi3zafMgvMTUqF6",
        platformLabel: "Spotify",
        data: {
            title: "SNAP",
            subtitle: "Rosa Linn",
            image: "/song.png",
        } as MusicPreviewData,
    },
    movies: {
        type: "music",
        href: "https://www.hotstar.com/in/movies/shiddat/",
        platformLabel: "Hotstar",
        data: {
            title: "Movie",
            subtitle: "Shiddat",
            image: "/movie.png",
        } as MusicPreviewData,
    },
};

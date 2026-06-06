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
        href: "https://www.primevideo.com/detail/0JA1RIIN95EDMDVY2X1BLHKBB4",
        platformLabel: "Prime Video",
        data: {
            title: "Movie",
            subtitle: "We Live In Time",
            image: "/movie.png",
        } as MusicPreviewData,
    },
};

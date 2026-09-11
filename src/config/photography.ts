export type PhotographyEntry = {
    src: string;
    alt: string;
    caption?: string;
};

export const photography: PhotographyEntry[] = [
    {
        src: "/images/photography/cross_street.jpeg",
        alt: "A narrow tree-lined lane with yellow lines between white walls",
        caption: "A quiet crossing.",
    },
    {
        src: "/images/photography/dam.jpeg",
        alt: "Moonlight reflected on a river between dark hills at night",
        caption: "Dam.",
    },
    {
        src: "/images/photography/metro.jpeg",
        alt: "An empty metro station platform and railway tracks beneath a curved roof",
        caption: "Just another day in blr.",
    },
];

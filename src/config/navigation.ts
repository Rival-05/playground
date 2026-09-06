export type NavigationItem = {
    label: string;
    href: string;
};

export const navigation: NavigationItem[] = [
    { label: "Archive", href: "/blog" },
    { label: "Picks", href: "/personal" },
    { label: "Captures", href: "/photography" },
];

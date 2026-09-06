export type Movie = {
    title: string;
    posterImage: string;
    link?: string;
    note?: string;
};

export const movies: Movie[] = [
    {
        title: "The Social Network",
        posterImage: "/images/movies/the_social_network.png",
        link: "https://www.primevideo.com/dp/amzn1.dv.gti.bca9f7a2-28a5-0078-5aa9-a7e7e3286e37?autoplay=0&ref_=atv_cf_strg_wb",
    },
    {
        title: "Iron Man",
        posterImage: "/images/movies/iron_man.png",
        link: "https://www.hotstar.com/in/movies/iron-man/1660000038?utm_source=gwa",
    },
    {
        title: "Interstellar",
        posterImage: "/images/movies/interstellar.png",
        link: "https://www.primevideo.com/dp/amzn1.dv.gti.91c15743-d78a-4667-9b48-fbd8ed9cacbc?autoplay=0&ref_=atv_cf_strg_wb",
    },
    {
        title: "The Amazing Spider-Man",
        posterImage: "/images/movies/the_amazing_spiderman.png",
        link: "https://www.primevideo.com/dp/amzn1.dv.gti.1ea9f6b8-151d-5fe1-5f3b-c897b6dd14cf?autoplay=0&ref_=atv_cf_strg_wb",
    },
];

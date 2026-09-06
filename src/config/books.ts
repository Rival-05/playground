export type Book = {
    title: string;
    author: string;
    coverImage: string;
    link?: string;
    note?: string;
};

export const books: Book[] = [
    {
        title: "Before the Coffee Gets Cold",
        author: "Toshikazu Kawaguchi",
        coverImage: "/images/books/before_the_coffee_gets_cold.png",
        link: "https://www.goodreads.com/book/show/44421460-before-the-coffee-gets-cold",
    },
];

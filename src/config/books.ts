export type Book = {
    title: string;
    author: string;
    coverImage?: string;
    link?: string;
    isNew?: boolean;
    bookType?: string | string[];
};

export const books: Book[] = [
    {
        title: "System design by ByteByteGo",
        author: "ByteByteGo",
        link: "https://github.com/Rival-05/books",
        bookType: "system design",
    },
    {
        title: "System Design Interview : An Insider's Guide",
        author: "Alex Xu",
        link: "https://github.com/Rival-05/books",
        bookType: "system design",
    },
    {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        link: "https://github.com/Rival-05/books",
        bookType: "system design",
    },
    {
        title: "6 easy pieces",
        author: "Richard P. Feynman",
        coverImage: "/images/books/6_easy_pieces.svg",
        link: "https://pdfcoffee.com/six-easy-pieces-essentials-of-physics-ex-pdf-free.html",
        bookType: "science",
    },
    {
        title: "A short history of nearly everything",
        author: "Bill Bryson",
        coverImage: "/images/books/a_short_history_of_nearly_everything.png",
        bookType: "science",
        link: "https://rpls.com/wp-content/uploads/converted_files/402164=7039-Bryson,%20Bill%20-%20A%20Short%20History%20of%20Nearly%20Everything.pdf",
    },
    {
        title: "Cosmos",
        author: "Carl Sagan",
        coverImage: "/images/books/cosmos.png",
        link: "https://www.arvindguptatoys.com/arvindgupta/sagancosmos.pdf",
        bookType: "science",
    },
    {
        title: "Mathematics for ML",
        author: "Marc Peter Deisenroth, A. Aldo Faisal, and Cheng Soon Ong",
        coverImage: "/images/books/mathematics_for_machine_learning.png",
        link: "https://mml-book.github.io/book/mml-book.pdf",
        bookType: "machine learning",
    },
    {
        title: "Introduction to Probability, Statistics, and Random Processes",
        author: "Hossein Pishro-Nik",
        link: "https://www.probabilitycourse.com/",
        coverImage: "/images/books/intro_to_probability_statistics_random_processes.png",
        bookType: "machine learning",
    },
    {
        title: "Introduction to Probability",
        author: "Joseph K. Blitzstein and Jessica Hwang",
        coverImage: "/images/books/intro_to_probability.png",
        link: "https://drive.google.com/file/d/1VmkAAGOYCTORq1wxSQqy255qLJjTNvBI/",
        bookType: "machine learning",
    },
    {
        title: "Programming 101",
        author: "Jeanine Meyer",
        link: "https://www.amazon.in/Programming-101-Learn-Processing-Language/dp/1484281934",
    },
    {
        title: "Before the Coffee Gets Cold",
        author: "Toshikazu Kawaguchi",
        coverImage: "/images/books/before_the_coffee_gets_cold.png",
        link: "https://bdebooks.com/en/books/before-the-coffee-gets-cold-by-toshikazu-kawaguchi/",
        isNew: true,
    },
    {
        title: "Functional Programming in Scala",
        author: "Paul Chiusano and Rúnar Bjarnason",
        coverImage: "/images/books/functional_programming_in_scala.png",
        link: "https://www.kufunda.net/publicdocs/Functional%20Programming%20in%20Scala.pdf",
    }
];

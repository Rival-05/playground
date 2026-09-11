export type Resource = {
    title: string;
    type: string | string[];
    category?: string;
    link?: string;
    isNew?: boolean;
    imageSrc?: string;
};

export const resources: Resource[] = [
    {
        title: "How to start a startup",
        type: " youtube",
        link: "https://www.youtube.com/watch?v=CBYhVcO4WgI&list=PL5q_lef6zVkaTY_cT1k7qFNF2TidHCe-1",
        category: "Y Combinator",
        imageSrc: "/images/resources/how_to_start_a_startup.png",
    },
    {
        title: "Startup School",
        type: "course",
        link: "https://www.startupschool.org/",
        category: "Y Combinator",
        imageSrc: "/images/resources/startup_school.svg",
    },
    {
        title: "System Design Interviews - An Insider's Guide",
        type: "github, system design",
        link: "https://github.com/liquidslr/system-design-notes",
        category: "Alex Xu - summarised",
        imageSrc: "/images/resources/system_design.svg",
        isNew: true,
    },
    {
        title: "In Search of an Understandable Consensus Algorithm",
        type: "research paper",
        link: "https://raft.github.io/raft.pdf",
        category: "raft consensus algorithm",
    },
    {
        title: "Attention is all you need",
        type: "research paper",
        link: "https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf",
        category: "transformer architecture",
    },
    {
        title: "Bigtable",
        type: "research paper",
        link: "https://dl.acm.org/doi/epdf/10.1145/1365815.1365816",
        category: "google's distributed storage system",
    },
    {
        title: "Dynamo",
        type: "research paper",
        link: "https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf",
        category: "how amazon db stays available",
    },
    {
        title: "MapReduce",
        type: "research paper",
        link: "https://dl.acm.org/doi/epdf/10.1145/1327452.1327492",
        category: "processing massive datasets across distributed machines",
    },
    {
        title: "VisuAlgo",
        type: "dsa",
        link: "https://visualgo.net/en",
        category: "visualize algorithms and data structures",
        imageSrc: "/images/resources/visualgo.png",
    },
    {
        title: "NeetCode",
        type: "dsa",
        link: "https://neetcode.io/",
        category: "solve neetcode 150 and you are good to go",
        imageSrc: "/images/resources/neetcode.png",
    },
    {
        title: "System Design Primer",
        type: ["system design", "github"],
        link: "https://github.com/donnemartin/system-design-primer",
        category: "how to design large-scale systems",
        imageSrc: "/images/resources/system_design_primer.png",
    },

];
// projects
export const projectHeadLine = "What I've done and what I'm doing.";
export const projectIntro = "I've worked on a variety of projects, from simple websites to complex applications. Here are some of my favorites.";

export type ProjectItemType = {
    id?: string;
    name: string;
    description: string;
    link: { href: string; label: string };
    date?: string;
    logo: string;  // Made logo required instead of optional
    images?: string[];
    category?: string[];
    tags?: string[];
    image?: string;
    techStack?: string[];
    gitStars?: number;
    gitForks?: number;
};

// projects 
export const projects: Array<ProjectItemType> = [
    // Video Showcase Projects
    {
        name: 'Project Showcase 1',
        description: 'Interactive demo of my recent applications and workflows.',
        link: { href: '#', label: 'Project Showcase' },
        logo: '/vidioproject/WhatsApp Video 2026-09-01 at 17.03.37.mp4',
        category: ['Showcase', 'Video'],
        tags: ['Video', 'Demo']
    },
    {
        name: 'Project Showcase 2',
        description: 'Interactive demo of my recent applications and workflows.',
        link: { href: '#', label: 'Project Showcase' },
        logo: '/vidioproject/ssstik.io_@maycodev_1788261731252.mp4',
        category: ['Showcase', 'Video'],
        tags: ['Video', 'Demo']
    },
    {
        name: 'Project Showcase 3',
        description: 'Interactive demo of my recent applications and workflows.',
        link: { href: '#', label: 'Project Showcase' },
        logo: '/vidioproject/ssstik.io_@maycodev_1788261768507.mp4',
        category: ['Showcase', 'Video'],
        tags: ['Video', 'Demo']
    },
    {
        name: 'Project Showcase 4',
        description: 'Interactive demo of my recent applications and workflows.',
        link: { href: '#', label: 'Project Showcase' },
        logo: '/vidioproject/ssstik.io_@maycodev_1788261876033.mp4',
        category: ['Showcase', 'Video'],
        tags: ['Video', 'Demo']
    },
    {
        name: 'Project Showcase 5',
        description: 'Interactive demo of my recent applications and workflows.',
        link: { href: '#', label: 'Project Showcase' },
        logo: '/vidioproject/ssstik.io_@maycodev_1788261905009.mp4',
        category: ['Showcase', 'Video'],
        tags: ['Video', 'Demo']
    },
    {
        name: 'Project Showcase 6',
        description: 'Interactive demo of my recent applications and workflows.',
        link: { href: '#', label: 'Project Showcase' },
        logo: '/vidioproject/ssstik.io_@maycodev_1788261932497.mp4',
        category: ['Showcase', 'Video'],
        tags: ['Video', 'Demo']
    },
    {
        name: 'Project Showcase 7',
        description: 'Another interactive video showcase of my projects.',
        link: { href: '#', label: 'Project Showcase' },
        logo: '/vidioproject/ssstik.io_@maycodev_1788261962233.mp4',
        category: ['Showcase', 'Video'],
        tags: ['Video', 'Demo']
    },

    // Original Image Projects
    {
        name: 'Aplikasi Musik',
        description: 'Developed a mobile application for music streaming.',
        link: { href: '#', label: 'Aplikasi Musik' },
        logo: 'music-app.jpg',
        category: ['Mobile Development'],
        tags: ['Music', 'Mobile App']
    },
    {
        name: 'Aplikasi Lesehan',
        description: 'Mobile application for restaurant reservation and management.',
        link: { href: '#', label: 'Aplikasi Lesehan' },
        logo: 'lesehan-app.jpg',
        category: ['Mobile Development'],
        tags: ['Restaurant', 'Mobile App']
    },
    {
        name: 'Kasir',
        description: 'A Java-based cashier application designed to simplify employee transactions.',
        link: { href: '#', label: 'Kasir' },
        logo: 'kasir.jpg',
        category: ['Java'],
        tags: ['POS', 'Java']
    },
    {
        name: 'Aplikasi Absensi Mobile',
        description: 'A mobile attendance application designed to simplify employee check-ins using photo and location-based verification.',
        link: { href: '#', label: 'Aplikasi Absensi' },
        logo: 'project6.png',
        category: ['Mobile Development'],
        tags: ['Attendance', 'Mobile App']
    },
    {
        name: 'Aplikasi Laporan Warga',
        description: 'A citizen report application designed to simplify community reporting with photo and location-based submissions.',
        link: { href: '#', label: 'Aplikasi Laporan Warga' },
        logo: 'project5.png',
        category: ['Mobile Development'],
        tags: ['Report', 'Mobile App']
    }
];

export const githubProjects: Array<ProjectItemType> = [
    {
        name: 'Figma',
        description: 'Designing graphical user interfaces and prototypes.',
        link: { href: 'https://github.com/nicofantri/figma', label: 'Figma' },
        logo: 'figma-github.jpg',
    },
    {
        name: 'Aplikasi Musik',
        description: 'Developed a mobile application for music streaming.',
        link: { href: 'https://github.com/nicofantri/aplikasi-musik', label: 'Aplikasi Musik' },
        logo: 'music-github.jpg',
    },
    {
        name: 'Aplikasi Lesehan',
        description: 'Mobile application for restaurant reservation and management.',
        link: { href: 'https://github.com/nicofantri/aplikasi-lesehan', label: 'Aplikasi Lesehan' },
        logo: 'lesehan-github.jpg',
    },
];
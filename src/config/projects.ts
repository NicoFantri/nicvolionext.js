// projects
export const projectHeadLine = "What I've done and what I'm doing.";
export const projectIntro = "I've worked on a variety of projects, from simple websites to complex applications. Here are some of my favorites.";

export type ProjectItemType = {
    name: string;
    description: string;
    link: { href: string; label: string };
    date?: string;
    logo: string;  // Made logo required instead of optional
    category?: string[];
    tags?: string[];
    image?: string;
    techStack?: string[];
    gitStars?: number;
    gitForks?: number;
};

// projects 
export const projects: Array<ProjectItemType> = [
    {
        name: 'Figma',
        description: 'Designing graphical user interfaces and prototypes.',
        link: { href: 'https://figma.com', label: 'Figma' },
        logo: 'project-1.png',
        category: ['Design Grafis'],
        tags: ['Design', 'UI/UX']
    },
    {
        name: 'Modifikasi Absensi QR',
        description: 'Developed a web application for attendance tracking using QR codes.',
        link: { href: '#', label: 'Modifikasi Absensi QR' },
        logo: 'project-2.png',
        category: ['Web Development'],
        tags: ['Attendance', 'QR Code', 'Web App']
    },
    {
        name: 'Project Start-Up',
        description: 'Worked on a start-up project focused on innovative web solutions.',
        link: { href: '#', label: 'Project Start-Up' },
        logo: 'project-3.png',
        category: ['Web Development'],
        tags: ['Start-Up', 'Innovation', 'Web']
    },
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
    },
     

];

export const githubProjects: Array<ProjectItemType> = [
    {
        name: 'Figma',
        description: 'Designing graphical user interfaces and prototypes.',
        link: { href: 'https://github.com/nicofantri/figma', label: 'Figma' },
        logo: 'figma-github.jpg',
    },
    {
        name: 'Modifikasi Absensi QR',
        description: 'Developed a web application for attendance tracking using QR codes.',
        link: { href: 'https://github.com/nicofantri/modifikasi-absensi-qr', label: 'Modifikasi Absensi QR' },
        logo: 'absensi-qr-github.jpg',
    },
    {
        name: 'Project Start-Up',
        description: 'Worked on a start-up project focused on innovative web solutions.',
        link: { href: 'https://github.com/nicofantri/project-star-up', label: 'Project Start-Up' },
        logo: 'startup-github.jpg',
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
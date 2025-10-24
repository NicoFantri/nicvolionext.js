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
        name: 'Project Star-Up',
        description: 'Worked on a start-up project focused on innovative web solutions.',
        link: { href: '#', label: 'Project Star-Up' },
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
        name: 'kasir ',
        description: 'java kasir ini dicancang untuk memudahkan karyawan dalam melakukan transaksi',
        link: { href: '#', label: 'kasir' },
        logo: 'kasir.jpg',
        category: ['java'],
        tags: ['Restaurant', 'java']
    },

    {
        name: 'Aplikasi absensi berbasis mobile ',
        description: 'aplikasi mobile absensi ini dicancang untuk memudahkan karyawan dalam melakukan absensi.berbasis foto dan lokasi .',
        link: { href: '#', label: 'Aplikasi absensi' },
        logo: 'project6.png',
        category: ['Mobile Development'],
        tags: ['absensi', 'Mobile App']
    },

    {
        name: 'Aplikasi laporan warga ',
        description: 'aplikasi laporan warga ini dicancang untuk memudahkan warga dalam melakukan laporan.berbasis foto dan lokasi .',
        link: { href: '#', label: 'Aplikasi laporan warga' },
        logo: 'project5.png',
        category: ['Mobile Development'],
        tags: ['laporan', 'Mobile App']
    },
     

];

export const githubProjects: Array<ProjectItemType> = [
    {
        name: 'Figma',
        description: 'Designing graphical user interfaces and prototypes.',
        link: { href: 'github.com/nicofantri/figma', label: 'Figma' },
        logo: 'figma-github.jpg',
        gitStars: 120,
        gitForks: 45
    },
    {
        name: 'Modifikasi Absensi QR',
        description: 'Developed a web application for attendance tracking using QR codes.',
        link: { href: 'github.com/nicofantri/modifikasi-absensi-qr', label: 'Modifikasi Absensi QR' },
        logo: 'absensi-qr-github.jpg',
        gitStars: 85,
        gitForks: 30
    },
    {
        name: 'Project Star-Up',
        description: 'Worked on a start-up project focused on innovative web solutions.',
        link: { href: 'github.com/nicofantri/project-star-up', label: 'Project Star-Up' },
        logo: 'startup-github.jpg',
        gitStars: 150,
        gitForks: 50
    },
    {
        name: 'Aplikasi Musik',
        description: 'Developed a mobile application for music streaming.',
        link: { href: 'github.com/nicofantri/aplikasi-musik', label: 'Aplikasi Musik' },
        logo: 'music-github.jpg',
        gitStars: 200,
        gitForks: 70
    },
    {
        name: 'Aplikasi Lesehan',
        description: 'Mobile application for restaurant reservation and management.',
        link: { href: 'github.com/nicofantri/aplikasi-lesehan', label: 'Aplikasi Lesehan' },
        logo: 'lesehan-github.jpg',
        gitStars: 250,
        gitForks: 90
    },

        
];
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
        name: 'Aplikasi Laporan Warga (Flutter)',
        description: 'Aplikasi mobile berbasis Flutter untuk pelaporan keluhan warga secara cepat, dilengkapi pelacakan status laporan dan penanganan aduan masyarakat.',
        link: { href: '#', label: 'Laporan Warga' },
        logo: '/vidioproject/WhatsApp Video 2026-10-31 at 20.28.48.mp4',
        category: ['Mobile Development', 'Flutter', 'Showcase'],
        tags: ['Flutter', 'Mobile App', 'Laporan Warga']
    },
    {
        name: 'Aplikasi Kasir Offline (Flutter Mobile)',
        description: 'Aplikasi Point of Sale (POS) mobile berbasis Flutter yang dapat dijalankan secara offline untuk transaksi cepat dan manajemen produk.',
        link: { href: '#', label: 'Kasir Offline' },
        logo: '/vidioproject/WhatsApp Video 2026-10-31 at 20.28.48 (1).mp4',
        category: ['Mobile Development', 'Flutter', 'Showcase'],
        tags: ['Flutter', 'Mobile App', 'POS / Kasir Offline']
    },
    {
        name: 'Target TabunganKu',
        description: 'Aplikasi mobile untuk perencanaan dan pencatatan target tabungan finansial.',
        link: { href: '#', label: 'Target TabunganKu' },
        logo: '/vidioproject/1022 (1)(1).mp4',
        category: ['Mobile Development', 'Showcase'],
        tags: ['Mobile App', 'Flutter / Android']
    },
    {
        name: 'Web Admin Dashboard dan Kasir POS',
        description: 'Dashboard manajemen web modern dengan visualisasi data dan analitik real-time serta POS dengan UI modern.',
        link: { href: '#', label: 'Web Dashboard' },
        logo: '/vidioproject/1031 (1).mp4',
        category: ['Web Development', 'Showcase'],
        tags: ['Web App', 'Dashboard']
    },
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
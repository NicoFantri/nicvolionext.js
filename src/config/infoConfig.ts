export * from './projects';
export * from './friends';
export * from './education';
export * from './career';
export * from './activity';

// personal info
export const name = 'Nico';
export const headline = 'Informatics Engineering Graduate from Universitas Muhammadiyah Malang.';
export const introduction = "I'm a passionate software developer, highly enthusiastic about modern technologies and building impactful digital solutions.";
export const email = 'nicofantrimayharis@gmail.com';
export const githubUsername = 'nicofantri';

// about page
export const aboutMeHeadline = "I'm Nico Fantri M, an Informatics Engineering Graduate from Universitas Muhammadiyah Malang.";
export const aboutParagraphs = [
  "I am passionate about programming and modern technology. I graduated with a degree in Informatics Engineering, building strong foundations in software engineering, mobile development, and scalable backend architecture.",
  "My core technical proficiencies include cross-platform mobile development with Flutter, backend engineering using Golang and Laravel, and modern web application development with React and Vue.js.",
  "Currently, I am actively focusing on architecting and delivering high-performance digital products, robust APIs, and user-centric mobile solutions."
];

// experience
export const experienceHeadLine = "Riwayat Studi & Pengalaman.";
export const experienceIntro = "Perjalanan pendidikan dan pengalaman dalam membangun berbagai project.";

// social links
export type SocialLinkType = {
  name: string,
  ariaLabel?: string,
  icon: string,
  href: string
};

export const socialLinks: Array<SocialLinkType> = [
  {
    name: 'Github',
    icon: 'github',
    href: 'https://github.com/nicofantri'
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    href: 'https://instagram.com/nicofantri'
  },
  {
    name: 'Discord',
    icon: 'discord',
    href: 'https://discord.gg/xTxRg3Ej'
  },
  {
    name: 'Tiktok',
    icon: 'tiktok',
    href: 'https://www.tiktok.com/@nicmobiledev?is_from_webapp=1&sender_device=pc'
  },
];

// https://simpleicons.org/
export const techIcons = [
  "flutter",
  "dart",
  "go",
  "laravel",
  "php",
  "postgresql",
  "mysql",
  "react",
  "nextdotjs",
  "vuedotjs",
  "typescript",
  "javascript",
  "nodedotjs",
  "docker",
  "supabase",
  "firebase",
  "redis",
  "tailwindcss",
  "git",
  "github",
  "androidstudio",
  "visualstudiocode",
  "postman",
  "figma",
  "vercel",
  "python",
  "java",
  "debian"
];

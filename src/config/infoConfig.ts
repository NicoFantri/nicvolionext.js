export * from './projects';
export * from './friends';
export * from './changelog';
export * from './education';
export * from './career';
export * from './activity';

// personal info
export const name = 'Nico Fantri ';
export const headline = 'Informatics Engineering Student, Universitas Muhammadiyah Malang.';
export const introduction = "I'm Nico, a student from Universitas Muhammadiyah Malang, passionate about technology and software development.";
export const email = 'nicofantrimayharis@gmail.com';
export const githubUsername = 'nicofantri';

// about page
export const aboutMeHeadline = "I'm Nico Fantri M, an Informatics Engineering student at Universitas Muhammadiyah Malang.";
export const aboutParagraphs = [
  "I am passionate about programming and technology. I started learning programming when I joined the Informatics Engineering department.",
  "Besides studying, I also have many hobbies such as traveling, photography, watching movies, listening to music, and more.",
  "Currently, I am focusing on improving my skills in software development and frequently working on side projects to gain experience."
];

// blog
export const blogHeadLine = "Things I've been thinking about.";
export const blogIntro = "I've written a few things about technology, software development, and life.";

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

];

// https://simpleicons.org/
export const techIcons = [
  "typescript",
  "javascript",
  "python",
  "dart",
  "java",
  "php",
  "mysql",
  "react",
  "nodedotjs",
  "nextdotjs",
  "tailwindcss",
  "figma",
  "laravel",
  "vercel",
  "debian",
  "git",
  "github",
  "visualstudiocode",
  "androidstudio",
  "firebase",
  "postman",
  "flutter"
];

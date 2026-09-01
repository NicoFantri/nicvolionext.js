// activity.ts
export const activityHeadLine = "My Activity"
export const activityIntro = "Snippets of My Coding & Life"

export const activityImages = [
  {
    src: "/images/activity/coding.jpg",
    alt: "Coding session",
    caption: "Late night coding",
    date: "2024-01-15"
  },
  {
    src: "/images/activity/meetup.jpg",
    alt: "aurdino",
    caption: "Arduino meetup",
    date: "2024-01-20"
  },
  {
    src: "/images/activity/workshop.jpg",
    alt: "jatim dev day",
    caption: "Jatim Dev Day workshop",
    date: "2024-01-25"
  },
  {
    src: "/images/activity/quotes.jpg",
    alt: "quotes",
    caption: "quotes",
    date: "2024-01-30"
  },
  {
    src: "/images/activity/musik.jpg",
    alt: "my favorite app",
    caption: "app musik",
    date: "2024-02-05"
  }
] as const;

export type ActivityImage = typeof activityImages[number];
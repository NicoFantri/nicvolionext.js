// career
export type CareerItemType = {
  company: string
  title: string
  image?: string
  logo: string
  start: string
  end: string
  duration?: string
  location?: string
  type?: string
  skills?: string
  images?: string[]
}

export const careerList: Array<CareerItemType> = [
  {
    company: 'Hotel 101 Bali',
    title: 'Mobile Developer',
    logo: 'hotel',
    start: 'Mar 2026',
    end: 'Jul 2026',
    duration: '5 bln',
    type: 'Kontrak (Remote)',
    location: 'Bali, Indonesia · Remote',
    skills: 'Flutter, Mobile App Development, Trello / Kanban Board System'
  },
  {
    company: 'Jasa Pembuatan Web & Aplikasi Mobile',
    title: 'Freelance Developer',
    logo: 'freelance',
    start: '2025',
    end: 'Present',
    duration: '1 Tahun',
    location: 'Indonesia',
    skills: 'Pengembangan Aplikasi · 5+ Klien'
  },
  {
    company: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    title: 'IT Support Specialist',
    logo: 'bri',
    start: 'Jul 2025',
    end: 'Aug 2025',
    duration: '2 mos',
    type: 'Apprenticeship',
    location: 'Indonesia · On-site',
    skills: 'Pengembangan Aplikasi, Flutter and +2 skills'
  }
]

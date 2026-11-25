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
  description?: string
  skills?: string
  skillTags?: string[]
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
    description: 'Mengembangkan dan memelihara aplikasi mobile operasional internal hotel menggunakan Flutter dengan sistem manajemen tugas kolaboratif bergaya Trello / Kanban.',
    skills: 'Flutter, Mobile App Development, Trello / Kanban Board System',
    skillTags: ['Flutter', 'Dart', 'Mobile App Development', 'Trello / Kanban', 'REST API']
  },
  {
    company: 'Jasa Pembuatan Web & Aplikasi Mobile',
    title: 'Freelance Developer',
    logo: 'freelance',
    start: '2025',
    end: 'Present',
    duration: '1+ Tahun',
    type: 'Freelance',
    location: 'Sidoarjo, Indonesia · Remote / Hybrid',
    description: 'Merancang, membangun, dan men-deploy solusi website bisnis, dashboard manajemen, serta aplikasi mobile kustom untuk lebih dari 5 klien.',
    skills: 'Pengembangan Aplikasi · 5+ Klien',
    skillTags: ['Flutter', 'Laravel', 'Next.js', 'Golang', 'PostgreSQL', '5+ Klien']
  },
  {
    company: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    title: 'IT Support Specialist',
    logo: 'bri',
    start: 'Jul 2025',
    end: 'Aug 2025',
    duration: '2 bln',
    type: 'Apprenticeship',
    location: 'Indonesia · On-site',
    description: 'Mendukung operasional sistem informasi perbankan, pemeliharaan perangkat lunak & jaringan internal, serta troubleshooting teknis harian.',
    skills: 'Pengembangan Aplikasi, Flutter and +2 skills',
    skillTags: ['IT Operations', 'Troubleshooting', 'Application Support', 'Flutter']
  }
]

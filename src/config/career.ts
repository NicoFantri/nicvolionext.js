
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
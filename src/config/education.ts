
// education 
export type EducationItemType = {
    school: string
    major: string
    image?: string
    logo: string
    start: string
    end: string
  }
  
  
  
  export const educationList: Array<EducationItemType> = [
    {
      school: 'Universitas Muhammadiyah Malang',
      major: 'Teknik Informatika',
      logo: 'informatic',
      start: '2022',
      end: '2026'
    },
    {
      school: 'SMK Utama Bakti Palembang',
      major: 'Teknik Komputer Jaringan (TKJ)',
      logo: 'school',
      start: '2018',
      end: '2021'
    },
    {
      school: 'SMPN 40 Palembang',
      major: 'Sekolah Menengah Pertama',
      logo: 'school',
      start: '2015',
      end: '2018'
    },
  ]
// site config
export const utm_source = process.env.NEXT_PUBLIC_UTM_SOURCE


// navigation config
type NavItemType = {
  name: string
  href: string
}

export const footerItems: Array<NavItemType> = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Projects',
    href: '/projects'
  },
  {
    name: 'Experience',
    href: '/experience'
  },
  {
    name: 'Friends',
    href: '/friends'
  },
  {
    name: 'Certificates',
    href: '/certificates'
  },
  {
    name: 'Pengaturan',
    href: '/admin'
  }
]

export const navItems: Array<NavItemType> = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Projects',
    href: '/projects'
  },
  {
    name: 'Experience',
    href: '/experience'
  }
]

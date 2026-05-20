// friends
export const friendsHeadLine = "Nico's friends"
export const friendsIntro = "Meet some interesting friends."


// friends
export type FriendItemType = {
  name: string
  description?: string
  link: { href: string, label?: string }
  logo?: string
}

export const friends: Array<FriendItemType> = [
  {
    name: 'nicofantri',
    link: { href: 'https://nicofantri.com' },
  },
]

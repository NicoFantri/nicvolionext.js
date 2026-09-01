'use client'

export default function GitHubSnake() {
  return (
    <div className="w-full overflow-hidden">
      <div className='dark:hidden w-full'>
        <img 
          src="/github-contribution-snake/github-contribution-grid-snake.svg" 
          alt="github-contribution"
          className="w-full h-auto max-w-full object-contain" 
        />
      </div>
      <div className='hidden dark:block w-full'>
        <img 
          src="/github-contribution-snake/github-contribution-grid-snake-dark.svg" 
          alt="github-contribution"
          className="w-full h-auto max-w-full object-contain" 
        />
      </div>
    </div>
  )
}
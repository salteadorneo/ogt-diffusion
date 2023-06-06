import packageInfo from '../../package.json'
const { version } = packageInfo

export default function Github () {
  return (
    <div className='fixed bottom-4 left-4 text-white/80'>
      <a
        href='https://github.com/salteadorneo/ogt-diffusion'
        target='_blank'
        className='flex items-center gap-2 text-xs hover:text-white transition-all' rel='noreferrer'
      >
        <svg width='28' height='28' fill='currentColor' viewBox='0 0 1.44 1.44' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M.72.135a.6.6 0 0 0-.19 1.169c.03.005.041-.013.041-.028L.57 1.164c-.15.028-.189-.037-.201-.071a.218.218 0 0 0-.062-.084C.286.998.256.97.306.969a.12.12 0 0 1 .093.061.128.128 0 0 0 .175.049A.126.126 0 0 1 .612 1C.478.985.339.933.339.704A.234.234 0 0 1 .4.543.216.216 0 0 1 .406.384s.05-.016.165.061a.566.566 0 0 1 .3 0c.115-.078.165-.061.165-.061a.216.216 0 0 1 .006.159.232.232 0 0 1 .061.161c0 .23-.14.281-.274.296a.142.142 0 0 1 .041.111l-.001.165c0 .016.011.034.041.028A.6.6 0 0 0 .72.135Z'
          />
        </svg>
        <div className='flex flex-col'>
          <p>salteadorneo/ogt-diffusion</p>
          <p className='text-xs'>v{version}</p>
        </div>
      </a>
    </div>
  )
}

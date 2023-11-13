import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className='w-screen flex justify-center bg-blue-400 p-4'>
      <div className='flex w-full sm:w-3/4 max-w-screen-xl justify-between items-center'>
        <Link
          href='/'
          className='text-md sm:text-2xl font-bold text-white text-decoration-none'
        >
          Rick and Morty
        </Link>

        <div className=''>
          <ul
            className='flex flex-row gap-x-3'
          >
            <li className=' '>
              <Link
                className='text-white text-decoration-none'
                href='/character'
              >
                Characters
              </Link>
            </li>
            <li className=''>
              <Link
                className='text-white text-decoration-none'
                href='/location'
              >
                Locations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

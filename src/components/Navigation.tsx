import Link from 'next/link'

export function Navigation() {
  return (
    <nav>
      <Link className='pr-4' href="/">
        <h1 className="hidden sm:inline text-xl font-bold">Gino Notes</h1>
      </Link>
      <Link href="/" className="nav-link">
        Home
      </Link>
      <Link href="/about" className="nav-link">
        About
      </Link>
    </nav>
  )
}

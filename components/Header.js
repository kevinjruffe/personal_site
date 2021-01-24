import Link from "next/link";

export default function Header() {
  const anchorClass = "transition-colors hover:text-green-dark";

  return (
    <header className="border-b-solid border-b-2 border-green-light bg-white flex">
      <div className="md:w-32">
        <Link href="/">
          <a className="inline-block">
            <img
              className="w-1/2 md:w-auto sm:w-24"
              src="/logo-header.png"
              alt="Logo (tent)"
            />
          </a>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="flex h-full justify-around items-center text-xl uppercase text-green-light font-extrabold tracking-widest pt-4 md:text-base sm:text-xs">
          <li>
            <Link href="/">
              <a className={anchorClass}>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className={anchorClass}>About</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <a className={anchorClass}>Contact</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

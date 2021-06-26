import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const anchorClass = "transition-colors hover:text-green-dark";

  return (
    <header className="border-b-solid border-b-2 border-green-light bg-white grid grid-cols-4">
      <div className="col-span-1 sm:w-24">
        <Link href="/">
          <a className="inline-block">
            <Image
              src="/logo-header.png"
              alt="Logo (tent)"
              priority
              loading="eager"
              width={175}
              height={103}
            />
          </a>
        </Link>
      </div>
      <nav className="col-span-2 col-start-3 md:col-span-3 md:col-start-2">
        <ul className="flex h-full justify-around items-center text-xl uppercase text-green-light font-extrabold tracking-widest pt-4 sm:text-sm">
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

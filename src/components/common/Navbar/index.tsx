import { Anchor } from '@/components/toolkit/Anchor'
import { getUserSession } from '@/utils/auth/getUserSession'

import { Account } from './icons/Account'
import { NAVBAR_LINKS } from './icons/data'
import { MagnifyingGlass } from './icons/MagnifyingGlass'
import { Shop } from './icons/Shop'
import { LoginButton } from './LoginButton'

export const Navbar: React.FC = async () => {
  const session = await getUserSession()

  return (
    <nav className="sticky inset-0 z-50 max-h-[72px] w-full border-b border-neutral-100 bg-white px-6 py-4 drop-shadow-sm backdrop-blur-sm backdrop-filter lg:px-4 xl:px-0">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-4 lg:gap-8">
        <div className="flex w-full items-center gap-4 lg:gap-6">
          {NAVBAR_LINKS.map((navbarLink, index: number) => (
            <Anchor
              className="cursor-pointer text-sm font-normal transition-all duration-300 hover:text-amber-700"
              href="#"
              key={`${navbarLink.label}-${index}`}
              variant="custom"
            >
              {navbarLink.label}
            </Anchor>
          ))}
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-6">
          <div className="relative flex w-full flex-1">
            <figure className="pointer-events-none absolute left-4 top-1/2 z-10 w-5 -translate-y-1/2 text-neutral-200">
              <MagnifyingGlass className="h-4 w-4 text-neutral-600" />
            </figure>
            <input
              className="w-full rounded-sm bg-white px-3 py-2 pl-12 text-base outline-none ring-1 ring-neutral-300 duration-default focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400"
              id="search"
              maxLength={80}
              minLength={1}
              name="search"
              spellCheck={false}
              type="text"
            />
          </div>
          {session?.user ? (
            <div className="ml-2 flex items-center gap-4 lg:gap-6">
              <Shop className="h-5 w-5 cursor-pointer text-neutral-700 transition-all duration-300 hover:brightness-125" />
              <Account className="h-5 w-5 cursor-pointer text-neutral-700 transition-all duration-300 hover:brightness-125" />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  )
}

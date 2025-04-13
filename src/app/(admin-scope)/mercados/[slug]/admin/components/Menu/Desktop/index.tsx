import { Anchor } from '@/components/toolkit/Anchor'

import { NAVIGATION_LIST } from '../Mobile/data'
import { NavigationItem } from './NavigationItem'

export const DesktopMenu: React.FC = () => {
  return (
    <div className="invisible-scrollbar overflow-y-scrool relative w-full max-w-[223%] bg-neutral-100 pt-12 lg:pt-8 2xl:max-w-[17.5%]">
      <div className="flex flex-col lg:px-6">
        {NAVIGATION_LIST.map((navigationItem, index) => (
          <NavigationItem
            copy={navigationItem}
            key={`${navigationItem.title}-${index}`}
          />
        ))}
        <Anchor className="mt-6 min-w-full" href="#" variant="primary">
          Suporte
        </Anchor>
      </div>
    </div>
  )
}

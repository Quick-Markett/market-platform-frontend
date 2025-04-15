import { Anchor } from '@/components/toolkit/Anchor'

import { NAVIGATION_LIST } from '../Mobile/data'
import { NavigationItem } from './NavigationItem'

export const DesktopMenu: React.FC = () => {
  return (
    <div className="invisible-scrollbar overflow-y-scrool relative w-full bg-white pt-12 lg:max-w-[30%] lg:pt-8 xl:max-w-[26.7%] 2xl:max-w-[17.5%]">
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

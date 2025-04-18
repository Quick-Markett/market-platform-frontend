import { Breadcrumb } from '@/components/common/Breadcrumb'
import { Anchor } from '@/components/toolkit/Anchor'

import { NAVIGATION_LIST } from '../Mobile/data'
import type { MenuProps } from '../types'
import { NavigationItem } from './NavigationItem'

export const DesktopMenu: React.FC<MenuProps> = ({ slug }) => {
  return (
    <div className="invisible-scrollbar overflow-y-scrool relative w-full bg-white pt-12 lg:max-w-[28%] lg:pt-8 xl:max-w-[26.7%] 2xl:max-w-[17.5%]">
      <div className="flex flex-col lg:px-6">
        <Breadcrumb
          className="mb-4 xl:mb-6"
          items={[{ name: 'Admin', href: '#' }]}
        />
        {NAVIGATION_LIST.map((navigationItem, index) => (
          <NavigationItem
            copy={navigationItem}
            key={`${navigationItem.title}-${index}`}
          />
        ))}
        <Anchor
          className="mt-6 min-w-full md:text-sm 2xl:text-base"
          href="#"
          variant="primary"
        >
          Suporte
        </Anchor>
        <Anchor
          className="mt-4 min-w-full md:text-sm 2xl:text-base"
          href={`/mercados/${slug}`}
          variant="primaryOutline"
        >
          Voltar
        </Anchor>
      </div>
    </div>
  )
}

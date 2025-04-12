'use client'

import { useState } from 'react'

import { HamburgerButton } from '@/components/common/HamburgerButton'
import { Anchor } from '@/components/toolkit/Anchor'

import { NAVIGATION_LIST } from './data'
import { Drawer } from './Drawer'
import { NavigationItem } from './NavigationItem'

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggleSideMenu = () => {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <div className="absolute inset-0 flex items-start gap-4 px-4 py-4">
      <HamburgerButton
        isOpen={isOpen}
        onClick={handleToggleSideMenu}
        variant="primary"
      />
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} fullScreenOnMobile>
        <div className="flex flex-col pt-16 lg:px-6 lg:pt-24">
          {NAVIGATION_LIST.map((navigationItem, index) => (
            <NavigationItem
              copy={navigationItem}
              handleToggleSideMenu={handleToggleSideMenu}
              key={`${navigationItem.title}-${index}`}
            />
          ))}
          <Anchor
            className="mt-6 min-w-full"
            href="#"
            onClick={() => handleToggleSideMenu()}
            variant="primary"
          >
            Suporte
          </Anchor>
        </div>
      </Drawer>
    </div>
  )
}

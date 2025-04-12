'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { DropdownArrow } from '../icons/DropdownArrow'
import type { NavigationItemProps } from './types'

export const NavigationItem: React.FC<NavigationItemProps> = ({
  copy,
  handleToggleSideMenu
}) => {
  const [isQuestionOpen, setIsQuestionOpen] = useState<boolean>(false)

  const pathname = usePathname()
  const dividedPath = pathname.split('/').filter(Boolean)
  const currentPath = dividedPath.at(-1)

  return (
    <button
      className={`flex w-full cursor-pointer flex-col justify-center rounded-sm p-3 duration-default lg:items-start lg:px-0 lg:py-4`}
    >
      <div
        className={`${
          isQuestionOpen ? 'mb-2' : 'mb-0'
        } flex w-full items-center justify-between gap-8 border-b border-neutral-200 pb-2 transition-all`}
        onClick={() => setIsQuestionOpen(!isQuestionOpen)}
      >
        <p className="w-full text-left text-sm font-medium text-neutral-600 transition lg:text-base">
          {copy.title}
        </p>

        <figure className="ml-2">
          <DropdownArrow
            className={`w-4 text-neutral-500 transition-all duration-300 ease-in-out hover:text-neutral-700 ${
              isQuestionOpen ? 'rotate-0' : '-rotate-90'
            }`}
          />
        </figure>
      </div>

      <div
        className={`w-full overflow-hidden text-left text-sm transition-all duration-default ease-in-out ${isQuestionOpen ? 'max-h-[300px]' : 'max-h-0'}`}
      >
        <ul className="flex w-full flex-col">
          {copy.items.map(({ id, label }, index) => (
            <li
              onClick={() => {
                handleToggleSideMenu()
              }}
              className="w-full"
              key={`${label}-${index}`}
            >
              <div
                className={`flex w-full border-neutral-100 py-2 pl-2 transition-all duration-300 ${currentPath === id ? 'border border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-b bg-transparent text-neutral-600'}`}
              >
                {label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </button>
  )
}

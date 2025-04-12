import { Fragment } from 'react'

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { Transition } from '@headlessui/react'

import { XMark } from '../icons/XMark'
import type { DrawerProps } from './types'

export const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpen,
  setIsOpen,
  fullScreenOnMobile
}) => {
  const handleCloseDrawer = () => {
    setIsOpen(false)
  }

  useLockBodyScroll(false)

  return (
    <Transition.Root as="section" show={isOpen} unmount={false}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            (event.target as HTMLDivElement).id === 'side-menu-backdrop' &&
            handleCloseDrawer()
          }
          className="fixed left-0 top-0 z-10 h-screen w-screen bg-neutral-900/40"
          id="side-menu-backdrop"
          tabIndex={-1}
        ></div>
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-300"
        enterFrom="opacity-0 -translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="ease-in-out duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 -translate-x-full"
        unmount={false}
      >
        <div
          className={`drawer-toolkit fixed left-0 top-0 z-50 flex h-full min-w-96 flex-col gap-12 overflow-auto bg-white shadow-xl ${fullScreenOnMobile ? 'w-full lg:w-auto' : ''}`}
        >
          <div className="absolute left-4 top-4">
            <button
              aria-label="close-modal"
              className="w-10 rounded-sm p-2 text-neutral-500 duration-default lg:hover:bg-neutral-100 lg:hover:text-neutral-500"
              onClick={handleCloseDrawer}
            >
              <XMark />
            </button>
          </div>
          {children}
        </div>
      </Transition.Child>
    </Transition.Root>
  )
}

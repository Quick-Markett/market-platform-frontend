'use client'

import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cloneElement, useEffect, useState } from 'react'

import { Modal } from '@/components/toolkit/Modal'
import { useEventListener } from '@/hooks/useEventListener'
import { useUserSession } from '@/hooks/useUserSession'
import { getAuthFormSearchParamsData } from '@/utils/auth/getAuthFormSearchParamsData'
import { updateUserSsoAccount } from '@/utils/auth/updateUserSsoAccount'
import type { AuthModalEventData } from '@/utils/customEvents/@handlers/authModal/types'

import type { ModalWrapperProps } from './types'

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  dismissible,
  children,
  cookiesData
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUserSession()
  const searchParams = useSearchParams()

  const { searchParamRedirectUrl, searchParamShouldAuthenticate } =
    getAuthFormSearchParamsData(searchParams)

  const [isOpen, setIsOpen] = useState(searchParamShouldAuthenticate)
  const [eventData, setEventData] = useState<AuthModalEventData>()

  const handleSetIsOpen = (state: boolean) => {
    setIsOpen(state)

    if (!state && searchParamShouldAuthenticate) {
      const nextSearchParams = new URLSearchParams(searchParams.toString())
      nextSearchParams.delete('should_authenticate')
      nextSearchParams.delete('auth_redirect')
      router.replace(`${pathname}?${nextSearchParams}`)
    }

    if (!state) {
      deleteCookie('cookiesAuthInitialStep', {
        path: '/'
      })

      deleteCookie('cookiesUserEmail', {
        path: '/'
      })
    }
  }

  useEffect(() => {
    if (isOpen && user) {
      handleSetIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isOpen])

  useEffect(() => {
    updateUserSsoAccount(user)
  }, [user])

  useEventListener('auth-modal-event', ({ action, data }) => {
    setEventData(data)
    switch (action) {
      case 'open': {
        handleSetIsOpen(true)
        break
      }
      case 'close': {
        handleSetIsOpen(false)
        break
      }
    }
  })

  return (
    <div data-cid="auth-modal">
      <Modal
        dismissible={dismissible}
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
      >
        <div className="flex rounded-sm bg-white md:w-[1000px] lg:justify-between">
          <figure className="hidden w-full lg:flex">
            <Image
              alt="Market Image"
              className="h-full w-full rounded-l-sm object-cover"
              height={1308}
              src="https://c0.wallpaperflare.com/preview/574/326/475/market-grocery-store-supermarket-shop.jpg"
              width={910}
            />
          </figure>
          <section className="w-full py-10 pl-4 pr-4 lg:pl-8 lg:pr-6">
            {cloneElement(children, {
              defaultCommonFormsData: {
                initialStep:
                  eventData?.initialStep ?? cookiesData.cookiesAuthInitialStep,
                redirectUrl: searchParamRedirectUrl,
                email: cookiesData.cookiesUserEmail
              }
            })}
          </section>
        </div>
      </Modal>
    </div>
  )
}

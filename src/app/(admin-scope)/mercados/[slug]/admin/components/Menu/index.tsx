import { DesktopMenu } from './Desktop'
import { MobileMenu } from './Mobile'
import type { MenuProps } from './types'

export const Menu: React.FC<MenuProps> = ({ slug }) => {
  return (
    <>
      <MobileMenu slug={slug} />
      <DesktopMenu slug={slug} />
    </>
  )
}

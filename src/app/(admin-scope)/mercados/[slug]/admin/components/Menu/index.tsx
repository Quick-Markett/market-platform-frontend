import { DesktopMenu } from './Desktop'
import { MobileMenu } from './Mobile'

export const Menu: React.FC = () => {
  return (
    <>
      <MobileMenu />
      <DesktopMenu />
    </>
  )
}

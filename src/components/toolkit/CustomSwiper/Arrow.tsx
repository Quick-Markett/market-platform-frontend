import type { IconProps } from '@/types/components/icons'

export const Arrow: React.FC<IconProps> = props => {
  return (
    <svg
      fill="none"
      height="9"
      viewBox="0 0 14 9"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13 8L7 2L0.999999 8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

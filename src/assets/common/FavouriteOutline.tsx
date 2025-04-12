import type { IconProps } from '@/types/components/icons'

export const FavouriteOutline: React.FC<IconProps> = props => {
  return (
    <svg
      fill="none"
      height="22"
      viewBox="0 0 17 22"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.00390625 0V22L8.40391 14.8L16.8039 22V0H0.00390625ZM15.3039 18.8L8.40391 13L1.50391 18.8V1.6H15.2039L15.3039 18.8Z"
        fill="currentColor"
      />
    </svg>
  )
}

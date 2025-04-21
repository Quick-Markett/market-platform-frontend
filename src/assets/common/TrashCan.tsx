import type { IconProps } from '@/types/components/icons'

export const TrashCan: React.FC<IconProps> = props => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 20 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.5 4.6H18.4H14.5V3.4C14.5 1.9 13.3 0.699997 11.8 0.699997H8C6.5 0.699997 5.3 1.9 5.3 3.4V4.6H1.6H0.5V6.1H1.7L2.5 20.8C2.6 22.2 3.7 23.3 5.1 23.3H14.9C16.3 23.3 17.5 22.2 17.5 20.8L18.3 6.1H19.5V4.6ZM6.9 3.4C6.9 2.8 7.4 2.2 8.1 2.2H11.9C12.5 2.2 13.1 2.7 13.1 3.4V4.6H6.9V3.4ZM16 20.7C16 21.3 15.5 21.8 14.9 21.8H5.1C4.5 21.8 4 21.3 4 20.7L3.2 6.1H5.5H14.6H16.9L16 20.7ZM9.2 8.2H10.7V19.7H9.2V8.2ZM13.1 8.2H14.6V19.7H13.1V8.2ZM5.4 8.2H6.9V19.7H5.4V8.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

import type { SetStateAction } from 'react'

export interface FirstStepProps {
  setCurrentStep: React.Dispatch<SetStateAction<number>>
}

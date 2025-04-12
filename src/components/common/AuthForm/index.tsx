'use client'

import { useState } from 'react'

import { Stepper } from '@/components/toolkit/Stepper'

import { LoginForm } from './LoginForm'
import { SignUpForm } from './SignUpForm'
import type { AuthFormCustomSteps, CommonFormsData } from './types'

const customSteps: AuthFormCustomSteps[] = ['login', 'signUp']

export const AuthForm: React.FC = () => {
  const [commonFormsData, setCommonFormsData] = useState<CommonFormsData>({})

  const handleSetCommonFormsData = (data: Partial<CommonFormsData>) => {
    setCommonFormsData(prev => ({
      ...prev,
      ...data
    }))
  }

  return (
    <Stepper
      customSteps={customSteps}
      initialStep={commonFormsData.initialStep}
    >
      {options => (
        <>
          <SignUpForm
            {...options}
            commonFormsData={commonFormsData}
            setCommonFormsData={handleSetCommonFormsData}
          />
          <LoginForm
            {...options}
            commonFormsData={commonFormsData}
            setCommonFormsData={handleSetCommonFormsData}
          />
        </>
      )}
    </Stepper>
  )
}

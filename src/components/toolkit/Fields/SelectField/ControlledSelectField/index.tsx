import { Controller } from 'react-hook-form'

import { SelectField } from '..'

import type { ControlledSelectFieldProps } from './types'

export const ControlledSelectField: React.FC<ControlledSelectFieldProps> = ({
  name,
  label,
  placeholder,
  control,
  disabled = false,
  variant = 'primary'
}: ControlledSelectFieldProps) => (
  <Controller
    render={({ field }) => (
      <SelectField
        {...field}
        id={name}
        label={label}
        options={[]}
        placeholder={placeholder || field.value}
        variant={variant}
      />
    )}
    control={control}
    disabled={disabled}
    name={name}
  />
)

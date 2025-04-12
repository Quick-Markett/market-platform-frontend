'use client'

import { forwardRef } from 'react'

import { generateRandomCode } from '@/utils/helpers/generateRandomValue'

import type { SelectProps } from './types'
import { selectVariants } from './variance'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant,
      error,
      value,
      placeholder,
      options,
      defaultValue = '',
      name,
      id = generateRandomCode(),
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        <select
          className={selectVariants({
            variant,
            error: !!error,
            hasCurrentValue: value !== ''
          })}
          id={id}
          name={name}
          ref={ref}
          value={value}
          {...props}
          onChange={onChange}
        >
          <option defaultValue={defaultValue} value={defaultValue}>
            {placeholder}
          </option>

          {options.map((item, index) => (
            <option key={`${item.label}-${index}`} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <svg
          aria-hidden="true"
          className="absolute right-0 top-2 mr-2 h-6 w-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            fillRule="evenodd"
          />
        </svg>
      </div>
    )
  }
)

Select.displayName = 'Select'

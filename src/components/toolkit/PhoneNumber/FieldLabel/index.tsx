import type { FieldLabelProps } from './types'

export const FieldLabel: React.FC<FieldLabelProps> = ({ id, label }) => {
  return label ? (
    <label className="text-base text-neutral-700" htmlFor={id}>
      {label}
    </label>
  ) : null
}

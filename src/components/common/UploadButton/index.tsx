import { Button } from '@/components/toolkit/Button'

import type { UploadButtonProps } from './types'

export const UploadButton: React.FC<UploadButtonProps> = ({
  setImagePath,
  uploadImageAction,
  children,
  isLoading
}) => {
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.includes('image')) {
      alert('Só é possível enviar imagens')
      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = async () => {
      const result = reader.result as string

      setImagePath(result)

      if (uploadImageAction) await uploadImageAction(result)
    }
  }

  return (
    <>
      <Button
        className="relative !cursor-pointer md:text-sm"
        isLoading={isLoading}
        variant="primary"
      >
        <input
          accept="image/*"
          className="absolute inset-0 -top-6 z-30 w-auto !cursor-pointer opacity-0"
          id="image"
          name="image"
          onChange={e => handleChangeImage(e)}
          type="file"
        />
        {children}
      </Button>
    </>
  )
}

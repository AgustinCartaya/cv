'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

// Define Zod schema
const schema = z.object({
  image: z.any().refine(file => file instanceof File, {
    message: 'Image is required',
  }),
})

interface ImageDetails {
  colorImage: boolean
  resolution: string
}

interface DataType {
  nb_candidates?: number
  nb_suspicious_candidates?: number
  imageDetails?: ImageDetails
  image_base64?: string
}

const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    resetField,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string>('')
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const [data, setData] = useState<DataType>({})
  const [errorMsj, setErrorMjs] = useState('')

  const handleResetImage = () => {
    setImagePreview(null)
    setResultImage('')
    resetField('image')
    clearErrors('image')
    setErrorMjs('')
    setData({})

    if (abortController) {
      abortController.abort()
      setAbortController(null)
    }
  }

  const handleUseTestImage = async () => {
    const testImageURL =
      'https://raw.githubusercontent.com/AgustinCartaya/cv/refs/heads/refactor/content/public/programs/s2_soft_exudates_detection_in_fundus_images/images/sex_detection_program_1.jpg'

    try {
      const response = await fetch(testImageURL)

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`Failed to fetch the test image. Status: ${response.status} ${response.statusText}`)
      }

      const blob = await response.blob()

      // Check if the blob is an image
      if (!blob.type.startsWith('image/')) {
        throw new Error('The fetched file is not an image')
      }

      // Create a file object from the blob
      const file = new File([blob], 'test-image.jpg', { type: blob.type })

      // Set the image in react-hook-form and clear validation errors
      setValue('image', file, { shouldValidate: true })
      clearErrors('image')
      setErrorMjs('')

      // Create an image preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string) // Set the image preview
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error loading test image:', error)
    }
  }

  // Handle image change, set the preview and form value
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setValue('image', file) // Set file in form state
        clearErrors('image') // Clear errors
        setErrorMjs('')
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const onSubmit = async (data: any) => {
    const controller = new AbortController()
    setAbortController(controller)

    const formData = new FormData()
    formData.append('image', data.image)

    try {
      const response = await fetch('https://cv-agustin-programs.patrice-danse.com/api-test', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()

      if (!responseData.image_base64) {
        throw new Error('Image data is not available')
      }

      let base64Data = responseData.image_base64
      let contentType = 'image/png' // Assuming it's a PNG, you can change it if needed

      if (!base64Data.startsWith('data:image')) {
        base64Data = `data:${contentType};base64,${base64Data}`
      }

      const parts = base64Data.split(',')
      contentType = parts[0].split(':')[1].split(';')[0] // Extract the MIME type (e.g., image/png)
      const base64String = parts[1] // Get the actual Base64 data

      // Convert Base64 to Blob
      const base64ToBlob = (base64String: string, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(base64String) // Decode Base64
        const byteArrays = []

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize)
          const byteNumbers = new Array(slice.length)

          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
          }

          const byteArray = new Uint8Array(byteNumbers)
          byteArrays.push(byteArray)
        }

        return new Blob(byteArrays, { type: contentType })
      }

      // Convert the Base64 to Blob
      const imageBlob = base64ToBlob(base64String, contentType)

      // Create a File from the Blob
      const file = new File([imageBlob], 'result-image.jpg', { type: imageBlob.type })

      setResultImage(`data:image/png;base64,${responseData.image_base64}`)
      setData({
        ...responseData,
      })
      setErrorMjs('')
    } catch (error) {
      setErrorMjs('Error uploading image')
      console.error('Error uploading image:', error)
    }
  }

  // Preview image component
  const PreviewImage = () => (
    <label
      htmlFor="dropzone-file"
      className={`flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 ${
        imagePreview ? 'border' : 'border-dashed'
      } rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100`}
    >
      {imagePreview ? (
        <img src={imagePreview} alt="Uploaded" className="w-full h-full object-cover border rounded-lg shadow-lg" />
      ) : (
        <div className="flex flex-col items-center justify-center p-6">
          {errors.image && typeof errors.image.message === 'string' ? (
            <p className="text-error text-xl font-bold mt-2">{errors.image.message}</p>
          ) : (
            <>
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, BMP, JPG (MIN. 1500x1500px)</p>
            </>
          )}
        </div>
      )}
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        accept="image/*"
        {...register('image')}
        onChange={handleImageChange}
      />
    </label>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <PreviewImage />
          <div className="flex gap-2 justify-center">
            <button
              disabled={isSubmitting}
              onClick={handleUseTestImage}
              type="button"
              className="btn bg-teal text-white mt-4 uppercase"
            >
              Use test image
            </button>
            <button type="button" onClick={handleResetImage} className="btn bg-winter text-white mt-4 uppercase">
              Discard
            </button>
          </div>
        </div>

        <div>
          {isSubmitting ? (
            <div className="flex items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg">
              <span className="loading loading-spinner loading-lg text-teal"></span>
            </div>
          ) : (
            <div
              className={clsx(
                `flex items-center justify-center w-full h-80 border-2 border-gray-300 rounded-lg ${
                  isSubmitSuccessful && resultImage ? 'border' : 'border-dashed'
                }`
              )}
            >
              {isSubmitSuccessful && resultImage && (
                <img src={resultImage} alt="Result" className="w-full h-full object-cover rounded-lg shadow-lg" />
              )}
            </div>
          )}
          {errorMsj && <p className="text-lg text-error mt-4 font-semibold">{errorMsj}</p>}
        </div>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="btn bg-teal text-white mt-4 px-6 uppercase" disabled={isSubmitting}>
          Send
        </button>
      </div>
      {Object.entries(data).length > 0 && isSubmitSuccessful && (
        <div className="grid grid-cols-2 mt-6">
          <div className="flex flex-col">
            <p className="font-semibold mb-2">Image characteristics:</p>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 before:content-['✔']">
                {data?.imageDetails?.colorImage ? 'Color image' : 'Non Color image'}
              </li>
              <li className="flex gap-2 before:content-['✔']">Resolution {data?.imageDetails?.resolution}</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold p-0 mb-2">Results:</p>
            <ul className="list-disc grid ml-6 gap-2">
              <li>Initial candidates identified (white): {data?.nb_candidates}</li>
              <li>Suspicious SEx candidates (blue): {data?.nb_suspicious_candidates}</li>
              <li>Detected Optical Disk (black)</li>
            </ul>
          </div>
        </div>
      )}
    </form>
  )
}

export default Form

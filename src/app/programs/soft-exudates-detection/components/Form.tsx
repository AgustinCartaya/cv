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
  image_url?: string
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
      abortController.abort() // Aborta la solicitud fetch
      setAbortController(null) // Restablecer el controlador
    }
  }

  const handleUseTestImage = async () => {
    const testImageURL =
      'http://cv-agustin-programs.xsbw1369.odns.fr/soft-exudates-detection/sex_detection/data/images/training/IDRiD_13.jpg'

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

  const getImageCharacteristics = (file: File): Promise<{ colorImage: boolean; resolution: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()

      reader.onloadend = () => {
        img.src = reader.result as string
        img.onload = () => {
          const resolution = `${img.width} x ${img.height}`
          const isColorImage = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
          resolve({ colorImage: isColorImage, resolution: resolution })
        }
        img.onerror = reject
      }

      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Handle form submission
  const onSubmit = async (data: any) => {
    const controller = new AbortController()
    setAbortController(controller)

    const formData = new FormData()
    formData.append('image', data.image)

    try {
      const response = await fetch('http://cv-agustin-programs.xsbw1369.odns.fr/soft-exudates-detection', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()

      // Fetch the image characteristics asynchronously
      const imageBlob = await fetch(responseData.image_url).then(res => res.blob())
      const file = new File([imageBlob], 'result-image.jpg', { type: imageBlob.type })

      const imageDetails = await getImageCharacteristics(file)

      setResultImage(responseData.image_url)
      setData({
        ...responseData,
        imageDetails, // Add the image characteristics
      })
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
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
              X
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
              <li>Detected Optical Disk {data?.nb_suspicious_candidates}</li>
            </ul>
          </div>
        </div>
      )}
    </form>
  )
}

export default Form

'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Spinner } from '@/components/Icons'
import Link from 'next/link'

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
  prediction?: number
  probability?: number
  imageDetails?: ImageDetails
  image?: string
  message?: string
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
  const [errorMsj, setErrorMsj] = useState('')

  const handleResetImage = () => {
    setImagePreview(null)
    setResultImage('')
    resetField('image')
    clearErrors('image')
    setErrorMsj('')
    setData({})

    if (abortController) {
      abortController.abort()
      setAbortController(null)
    }
  }

  const handleUseTestImage = async () => {
    const testImageURL =
      'https://raw.githubusercontent.com/AgustinCartaya/s3-binary-skin-lesion-detection-ml/refs/heads/main/program/images/original/train/malign/mal00002.jpg'

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
      setErrorMsj('')

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
        setErrorMsj('')
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const onSubmit = async (data: any) => {
    setData({})
    const controller = new AbortController()
    setAbortController(controller)

    const formData = new FormData()
    formData.append('image', data.image)

    try {
      const response = await fetch('https://cv-agustin-programs.patrice-danse.com/binary-skin-lesion-detection-ml', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()
      if (!responseData.image) {
        throw new Error('Image data is not available')
      }

      const { colorImage, resolution } = await isColorImageAndGetResolution(data.image)

      setResultImage(`data:image/png;base64,${responseData.image}`)
      setData({
        ...responseData,
        imageDetails: { colorImage, resolution: `${resolution.width}x${resolution.height}` },
      })
      setErrorMsj('')
    } catch (error) {
      setResultImage('')
      setErrorMsj('Error uploading image')
      console.error('Error uploading image:', error)
    }
  }

  // Preview image component
  const PreviewImage = () => (
    <label
      htmlFor="dropzone-file"
      className={`flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 ${
        imagePreview ? 'border' : 'border-dashed'
      } rounded-lg bg-gray-50 ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {imagePreview ? (
        <img src={imagePreview} alt="Uploaded" className="w-full h-full object-contain border rounded-lg shadow-lg" />
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
        disabled={isSubmitting}
      />
    </label>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 lg:flex sm:gap-8">
        <div className="flex flex-1 flex-col">
          <PreviewImage />
          <div className="flex gap-2 justify-center my-4">
            <button
              disabled={isSubmitting}
              onClick={handleUseTestImage}
              type="button"
              className="text-sm bg-teal hover:bg-dark_teal text-white uppercase px-4 py-2 rounded shadow-md hover:bg-darkBlue transition duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Use test image
            </button>
            <button
              type="button"
              onClick={handleResetImage}
              className="text-sm bg-error hover:bg-red-700 text-white uppercase px-4 py-2 rounded shadow-md hover:bg-darkBlue transition duration-300"
            >
              Discard
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="text-sm bg-teal hover:bg-dark_teal text-white uppercase px-4 py-2 rounded shadow-md hover:bg-darkBlue transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Send
          </button>
        </div>
        <div className="flex-1">
          {isSubmitting ? (
            <div className="flex items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg">
              <Spinner />
            </div>
          ) : (
            <div
              className={clsx(
                `flex items-center justify-center w-full h-80 border-2 border-gray-300 rounded-lg ${
                  isSubmitSuccessful && resultImage ? 'border bg-white' : 'border-dashed'
                }`
              )}
            >
              {isSubmitSuccessful && resultImage && (
                <img src={resultImage} alt="Result" className="w-full h-full object-contain rounded-lg shadow-lg" />
              )}
            </div>
          )}
          {errorMsj && <p className="text-lg text-error mt-4 font-semibold">{errorMsj}</p>}
          {Object.entries(data).length > 0 && isSubmitSuccessful && (
            <div className="flex flex-col items-center gap-2 my-4">
              <div className="flex justify-center">
                <Link
                  href={resultImage}
                  target="_blank"
                  download="soft-exudates-detection.png"
                  className="text-sm bg-teal hover:bg-dark_teal text-white uppercase px-4 py-2 rounded shadow-md hover:bg-darkBlue transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download Image
                </Link>
              </div>
              <p className="text-lg text-green-400 font-semibold">{data.message}</p>
            </div>
          )}
        </div>
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
              <li>
                Prediction: <strong>{data?.prediction === 1 ? 'Melanoma' : 'Benign lesion'}</strong>
              </li>
              <li>Probability: {(Number(data?.probability) * 100).toFixed(2)}%</li>
            </ul>
          </div>
        </div>
      )}
    </form>
  )
}

export default Form

function isColorImageAndGetResolution(
  file: File
): Promise<{ colorImage: boolean; resolution: { width: number; height: number } }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = event => {
      img.src = event.target?.result as string

      img.onload = () => {
        // Crear un canvas para obtener los datos de la imagen
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto del canvas'))
          return
        }

        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Obtener los datos de la imagen
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Verificar si la imagen es en color
        let isColor = false
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          // Si hay algún pixel que no es gris (r==g==b), la imagen es color
          if (r !== g || g !== b) {
            isColor = true
            break
          }
        }

        // Retornar el resultado como un objeto
        resolve({
          colorImage: isColor,
          resolution: { width: canvas.width, height: canvas.height },
        })
      }

      img.onerror = () => {
        reject(new Error('Error al cargar la imagen'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'))
    }

    // Leer el archivo como Data URL
    reader.readAsDataURL(file)
  })
}

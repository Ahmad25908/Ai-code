'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!)

interface PlantInfo {
  name: string
  scientificName: string
  description: string
  care: string
  funFact: string
}

export default function PlantIdentifier() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (image) {
      setLoading(true)
      try {
        const result = await identifyPlant(image)
        setPlantInfo(result)
      } catch (error) {
        console.error('Error identifying plant:', error)
        alert('An error occurred while identifying the plant. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  async function identifyPlant(image: File): Promise<PlantInfo> {
    const arrayBuffer = await image.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

    const result = await model.generateContent([
      'Identify this plant and provide information about it in the following format: Name: [plant name], Scientific Name: [scientific name], Description: [brief description], Care: [care instructions], Fun Fact: [interesting fact about the plant]',
      {
        inlineData: {
          mimeType: image.type,
          data: Buffer.from(uint8Array).toString('base64')
        }
      }
    ])

    const response = await result.response
    const text = response.text()

    const plantInfo: PlantInfo = {
      name: extractInfo(text, 'Name'),
      scientificName: extractInfo(text, 'Scientific Name'),
      description: extractInfo(text, 'Description'),
      care: extractInfo(text, 'Care'),
      funFact: extractInfo(text, 'Fun Fact')
    }

    return plantInfo
  }

  function extractInfo(text: string, field: string): string {
    const regex = new RegExp(`${field}:\\s*(.+)`)
    const match = text.match(regex)
    return match ? match[1].trim() : 'Not available'
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-green-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-green-500">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
          </label>
        </div>
        {preview && (
          <div className="mt-4">
            <Image src={preview} alt="Preview" width={300} height={300} className="rounded-lg object-cover mx-auto" />
          </div>
        )}
        <button type="submit" className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" disabled={!image || loading}>
          {loading ? 'Identifying...' : 'Identify Plant'}
        </button>
      </form>
      {plantInfo && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-800">{plantInfo.name}</h2>
          <p className="text-sm italic mb-4 text-gray-600">{plantInfo.scientificName}</p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-700">Description</h3>
              <p className="text-gray-700">{plantInfo.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700">Care Instructions</h3>
              <p className="text-gray-700">{plantInfo.care}</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-700">Fun Fact</h3>
              <p className="text-gray-700">{plantInfo.funFact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
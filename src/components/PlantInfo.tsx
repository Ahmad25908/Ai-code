import React from 'react'

interface PlantInfoProps {
  info: {
    name: string
    scientificName: string
    description: string
    care: string
    funFact: string
  }
}

export default function PlantInfo({ info }: PlantInfoProps) {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-800">{info.name}</h2>
      <p className="text-sm italic mb-4 text-gray-600">{info.scientificName}</p>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-green-700">Description</h3>
          <p className="text-gray-700">{info.description}</p>
        </div>
        <div>
          <h3 className="font-semibold text-green-700">Care Instructions</h3>
          <p className="text-gray-700">{info.care}</p>
        </div>
        <div>
          <h3 className="font-semibold text-green-700">Fun Fact</h3>
          <p className="text-gray-700">{info.funFact}</p>
        </div>
      </div>
    </div>
  )
}
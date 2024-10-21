import PlantIdentifier from '@/components/PlantIdentifier';


export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-green-800">Identify Your Plant</h2>
      <p className="mb-6 text-gray-700">
        Upload an image of a plant, and our AI-powered system will identify it and provide you with information about the plant.
      </p>
      <PlantIdentifier />
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-green-800">How It Works</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Upload a clear image of the plant you want to identify.</li>
          <li>Our AI analyzes the image using advanced machine learning algorithms.</li>
          <li>Receive detailed information about the plant, including its name, care instructions, and fun facts.</li>
        </ol>
      </div>
    </div>
  )
}
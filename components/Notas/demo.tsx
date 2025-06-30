"use client"

import HouseCard from "./house-card"

export default function Demo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Propiedades Destacadas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HouseCard />

          <HouseCard
            price="$1,200,000"
            location="Nantucket, Massachusetts"
            bedrooms={5}
            bathrooms={4}
            area="3,200 sq ft"
            type="Casa de Playa"
          />

          <HouseCard
            price="$650,000"
            location="Martha's Vineyard, MA"
            bedrooms={3}
            bathrooms={2}
            area="1,800 sq ft"
            type="Cabaña"
          />
        </div>
      </div>
    </div>
  )
}

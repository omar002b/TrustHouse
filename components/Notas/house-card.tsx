"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square } from "lucide-react"

interface HouseCardProps {
  price?: string
  location?: string
  bedrooms?: number
  bathrooms?: number
  area?: string
  type?: string
}

export default function HouseCard({
  price = "1,800",
  location = "Cape Cod, Massachusetts",
  bedrooms = 4,
  bathrooms = 3,
  area = "340 m²",
  type = "Casa Familiar",
}: HouseCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer max-w-sm">
      {/* Contenedor de imagen con overflow hidden para el efecto hover */}
      <div className="relative h-64 overflow-hidden rounded-t-lg">
        <Image
          src="/house-image.jpg"
          alt="Casa familiar en Cape Cod"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge de tipo de propiedad */}
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 font-medium">
            {type}
          </Badge>
        </div>

        {/* Degradado superpuesto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Efecto blur sutil y gradual para mejor legibilidad */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 backdrop-blur-[25px] transition-opacity duration-300 group-hover:opacity-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            WebkitMaskComposite: 'destination-in',
            maskComposite: 'intersect',
          }}
        />

        {/* Información de la casa superpuesta */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 group-hover:opacity-0 transition-opacity duration-300">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{price}</h3>
            <div className="flex items-center gap-1 text-sm opacity-90">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>

            {/* Características de la casa */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{area}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de hover sutil */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </Card>
  )
}

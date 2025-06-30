"use client"

import { Plus, Eye, Edit, MapPin, Euro } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStatusColor } from "@/utils/helpers"
import type { Property } from "@/types"
import { useEffect } from "react"
import { readProperties } from "@/utils/supabase"

interface PropertiesListProps {
  properties: Property[]
  onAddProperty: () => void
  onEditProperty: (id: string) => void
  onViewDetails: (id: string) => void
}

export const PropertiesList = ({ properties, onAddProperty, onEditProperty, onViewDetails }: PropertiesListProps) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {properties} = await readProperties()
        console.log(properties)
      } catch (error) {
        console.error("Hubo un error:", error)
      }
    }

    fetchData()
  }, [])
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Propiedades</h2>
        <Button onClick={onAddProperty} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Añadir Propiedad
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, key) => (
          <Card key={key} className="bg-gray-900 border-gray-700 hover:border-green-500/30 transition-colors">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                className="object-cover w-full h-full"
              />
              <Badge className={`absolute top-2 right-2 ${getStatusColor(property.status)}`}>
                {property.status === "available" && "Disponible"}
                {property.status === "pending" && "Pendiente"}
                {property.status === "rented" && "Alquilado"}
              </Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-gray-100 mb-2">{property.title}</h3>
              <div className="flex items-center gap-1 text-gray-400 mb-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{property.address}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-green-400 font-bold text-xl">
                  <Euro className="h-5 w-5" />
                  {property.price}
                </div>
                <div className="text-sm text-gray-400">
                  {property.bedrooms} hab • {property.bathrooms} baños • {property.area}m²
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-400">{property.applications} solicitudes</span>
                  <span className="text-gray-400">{property.viewings} visitas</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewDetails(String(property.id))}
                  className="flex-1 bg-black text-white hover:bg-green-700 transition-colors duration-300"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver detalles
                </Button>

                <Button
                  size="sm"
                  onClick={() => onEditProperty(String(property.id))}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

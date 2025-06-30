"use client"

import { Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStatusColor } from "@/utils/helpers"
import type { Viewing, Property } from "@/types"

interface ViewingsListProps {
  viewings: Viewing[]
  properties: Property[]
  onAddViewing: () => void
}

export const ViewingsList = ({ viewings, properties, onAddViewing }: ViewingsListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Visitas</h2>
        <Button onClick={onAddViewing} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Programar Visita
        </Button>
      </div>

      <div className="space-y-4">
        {viewings.map((viewing) => {
          const property = properties.find((p) => p.id === viewing.propertyId)
          return (
            <Card key={viewing.id} className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-100">{viewing.applicantName}</h3>
                      <p className="text-gray-300">{property?.title}</p>
                      <p className="text-sm text-gray-400">
                        {viewing.date} a las {viewing.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(viewing.status)}>
                      {viewing.status === "scheduled" && "Programada"}
                      {viewing.status === "completed" && "Completada"}
                      {viewing.status === "cancelled" && "Cancelada"}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        Editar
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Completar
                      </Button>
                    </div>
                  </div>
                </div>
                {viewing.notes && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-300">{viewing.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

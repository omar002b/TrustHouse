"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Briefcase, CheckCircle, XCircle, AlertCircle } from "lucide-react"

type CompatibilityStatus = "positive" | "negative" | "medium"

interface PersonProfileCardProps {
  name?: string
  age?: number
  profession?: string
  location?: string
  score?: number
  compatibility?: CompatibilityStatus
  profileImage?: string
  bio?: string
  yearsRenting?: number
}

const getCompatibilityConfig = (status: CompatibilityStatus) => {
  switch (status) {
    case "positive":
      return {
        icon: CheckCircle,
        color: "bg-green-100 text-green-800 border-green-200",
        bgColor: "bg-green-50",
        text: "Muy Adecuado",
      }
    case "negative":
      return {
        icon: XCircle,
        color: "bg-red-100 text-red-800 border-red-200",
        bgColor: "bg-red-50",
        text: "No Recomendado",
      }
    case "medium":
      return {
        icon: AlertCircle,
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        bgColor: "bg-yellow-50",
        text: "Revisar",
      }
  }
}

export default function PersonProfileCard({
  name = "Marcus Johnson",
  age = 28,
  profession = "Diseñador Gráfico",
  location = "Barcelona, España",
  score = 4.8,
  compatibility = "positive",
  profileImage = "/person1.jpg",
  bio = "Profesional creativo, responsable y ordenado. Busco un ambiente tranquilo para trabajar desde casa.",
  yearsRenting = 3,
}: PersonProfileCardProps) {
  const compatibilityConfig = getCompatibilityConfig(compatibility)
  const CompatibilityIcon = compatibilityConfig.icon

  return (
    <Card
      className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer max-w-sm ${compatibilityConfig.bgColor}`}
    >
      <CardContent className="p-6">
        {/* Header con foto y score */}
        <div className="flex items-start gap-4 mb-4">
          {/* Foto de perfil circular */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt={`Foto de perfil de ${name}`}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Indicador de compatibilidad */}
            <div className="absolute -bottom-1 -right-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${compatibilityConfig.color.replace("text-", "bg-").replace("bg-", "bg-").split(" ")[0]} border-2 border-white`}
              >
                <CompatibilityIcon className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Info básica y score */}
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{age} años</p>

            {/* Score con estrellas */}
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900 ml-1">{score}</span>
              </div>
              <span className="text-xs text-gray-500">({yearsRenting} años alquilando)</span>
            </div>
          </div>
        </div>

        {/* Badge de compatibilidad */}
        <div className="mb-4">
          <Badge variant="secondary" className={`${compatibilityConfig.color} font-medium`}>
            <CompatibilityIcon className="w-3 h-3 mr-1" />
            {compatibilityConfig.text}
          </Badge>
        </div>

        {/* Información adicional */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>{profession}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        {/* Bio */}
        <div className="text-sm text-gray-700 leading-relaxed">
          <p>{bio}</p>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      </CardContent>
    </Card>
  )
}

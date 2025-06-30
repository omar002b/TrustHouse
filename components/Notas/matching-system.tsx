"use client"

import { useState } from "react"
import HouseCard from "./house-card"
import PersonProfileCard from "./person-profile-card"

interface Connection {
  personId: string
  houseId: string
  score: number
  compatibility: "positive" | "negative" | "medium"
}

const connections: Connection[] = [
  // Marcus Johnson connections
  { personId: "marcus", houseId: "house1", score: 4.8, compatibility: "positive" },
  { personId: "marcus", houseId: "house2", score: 4.2, compatibility: "positive" },
  { personId: "marcus", houseId: "house3", score: 3.8, compatibility: "medium" },

  // Alex Thompson connections
  { personId: "alex", houseId: "house1", score: 3.2, compatibility: "medium" },
  { personId: "alex", houseId: "house2", score: 2.8, compatibility: "medium" },
  { personId: "alex", houseId: "house3", score: 4.1, compatibility: "positive" },

  // Emma Rodriguez connections
  { personId: "emma", houseId: "house1", score: 2.1, compatibility: "negative" },
  { personId: "emma", houseId: "house2", score: 2.5, compatibility: "negative" },
  { personId: "emma", houseId: "house3", score: 3.0, compatibility: "medium" },
]

const getConnectionColor = (compatibility: string) => {
  switch (compatibility) {
    case "positive":
      return "#10b981" // green-500
    case "medium":
      return "#f59e0b" // amber-500
    case "negative":
      return "#ef4444" // red-500
    default:
      return "#6b7280" // gray-500
  }
}

export default function MatchingSystem() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null)

  const people = [
    {
      id: "marcus",
      name: "Marcus Johnson",
      age: 28,
      profession: "Diseñador Gráfico",
      location: "Barcelona, España",
      score: 4.8,
      compatibility: "positive" as const,
      profileImage: "/person1.jpg",
      bio: "Profesional creativo, responsable y ordenado. Busco un ambiente tranquilo para trabajar desde casa.",
      yearsRenting: 3,
    },
    {
      id: "alex",
      name: "Alex Thompson",
      age: 24,
      profession: "Estudiante de Arte",
      location: "Madrid, España",
      score: 3.2,
      compatibility: "medium" as const,
      profileImage: "/person2.jpg",
      bio: "Estudiante universitario, sociable y creativo. Me gusta la música y el arte contemporáneo.",
      yearsRenting: 1,
    },
    {
      id: "emma",
      name: "Emma Rodriguez",
      age: 26,
      profession: "Desarrolladora Web",
      location: "Valencia, España",
      score: 2.1,
      compatibility: "negative" as const,
      profileImage: "/person3.jpg",
      bio: "Trabajo en tecnología, horarios flexibles. Tengo una mascota pequeña y busco un lugar pet-friendly.",
      yearsRenting: 2,
    },
  ]

  const houses = [
    {
      id: "house1",
      price: "€1,600",
      location: "Bis Rue Jean Jaurès, Creteil",
      bedrooms: 4,
      bathrooms: 3,
      area: "400 m2",
      type: "Casa Familiar",
    },
    {
      id: "house2",
      price: "$1,200,000",
      location: "Nantucket, Massachusetts",
      bedrooms: 5,
      bathrooms: 4,
      area: "3,200 sq ft",
      type: "Casa de Playa",
    },
    {
      id: "house3",
      price: "$650,000",
      location: "Martha's Vineyard, MA",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,800 sq ft",
      type: "Cabaña",
    },
  ]

  const getVisibleConnections = () => {
    if (selectedPerson) {
      return connections.filter((conn) => conn.personId === selectedPerson)
    }
    if (selectedHouse) {
      return connections.filter((conn) => conn.houseId === selectedHouse)
    }
    return connections
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Sistema de Evaluación de Inquilinos</h1>

        <div className="relative">
          {/* Contenedor principal con grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Columna de Candidatos */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Candidatos</h2>
              {people.map((person, index) => (
                <div
                  key={person.id}
                  id={`person-${person.id}`}
                  className={`transition-all duration-300 ${
                    selectedPerson === person.id ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  }`}
                  onClick={() => setSelectedPerson(selectedPerson === person.id ? null : person.id)}
                >
                  <PersonProfileCard {...person} />
                </div>
              ))}
            </div>

            {/* Columna de Propiedades */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Propiedades</h2>
              {houses.map((house, index) => (
                <div
                  key={house.id}
                  id={`house-${house.id}`}
                  className={`transition-all duration-300 ${
                    selectedHouse === house.id ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  }`}
                  onClick={() => setSelectedHouse(selectedHouse === house.id ? null : house.id)}
                >
                  <HouseCard {...house} />
                </div>
              ))}
            </div>
          </div>

          {/* SVG para las flechas conectoras */}
          <svg className="absolute inset-0 pointer-events-none z-10" style={{ width: "100%", height: "100%" }}>
            <defs>
              <marker id="arrowhead-positive" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
              </marker>
              <marker id="arrowhead-medium" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
              </marker>
              <marker id="arrowhead-negative" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
              </marker>
            </defs>

            {getVisibleConnections().map((connection, index) => {
              const personIndex = people.findIndex((p) => p.id === connection.personId)
              const houseIndex = houses.findIndex((h) => h.id === connection.houseId)

              // Calcular posiciones aproximadas
              const startY = 120 + personIndex * 280 + 100 // Ajustar según el tamaño de las tarjetas
              const endY = 120 + houseIndex * 280 + 100
              const startX = 400 // Aproximadamente el final de la columna izquierda
              const endX = window.innerWidth > 1024 ? window.innerWidth * 0.5 + 50 : startX + 100 // Inicio de la columna derecha

              const color = getConnectionColor(connection.compatibility)

              return (
                <g key={`${connection.personId}-${connection.houseId}`}>
                  {/* Línea curva */}
                  <path
                    d={`M ${startX} ${startY} Q ${startX + (endX - startX) / 2} ${startY + (endY - startY) / 2} ${endX} ${endY}`}
                    stroke={color}
                    strokeWidth="3"
                    fill="none"
                    markerEnd={`url(#arrowhead-${connection.compatibility})`}
                    opacity={0.8}
                    className="transition-opacity duration-300"
                  />

                  {/* Score en el medio de la línea */}
                  <circle
                    cx={startX + (endX - startX) / 2}
                    cy={startY + (endY - startY) / 2}
                    r="20"
                    fill="white"
                    stroke={color}
                    strokeWidth="2"
                  />
                  <text
                    x={startX + (endX - startX) / 2}
                    y={startY + (endY - startY) / 2 + 5}
                    textAnchor="middle"
                    className="text-sm font-bold"
                    fill={color}
                  >
                    {connection.score}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Leyenda */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Leyenda de Evaluación</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-green-500 rounded"></div>
              <span className="text-sm">Muy Adecuado (4.0+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-amber-500 rounded"></div>
              <span className="text-sm">Revisar (2.5-3.9)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500 rounded"></div>
              <span className="text-sm">No Recomendado (&lt;2.5)</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Haz clic en un candidato o propiedad para ver solo sus conexiones específicas.
          </p>
        </div>
      </div>
    </div>
  )
}

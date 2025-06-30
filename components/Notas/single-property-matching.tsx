"use client"

import { useState } from "react"
import HouseCard from "./house-card"
import PersonProfileCard from "./person-profile-card"
import { Crown } from "lucide-react"

interface Candidate {
  id: string
  name: string
  age: number
  profession: string
  location: string
  score: number
  compatibility: "positive" | "negative" | "medium"
  profileImage: string
  bio: string
  yearsRenting: number
  propertyScore: number
}

const candidates: Candidate[] = [
  {
    id: "marcus",
    name: "Marcus Johnson",
    age: 28,
    profession: "Diseñador Gráfico",
    location: "Barcelona, España",
    score: 4.8,
    compatibility: "positive",
    profileImage: "/person1.jpg",
    bio: "Profesional creativo, responsable y ordenado. Busco un ambiente tranquilo para trabajar desde casa.",
    yearsRenting: 3,
    propertyScore: 4.9,
  },
  {
    id: "alex",
    name: "Alex Thompson",
    age: 24,
    profession: "Estudiante de Arte",
    location: "Madrid, España",
    score: 3.2,
    compatibility: "medium",
    profileImage: "/person2.jpg",
    bio: "Estudiante universitario, sociable y creativo. Me gusta la música y el arte contemporáneo.",
    yearsRenting: 1,
    propertyScore: 3.4,
  },
  {
    id: "emma",
    name: "Emma Rodriguez",
    age: 26,
    profession: "Desarrolladora Web",
    location: "Valencia, España",
    score: 2.1,
    compatibility: "negative",
    profileImage: "/person3.jpg",
    bio: "Trabajo en tecnología, horarios flexibles. Tengo una mascota pequeña y busco un lugar pet-friendly.",
    yearsRenting: 2,
    propertyScore: 2.8,
  },
]

const getConnectionColor = (score: number) => {
  if (score >= 4.0) return "#10b981"
  if (score >= 3.0) return "#f59e0b"
  return "#ef4444"
}

const getCompatibilityFromScore = (score: number): "positive" | "medium" | "negative" => {
  if (score >= 4.0) return "positive"
  if (score >= 3.0) return "medium"
  return "negative"
}

export default function SinglePropertyMatching() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)

  const bestCandidate = candidates.reduce((best, current) =>
    current.propertyScore > best.propertyScore ? current : best,
  )

  const property = {
    price: "€1,600",
      location: "Bis Rue Jean Jaurès, Creteil",
      bedrooms: 4,
      bathrooms: 3,
      area: "400 m2",
      type: "Casa Familiar",
  }
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Evaluación de Candidatos para la Propiedad
        </h1>

        <div className="relative">
          {/* Candidatos en la parte superior */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Candidatos</h2>
              <div className="flex items-center gap-1 text-sm text-amber-600">
                <Crown className="w-4 h-4" />
                <span>Mejor candidato destacado</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {candidates.map((candidate, index) => (
                <div
                  key={candidate.id}
                  id={`candidate-${candidate.id}`}
                  className={`relative transition-all duration-300 ${
                    selectedCandidate === candidate.id ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  } ${candidate.id === bestCandidate.id ? "ring-2 ring-amber-400 ring-offset-2" : ""}`}
                  onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)}
                >
                  {/* Corona para el mejor candidato */}
                  {candidate.id === bestCandidate.id && (
                    <div className="absolute -top-3 -right-3 z-20">
                      <div className="bg-amber-400 text-white rounded-full p-2 shadow-lg">
                        <Crown className="w-5 h-5" />
                      </div>
                    </div>
                  )}

                  <PersonProfileCard
                    {...candidate}
                    compatibility={getCompatibilityFromScore(candidate.propertyScore)}
                  />

                  {/* Score específico para esta propiedad */}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg border-2 border-gray-200">
                    <span className="text-sm font-bold text-gray-800">{candidate.propertyScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Propiedad en la parte inferior */}
          <div className="flex justify-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Propiedad Objetivo</h2>
              <div id="target-property">
                <HouseCard {...property} />
              </div>
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
              <marker id="arrowhead-best" markerWidth="12" markerHeight="9" refX="11" refY="4.5" orient="auto">
                <polygon points="0 0, 12 4.5, 0 9" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
              </marker>
            </defs>

            {candidates.map((candidate, index) => {
              // Calcular posiciones para layout vertical
              const candidateX = 200 + index * 300 // Espaciado horizontal entre candidatos
              const candidateY = 350 // Altura de los candidatos

              const propertyX = 500 // Centro de la propiedad
              const propertyY = 750 // Altura de la propiedad

              const color = getConnectionColor(candidate.propertyScore)
              const compatibility = getCompatibilityFromScore(candidate.propertyScore)
              const isBest = candidate.id === bestCandidate.id

              const isVisible = !selectedCandidate || selectedCandidate === candidate.id

              return (
                <g key={candidate.id} opacity={isVisible ? 1 : 0.2} className="transition-opacity duration-300">
                  {/* Línea curva hacia abajo */}
                  <path
                    d={`M ${candidateX} ${candidateY} Q ${candidateX + (propertyX - candidateX) / 2} ${candidateY + 100} ${propertyX} ${propertyY}`}
                    stroke={color}
                    strokeWidth={isBest ? "4" : "3"}
                    fill="none"
                    markerEnd={isBest ? "url(#arrowhead-best)" : `url(#arrowhead-${compatibility})`}
                    opacity={0.8}
                    strokeDasharray={isBest ? "none" : "5,5"}
                  />

                  {/* Score en el medio de la línea */}
                  <circle
                    cx={candidateX + (propertyX - candidateX) / 2}
                    cy={candidateY + 100}
                    r={isBest ? "25" : "20"}
                    fill="white"
                    stroke={color}
                    strokeWidth={isBest ? "3" : "2"}
                  />
                  <text
                    x={candidateX + (propertyX - candidateX) / 2}
                    y={candidateY + 105}
                    textAnchor="middle"
                    className={isBest ? "text-base font-bold" : "text-sm font-bold"}
                    fill={color}
                  >
                    {candidate.propertyScore}
                  </text>

                  {/* Etiqueta "MEJOR" para el candidato ganador */}
                  {isBest && (
                    <text
                      x={candidateX + (propertyX - candidateX) / 2}
                      y={candidateY + 80}
                      textAnchor="middle"
                      className="text-xs font-bold fill-amber-600"
                    >
                      MEJOR
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Resumen del mejor candidato */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 shadow-lg border border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-bold text-amber-800">Mejor Candidato Recomendado</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{bestCandidate.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {bestCandidate.profession}, {bestCandidate.age} años
              </p>
              <p className="text-sm text-gray-700">{bestCandidate.bio}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Score General:</span>
                <span className="font-semibold">{bestCandidate.score}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Score para esta Propiedad:</span>
                <span className="font-bold text-amber-600">{bestCandidate.propertyScore}/5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Experiencia:</span>
                <span className="font-semibold">{bestCandidate.yearsRenting} años</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Leyenda de Evaluación</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-green-500 rounded"></div>
              <span className="text-sm">Excelente (4.0+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-amber-500 rounded"></div>
              <span className="text-sm">Bueno (3.0-3.9)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500 rounded"></div>
              <span className="text-sm">Regular (&lt;3.0)</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Los candidatos están arriba y todas las flechas convergen hacia la propiedad objetivo abajo.
          </p>
        </div>
      </div>
    </div>
  )
}

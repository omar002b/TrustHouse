"use client"

import { useState } from "react"
import HouseCard from "./house-card"
import PersonProfileCard from "./person-profile-card"

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

export default function StackedCardsMatching() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const property = {
    price: "€1,600/mois",
    location: "Bis Rue Jean Jaurès, Creteil",
    bedrooms: 4,
    bathrooms: 3,
    area: "400 m2",
    type: "Casa Familiar",
  }


  return (
    <div >
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Layout horizontal con flex y justify-between */}
          <div className="flex flex-col lg:flex-row lg:justify-between justify-center gap-16 items-center lg:items-start">

            {/* Stack de cartas de candidatos */}
            <div className="flex justify-center lg:w-1/2">
              <div className="relative">
                {/* Contenedor del stack con más espacio */}
                <div className="relative w-80 h-96">
                  {candidates.map((candidate, index) => {
                    const isHovered = hoveredCard === candidate.id
                    const zIndex = isHovered ? 50 : candidates.length - index
                    const baseOffsetX = index * 35
                    const baseOffsetY = index * 25
                    const hoverOffset = isHovered ? -15 : 0
                    const rotateOffset = isHovered ? 0 : (index - 1) * 3

                    return (
                      <div
                        key={candidate.id}
                        id={`candidate-${candidate.id}`}
                        className="absolute transition-all duration-300 ease-out cursor-pointer"
                        style={{
                          zIndex,
                          transform: `
                    translateX(${baseOffsetX + hoverOffset}px)
                    translateY(${baseOffsetY + hoverOffset}px)
                    rotate(${rotateOffset}deg)
                    ${isHovered ? "scale(1.05)" : "scale(1)"}
                  `,
                        }}
                        onMouseEnter={() => setHoveredCard(candidate.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className={`${isHovered ? "ring-2 ring-blue-500 ring-offset-2" : ""} rounded-lg`}>
                          <PersonProfileCard
                            {...candidate}
                            compatibility={getCompatibilityFromScore(candidate.propertyScore)}
                          />
                        </div>

                        {/* Score específico para esta propiedad */}
                        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg border-2 border-gray-200">
                          <span className="text-sm font-bold text-gray-800">{candidate.propertyScore}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <svg
              width="280"
              height="32"
              viewBox="0 0 280 32"
              className="absolute hidden lg:block lg:w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >

              <path
                d="M10 16 L240 16 M230 8 L240 16 L230 24"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.8"
              />
            </svg>

            {/* Propiedad objetivo */}
            <div className="hidden lg:block lg:w-1/2 pt-14">
              <div id="target-property" className="sticky top-8">
                <HouseCard {...property} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

"use client"

import PersonProfileCard from "./person-profile-card"

export default function ProfilesDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Candidatos para el Piso</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PersonProfileCard
            name="Marcus Johnson"
            age={28}
            profession="Diseñador Gráfico"
            location="Barcelona, España"
            score={4.8}
            compatibility="positive"
            profileImage="/person1.jpg"
            bio="Profesional creativo, responsable y ordenado. Busco un ambiente tranquilo para trabajar desde casa."
            yearsRenting={3}
          />

          <PersonProfileCard
            name="Alex Thompson"
            age={24}
            profession="Estudiante de Arte"
            location="Madrid, España"
            score={3.2}
            compatibility="medium"
            profileImage="/person2.jpg"
            bio="Estudiante universitario, sociable y creativo. Me gusta la música y el arte contemporáneo."
            yearsRenting={1}
          />

          <PersonProfileCard
            name="Emma Rodriguez"
            age={26}
            profession="Desarrolladora Web"
            location="Valencia, España"
            score={2.1}
            compatibility="negative"
            profileImage="/person3.jpg"
            bio="Trabajo en tecnología, horarios flexibles. Tengo una mascota pequeña y busco un lugar pet-friendly."
            yearsRenting={2}
          />
        </div>
      </div>
    </div>
  )
}

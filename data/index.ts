import type { Property, Application, Viewing } from "@/types"

export const initialProperties: Property[] = [
  {
    id: 1,
    title: "Apartamento Moderno Centro",
    address: "Calle Gran Vía 45, Madrid",
    price: 1200,
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    images: [
      "/placeholder.svg?height=400&width=600&text=Salón+Principal",
      "/placeholder.svg?height=400&width=600&text=Cocina+Moderna",
      "/placeholder.svg?height=400&width=600&text=Dormitorio+Principal",
      "/placeholder.svg?height=400&width=600&text=Baño+Completo",
    ],
    status: "available",
    applications: 12,
    viewings: 8,
    description:
      "Moderno apartamento en el centro de Madrid con todas las comodidades. Completamente reformado con acabados de alta calidad, cocina equipada, aire acondicionado y calefacción central. Ubicado en una zona muy tranquila pero céntrica, cerca de transporte público y todos los servicios.",
    customQuestions: [
      {
        id: "1",
        type: "yesno",
        question: "¿Tienes experiencia previa alquilando?",
        required: true,
        scoringImpact: "positive",
        scoringValue: 10,
      },
      {
        id: "2",
        type: "select",
        question: "¿Cuál es tu horario de trabajo?",
        required: true,
        options: ["Mañana", "Tarde", "Noche", "Flexible"],
        scoringImpact: "neutral",
      },
    ],
    publicLink: "apartamento-moderno-centro-abc123",
  },
  {
    id: 2,
    title: "Piso Familiar Chamberí",
    address: "Calle Fuencarral 123, Madrid",
    price: 1800,
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    images: [
      "/placeholder.svg?height=400&width=600&text=Salón+Amplio",
      "/placeholder.svg?height=400&width=600&text=Cocina+Familiar",
      "/placeholder.svg?height=400&width=600&text=Dormitorio+1",
      "/placeholder.svg?height=400&width=600&text=Dormitorio+2",
    ],
    status: "pending",
    applications: 8,
    viewings: 15,
    description:
      "Amplio piso familiar en zona tranquila con parques cercanos. Ideal para familias, con espacios amplios y mucha luz natural. Incluye trastero y plaza de garaje opcional.",
    customQuestions: [
      {
        id: "1",
        type: "yesno",
        question: "¿Planeas tener hijos en los próximos 2 años?",
        required: false,
        scoringImpact: "positive",
        scoringValue: 5,
      },
    ],
    publicLink: "piso-familiar-chamberi-def456",
  },
]

export const applications: Application[] = [
  {
    id: 1,
    propertyId: 1,
    applicant: {
      name: "María García",
      email: "maria.garcia@email.com",
      phone: "+34 666 123 456",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    score: 95,
    solvency: 90,
    history: 95,
    profile: 100,
    income: 3500,
    employment: "Ingeniera de Software",
    family: "Pareja sin hijos",
    pets: false,
    smoker: false,
    status: "pending",
    appliedDate: "2024-01-15",
    documents: ["DNI", "Nóminas", "Contrato trabajo", "Aval bancario"],
    customAnswers: {
      "1": "Sí",
      "2": "Flexible",
    },
  },
  {
    id: 2,
    propertyId: 1,
    applicant: {
      name: "Carlos López",
      email: "carlos.lopez@email.com",
      phone: "+34 666 789 012",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    score: 65,
    solvency: 70,
    history: 60,
    profile: 65,
    income: 1800,
    employment: "Camarero",
    family: "Soltero",
    pets: true,
    smoker: true,
    status: "pending",
    appliedDate: "2024-01-16",
    documents: ["DNI", "Nóminas"],
    customAnswers: {
      "1": "No",
      "2": "Noche",
    },
  },
]

export const viewings: Viewing[] = [
  {
    id: 1,
    propertyId: 1,
    applicantName: "María García",
    date: "2024-01-20",
    time: "10:00",
    status: "scheduled",
    notes: "Interesada en ver la cocina y balcón",
  },
]

export const chartData = [
  { name: "Ene", solicitudes: 12, aprobadas: 8 },
  { name: "Feb", solicitudes: 19, aprobadas: 13 },
  { name: "Mar", solicitudes: 15, aprobadas: 11 },
  { name: "Abr", solicitudes: 22, aprobadas: 16 },
  { name: "May", solicitudes: 18, aprobadas: 14 },
  { name: "Jun", solicitudes: 25, aprobadas: 19 },
]

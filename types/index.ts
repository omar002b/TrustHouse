export interface Property {
  id: string
  title: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  images: string[]
  status: string
  applications: number
  viewings: number
  description: string
  customQuestions: CustomQuestion[]
  publicLink: string
}

export interface Application {
  id: number
  propertyId: number
  applicant: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  score: number
  solvency: number
  history: number
  profile: number
  income: number
  employment: string
  family: string
  pets: boolean
  smoker: boolean
  status: string
  appliedDate: string
  documents: string[]
  customAnswers: Record<string, string>
}

export interface Viewing {
  id: number
  propertyId: number
  applicantName: string
  date: string
  time: string
  status: string
  notes: string
}

export type QuestionType = "text" | "textarea" | "select" | "radio" | "checkbox" | "yesno"

export interface CustomQuestion {
  id: string
  type: QuestionType
  question: string
  required: boolean
  options?: string[]
  scoringImpact?: "positive" | "negative" | "neutral"
  scoringValue?: number
}

export interface PropertyFormData {
  id?: string
  title: string
  price: number
  address: string
  bedrooms: number
  bathrooms: number
  area: number
  description: string
  images: string[]
  customQuestions: CustomQuestion[]
}

export interface ApplicationResponse {
  applicationId: number
  status: "approved" | "rejected"
  message: string
  scheduledDate?: string
  scheduledTime?: string
}

export interface AutoRejectSettings {
  enabled: boolean
  minimumScore: number
  minimumIncome: number
  allowPets: boolean
  allowSmokers: boolean
}

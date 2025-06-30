"use client"

import { useState, useEffect } from "react"
import supabase from "@/lib/supabaseClient"
import { updateProperty } from "@/utils/supabase"
import { initialApplications, initialViewings } from "@/data/mockData"
import { generatePublicLink } from "@/utils/helpers"
import type { Property, Application, Viewing, AutoRejectSettings, ApplicationResponse, PropertyFormData } from "@/types"

export const useRentalData = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loadingProperties, setLoadingProperties] = useState(true)
  const [propertiesError, setPropertiesError] = useState<string | null>(null)
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [viewings, setViewings] = useState<Viewing[]>(initialViewings)

  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("score")
  const [filterStatus, setFilterStatus] = useState("all")

  // Estados para modales de solicitudes
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false)
  const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false)
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null)
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false)
  const [isPublicApplicationOpen, setIsPublicApplicationOpen] = useState(false)
  const [publicPropertyLink, setPublicPropertyLink] = useState<string>("")
  const [selectedApplicationDetails, setSelectedApplicationDetails] = useState<number | null>(null)
  const [isApplicationResponseOpen, setIsApplicationResponseOpen] = useState(false)
  const [isAutoRejectSettingsOpen, setIsAutoRejectSettingsOpen] = useState(false)

  // Nuevo estado para detalles de propiedad
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState<string | null>(null)

  // Estados para respuestas de solicitudes
  const [applicationResponse, setApplicationResponse] = useState<ApplicationResponse>({
    applicationId: 0,
    status: "approved",
    message: "",
    scheduledDate: "",
    scheduledTime: "",
  })

  // Configuración de rechazo automático
  const [autoRejectSettings, setAutoRejectSettings] = useState<AutoRejectSettings>({
    enabled: false,
    minimumScore: 70,
    minimumIncome: 2000,
    allowPets: true,
    allowSmokers: true,
  })

  // Filtros y ordenación
  const filteredApplications = applications
    .filter((app) => filterStatus === "all" || app.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score
      if (sortBy === "date") return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      if (sortBy === "income") return b.income - a.income
      return 0
    })

  // Estadísticas
  const totalApplications = applications.length
  const pendingApplications = applications.filter((app) => app.status === "pending").length
  const approvedApplications = applications.filter((app) => app.status === "approved").length
  const averageScore = Math.round(applications.reduce((sum, app) => sum + app.score, 0) / applications.length)

  useEffect(() => {
    const fetchProperties = async () => {
      setLoadingProperties(true)
      const { data, error } = await supabase
        .from("properties")
        .select("*")
      if (error) {
        setPropertiesError(error.message)
      } else {
        // Map Supabase data to Property type
        const mapped = (data || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          address: p.address,
          price: p.price,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          area: p.area,
          images: Array.isArray(p.images) ? p.images : (Array.isArray(p.images) ? p.images : (p.images ? p.images : [])),
          status: p.status || "available",
          applications: typeof p.applications === "number" ? p.applications : 0,
          viewings: typeof p.viewings === "number" ? p.viewings : 0,
          description: p.description || "",
          customQuestions: Array.isArray(p.custom_questions) ? p.custom_questions : (p.custom_questions ? p.custom_questions : []),
          publicLink: p.publicLink || generatePublicLink(p.title),
        }))
        setProperties(mapped)
      }
      setLoadingProperties(false)
    }
    fetchProperties()
  }, [])

  // Funciones para manejar propiedades
  const handleSaveProperty = (propertyData: PropertyFormData) => {
    const newProperty: Property = {
      ...propertyData,
      status: "available",
      applications: 0,
      viewings: 0,
      publicLink: generatePublicLink(propertyData.title),
    }
    setProperties([...properties, newProperty])
  }

  const handleSaveEditProperty = async (id: string, propertyData: PropertyFormData) => {
    // Prepare the data for Supabase, omitting customQuestions
    const { customQuestions, ...rest } = propertyData;
    const propertyUpdate = {
      ...rest,
      id: id,
      custom_questions: JSON.parse(JSON.stringify(customQuestions)),
      images: JSON.parse(JSON.stringify(propertyData.images)),
    }
    const { error } = await updateProperty(propertyUpdate)
    if (!error) {
      // Refetch properties from Supabase to update local state
      const { data, error: fetchError } = await supabase.from("properties").select("*")
      if (!fetchError) {
        const mapped = (data || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          address: p.address,
          price: p.price,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          area: p.area,
          images: Array.isArray(p.images) ? p.images : (p.images ? p.images : []),
          status: p.status || "available",
          applications: typeof p.applications === "number" ? p.applications : 0,
          viewings: typeof p.viewings === "number" ? p.viewings : 0,
          description: p.description || "",
          customQuestions: Array.isArray(p.custom_questions) ? p.custom_questions : (p.custom_questions ? p.custom_questions : []),
          publicLink: p.publicLink || generatePublicLink(p.title),
        }))
        setProperties(mapped)
      }
    } else {
      alert("Error al actualizar la propiedad: " + error.message)
    }
  }

  // Función para manejar nuevas solicitudes
  const handleSaveApplication = (applicationData: any) => {
    const newApplication: Application = {
      id: Date.now().toString(),
      ...applicationData,
    }
    setApplications([...applications, newApplication])

    // Actualizar contador de solicitudes en la propiedad
    setProperties(
      properties.map((p) => (p.id === applicationData.propertyId ? { ...p, applications: p.applications + 1 } : p)),
    )
  }

  const openEditPropertyModal = (id: string) => {
    setSelectedPropertyDetails(null)
    setEditingPropertyId(id)
    setIsEditPropertyOpen(true)
  }

  return {
    // Data
    properties,
    setProperties,
    loadingProperties,
    propertiesError,
    applications: filteredApplications,
    setApplications,
    viewings,
    setViewings,

    // Filters and sorting
    selectedProperty,
    setSelectedProperty,
    sortBy,
    setSortBy,
    filterStatus,
    setFilterStatus,

    // Modal states - Applications
    isAddPropertyOpen,
    setIsAddPropertyOpen,
    isEditPropertyOpen,
    setIsEditPropertyOpen,
    editingPropertyId,
    setEditingPropertyId,
    isApplicationFormOpen,
    setIsApplicationFormOpen,
    isPublicApplicationOpen,
    setIsPublicApplicationOpen,
    publicPropertyLink,
    setPublicPropertyLink,
    selectedApplicationDetails,
    setSelectedApplicationDetails,
    isApplicationResponseOpen,
    setIsApplicationResponseOpen,
    isAutoRejectSettingsOpen,
    setIsAutoRejectSettingsOpen,

    // Modal states - Properties
    selectedPropertyDetails,
    setSelectedPropertyDetails,

    // Application response
    applicationResponse,
    setApplicationResponse,

    // Auto reject settings
    autoRejectSettings,
    setAutoRejectSettings,

    // Property handlers
    handleSaveProperty,
    handleSaveEditProperty,
    handleSaveApplication,

    // Statistics
    stats: {
      totalApplications,
      pendingApplications,
      approvedApplications,
      averageScore,
    },

    openEditPropertyModal,
  }
}

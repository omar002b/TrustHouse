"use client"

import type React from "react"
import FormEditor from "./form-editor"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageCarousel } from "@/components/common/ImageCarousel"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import supabase from "@/lib/supabaseClient"

import {
  Plus,
  X,
  Settings,
  Link,
  Copy,
  Users,
  Home,
  DollarSign,
  FileText,
  Cigarette,
  PawPrint,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { generatePublicLink } from "@/utils/helpers"
import type { PropertyFormData, CustomQuestion, QuestionType, AutoRejectSettings } from "@/types"
import { createProperty } from "@/utils/supabase"

interface PreferenceItem {
  id: string
  label: string
  selected: boolean
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: (property: PropertyFormData) => void
}

export function AddPropertyModal({ isOpen, onClose, onSave }: Props) {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    price: 0,
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    description: "",
    images: ["/placeholder.svg?height=400&width=600&text=Imagen+Principal"],
    customQuestions: [],
  })

  const [newQuestion, setNewQuestion] = useState<CustomQuestion>({
    id: "",
    type: "text",
    question: "",
    required: false,
    options: [],
    scoringImpact: "neutral",
    scoringValue: 0,
  })

  const [autoRejectSettings, setAutoRejectSettings] = useState<AutoRejectSettings>({
    enabled: false,
    minimumScore: 70,
    minimumIncome: 2000,
    allowPets: true,
    allowSmokers: true,
  })

  const [previewLink, setPreviewLink] = useState("")

  // Estados para preferencias de inquilinos
  const [salaryMultiple, setSalaryMultiple] = useState([3])
  const [maxOccupants, setMaxOccupants] = useState([2])
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([])

  const ageRanges = [
    { id: "18-25", label: "18-25 años" },
    { id: "26-35", label: "26-35 años" },
    { id: "36-45", label: "36-45 años" },
    { id: "46-55", label: "46-55 años" },
    { id: "56-65", label: "56-65 años" },
    { id: "65+", label: "65+ años" },
  ]

  const [familyPreferences, setFamilyPreferences] = useState<PreferenceItem[]>([
    { id: "soltero", label: "Soltero/a", selected: false },
    { id: "pareja", label: "En pareja sin hijos", selected: false },
    { id: "pareja-hijos", label: "En pareja con hijos", selected: false },
    { id: "familia-monoparental", label: "Familia monoparental", selected: false },
    { id: "compartido", label: "Vivienda compartida", selected: false },
    { id: "estudiantes", label: "Grupo de estudiantes", selected: false },
  ])

  const [employmentPreferences, setEmploymentPreferences] = useState<PreferenceItem[]>([
    { id: "funcionario", label: "Funcionario", selected: false },
    { id: "empleado-fijo", label: "Empleado fijo", selected: false },
    { id: "empleado-temporal", label: "Empleado temporal", selected: false },
    { id: "autonomo", label: "Autónomo", selected: false },
    { id: "jubilado", label: "Jubilado", selected: false },
    { id: "estudiante", label: "Estudiante", selected: false },
    { id: "parado", label: "En paro", selected: false },
  ])

  const [contractPreferences, setContractPreferences] = useState<PreferenceItem[]>([
    { id: "indefinido", label: "Contrato Indefinido", selected: false },
    { id: "funcionario", label: "Funcionario Público", selected: false },
    { id: "temporal-largo", label: "Temporal (+1 año)", selected: false },
    { id: "temporal-corto", label: "Temporal (-1 año)", selected: false },
    { id: "autonomo-consolidado", label: "Autónomo consolidado", selected: false },
    { id: "autonomo-nuevo", label: "Autónomo nuevo", selected: false },
  ])

  const [familyRanking, setFamilyRanking] = useState<string[]>([])
  const [employmentRanking, setEmploymentRanking] = useState<string[]>([])
  const [contractRanking, setContractRanking] = useState<string[]>([])

  const [tenantPreferences, setTenantPreferences] = useState({
    solvencyRequired: "",
    debtsAcceptable: "",
    personalLoansAcceptable: "",
    embargoAcceptable: "",
    petsAllowed: "",
    smokingAllowed: "",
    tenantHistory: "",
  })


  const generatePreviewLink = () => {
    if (formData.title) {
      const link = generatePublicLink(formData.title)
      setPreviewLink(link)
      return link
    }
    return ""
  }

  const copyPreviewLink = () => {
    const link = generatePreviewLink()
    if (link) {
      navigator.clipboard.writeText(`${window.location.origin}/property/${link}`)
      alert("Enlace copiado al portapapeles")
    }
  }

  const handleSubmit = async () => {


    const { data: { user } } = await supabase.auth.getUser()


    /*if (!formData.title || !formData.address || formData.price <= 0) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }*/

    const propertyData = {
      user_id: user?.id,
      title: formData.title,
      price: formData.price,
      address: formData.address,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      area: formData.area,
      description: formData.description,
      images: formData.images,
      custom_questions: formData.customQuestions as any,
      auto_reject_settings: autoRejectSettings as any,
      tenant_preferences: {
        ...tenantPreferences,
        ageRanges: selectedAgeRanges,
        salaryMultiple: salaryMultiple[0],
        maxOccupants: maxOccupants[0],
        familyRanking,
        employmentRanking,
        contractRanking,
      } as any,
    }

    const { data, error } = await createProperty(propertyData)
    if (error) {
      alert("Error al crear la propiedad: " + error.message)
      return
    }

    onSave(formData)
    onClose()

    // Reset form
    setFormData({
      title: "",
      price: 0,
      address: "",
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      description: "",
      images: ["/placeholder.svg?height=400&width=600&text=Imagen+Principal"],
      customQuestions: [],
    })
    setActiveTab("basic")
    setPreviewLink("")
  }

  const addQuestion = () => {
    if (!newQuestion.question) {
      alert("Por favor escribe una pregunta")
      return
    }

    if (newQuestion.type === "select" && (!newQuestion.options || newQuestion.options.length === 0)) {
      alert("Por favor añade opciones para la pregunta de selección")
      return
    }

    const question: CustomQuestion = {
      ...newQuestion,
      id: Date.now().toString(),
      options: newQuestion.type === "select" ? newQuestion.options : undefined,
    }

    setFormData({
      ...formData,
      customQuestions: [...formData.customQuestions, question],
    })

    setNewQuestion({
      id: "",
      type: "text",
      question: "",
      required: false,
      options: [],
      scoringImpact: "neutral",
      scoringValue: 0,
    })
  }

  const removeQuestion = (id: string) => {
    setFormData({
      ...formData,
      customQuestions: formData.customQuestions.filter((q) => q.id !== id),
    })
  }

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...(newQuestion.options || []), ""],
    })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(newQuestion.options || [])]
    newOptions[index] = value
    setNewQuestion({ ...newQuestion, options: newOptions })
  }

  const removeOption = (index: number) => {
    const newOptions = (newQuestion.options || []).filter((_, i) => i !== index)
    setNewQuestion({ ...newQuestion, options: newOptions })
  }

  // Funciones para preferencias de inquilinos
  const handleTenantPreferenceChange = (key: string, value: string) => {
    setTenantPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const toggleAgeRange = (rangeId: string) => {
    setSelectedAgeRanges((prev) => (prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId]))
  }

  const toggleSelection = (
    preferences: PreferenceItem[],
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceItem[]>>,
    ranking: string[],
    setRanking: React.Dispatch<React.SetStateAction<string[]>>,
    id: string,
  ) => {
    const newPreferences = preferences.map((item) => {
      if (item.id === id) {
        const newSelected = !item.selected
        if (!newSelected) {
          setRanking((prev) => prev.filter((rankId) => rankId !== id))
        } else {
          setRanking((prev) => [...prev, id])
        }
        return { ...item, selected: newSelected }
      }
      return item
    })
    setPreferences(newPreferences)
  }

  const moveInRanking = (
    ranking: string[],
    setRanking: React.Dispatch<React.SetStateAction<string[]>>,
    id: string,
    direction: "up" | "down",
  ) => {
    const currentIndex = ranking.indexOf(id)
    if (currentIndex === -1) return

    const newRanking = [...ranking]
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    if (targetIndex >= 0 && targetIndex < newRanking.length) {
      ;[newRanking[currentIndex], newRanking[targetIndex]] = [newRanking[targetIndex], newRanking[currentIndex]]
      setRanking(newRanking)
    }
  }

  const getSelectedItems = (preferences: PreferenceItem[]) => {
    return preferences.filter((item) => item.selected)
  }

  const PreferenceSelector = ({
    title,
    preferences,
    setPreferences,
    ranking,
    setRanking,
    icon,
  }: {
    title: string
    preferences: PreferenceItem[]
    setPreferences: React.Dispatch<React.SetStateAction<PreferenceItem[]>>
    ranking: string[]
    setRanking: React.Dispatch<React.SetStateAction<string[]>>
    icon: React.ReactNode
  }) => {
    const selectedItems = getSelectedItems(preferences)

    return (
      <div className="space-y-4">
        <Label className="text-gray-100 text-base font-medium flex items-center">
          {icon}
          {title}
        </Label>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-sm text-gray-400 mb-3">✅ Selecciona las opciones que te interesan:</div>
            <div className="space-y-2 bg-gray-600/20 p-4 rounded-lg max-h-64 overflow-y-auto">
              {preferences.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-600/30 transition-colors"
                >
                  <Checkbox
                    id={`${title}-${item.id}`}
                    checked={item.selected}
                    onCheckedChange={() => toggleSelection(preferences, setPreferences, ranking, setRanking, item.id)}
                    className="border-gray-400"
                  />
                  <Label htmlFor={`${title}-${item.id}`} className="text-gray-100 text-sm flex-1 cursor-pointer">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              {selectedItems.length} de {preferences.length} opciones seleccionadas
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-400 mb-3">🏆 Ordena por preferencia (más a menos interesante):</div>
            {selectedItems.length > 0 ? (
              <div className="space-y-2 bg-gray-600/20 p-4 rounded-lg max-h-64 overflow-y-auto">
                {ranking.map((id, index) => {
                  const item = preferences.find((p) => p.id === id)
                  if (!item) return null

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-500 text-white min-w-[28px] h-6 flex items-center justify-center text-xs">
                          #{index + 1}
                        </Badge>
                        <span className="text-gray-100 text-sm font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveInRanking(ranking, setRanking, id, "up")}
                          disabled={index === 0}
                          className="h-7 w-7 p-0 text-gray-400 hover:text-green-400 disabled:opacity-30"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveInRanking(ranking, setRanking, id, "down")}
                          disabled={index === ranking.length - 1}
                          className="h-7 w-7 p-0 text-gray-400 hover:text-green-400 disabled:opacity-30"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-gray-600/20 p-8 rounded-lg text-center">
                <div className="text-gray-400 text-sm">
                  Primero selecciona las opciones que te interesan en la columna de la izquierda
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-7xl max-h-[95vh] overflow-y-auto text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-xl">Añadir Nueva Propiedad</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800">
            <TabsTrigger value="basic" className="data-[state=active]:bg-green-600">
              Básico
            </TabsTrigger>
            <TabsTrigger value="images" className="data-[state=active]:bg-green-600">
              Imágenes
            </TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-green-600">
              Preguntas
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-green-600">
              Preferencias
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-green-600">
              Configuración
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Información Básica */}
          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título de la Propiedad *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-gray-800 border-gray-600 mt-1"
                  placeholder="Ej: Apartamento moderno centro"
                />
              </div>
              <div>
                <Label htmlFor="price">Precio Mensual (€) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="bg-gray-800 border-gray-600 mt-1"
                  min="0"
                  placeholder="1200"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Dirección Completa *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-gray-800 border-gray-600 mt-1"
                placeholder="Ej: Calle Gran Vía 45, 3º A, 28013 Madrid"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-white" htmlFor="bedrooms">Habitaciones</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="bg-gray-800 border-gray-600 mt-1"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Baños</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="bg-gray-800 border-gray-600 mt-1"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="area">Superficie (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                  className="bg-gray-800 border-gray-600 mt-1"
                  min="0"
                  placeholder="75"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripción Detallada</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-800 border-gray-600 mt-1"
                rows={6}
                placeholder="Describe la propiedad, sus características, ubicación, servicios cercanos, etc..."
              />
            </div>
          </TabsContent>

          {/* Tab 2: Gestión de Imágenes */}
          <TabsContent value="images" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Galería de Imágenes</h3>
                <p className="text-sm text-gray-400">Arrastra y suelta hasta 10 imágenes de la propiedad</p>
              </div>
              <div className="text-sm text-gray-400">
                {
                  formData.images.filter((img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal")
                    .length
                }{" "}
                / 10 imágenes
              </div>
            </div>

            {/* Área de Drag & Drop */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                formData.images.filter((img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal")
                  .length >= 10
                  ? "border-gray-600 bg-gray-800/50"
                  : "border-gray-600 hover:border-green-500 bg-gray-800/30 hover:bg-gray-800/50 cursor-pointer"
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                e.currentTarget.classList.add("border-green-500", "bg-gray-700/50")
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                e.currentTarget.classList.remove("border-green-500", "bg-gray-700/50")
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.currentTarget.classList.remove("border-green-500", "bg-gray-700/50")

                const files = Array.from(e.dataTransfer.files)
                const imageFiles = files.filter((file) => file.type.startsWith("image/"))

                if (imageFiles.length > 0) {
                  const currentImages = formData.images.filter(
                    (img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal",
                  )
                  const remainingSlots = 10 - currentImages.length
                  const filesToProcess = imageFiles.slice(0, remainingSlots)

                  filesToProcess.forEach((file) => {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      const imageUrl = e.target?.result as string
                      setFormData((prev) => ({
                        ...prev,
                        images:
                          prev.images[0] === "/placeholder.svg?height=400&width=600&text=Imagen+Principal"
                            ? [imageUrl, ...prev.images.slice(1)]
                            : [...prev.images, imageUrl],
                      }))
                    }
                    reader.readAsDataURL(file)
                  })
                }
              }}
              onClick={() => {
                if (
                  formData.images.filter((img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal")
                    .length < 10
                ) {
                  const input = document.createElement("input")
                  input.type = "file"
                  input.multiple = true
                  input.accept = "image/*"
                  input.onchange = (e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || [])
                    const currentImages = formData.images.filter(
                      (img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal",
                    )
                    const remainingSlots = 10 - currentImages.length
                    const filesToProcess = files.slice(0, remainingSlots)

                    filesToProcess.forEach((file) => {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        const imageUrl = e.target?.result as string
                        setFormData((prev) => ({
                          ...prev,
                          images:
                            prev.images[0] === "/placeholder.svg?height=400&width=600&text=Imagen+Principal"
                              ? [imageUrl, ...prev.images.slice(1)]
                              : [...prev.images, imageUrl],
                        }))
                      }
                      reader.readAsDataURL(file)
                    })
                  }
                  input.click()
                }
              }}
            >
              {formData.images.filter((img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal")
                .length >= 10 ? (
                <div className="text-gray-500">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-lg font-medium">Límite alcanzado</p>
                  <p className="text-sm">Has subido el máximo de 10 imágenes</p>
                </div>
              ) : (
                <div className="text-gray-400 hover:text-green-400 transition-colors">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-lg font-medium mb-2">Arrastra y suelta tus imágenes aquí</p>
                  <p className="text-sm mb-4">o haz clic para seleccionar archivos</p>
                  <div className="flex justify-center gap-2 text-xs">
                    <Badge variant="outline" className="text-gray-400">
                      JPG
                    </Badge>
                    <Badge variant="outline" className="text-gray-400">
                      PNG
                    </Badge>
                    <Badge variant="outline" className="text-gray-400">
                      WEBP
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Vista previa de imágenes */}
            {formData.images.some((img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal") && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-200">Imágenes subidas:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images
                    .filter((img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal")
                    .map((image, index) => (
                      <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden group">
                        <div className="relative aspect-square">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex gap-2">
                              {index > 0 && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const newImages = [...formData.images]
                                    const actualIndex = formData.images.findIndex((img) => img === image)
                                    ;[newImages[actualIndex], newImages[actualIndex - 1]] = [
                                      newImages[actualIndex - 1],
                                      newImages[actualIndex],
                                    ]
                                    setFormData({ ...formData, images: newImages })
                                  }}
                                  className="h-8 w-8 p-0 border-gray-400 text-gray-200 hover:bg-gray-700"
                                >
                                  ←
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const newImages = formData.images.filter((img) => img !== image)
                                  if (newImages.length === 0) {
                                    newImages.push("/placeholder.svg?height=400&width=600&text=Imagen+Principal")
                                  }
                                  setFormData({ ...formData, images: newImages })
                                }}
                                className="h-8 w-8 p-0 border-red-400 text-red-400 hover:bg-red-600 hover:border-red-600"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              {index <
                                formData.images.filter(
                                  (img) => img !== "/placeholder.svg?height=400&width=600&text=Imagen+Principal",
                                ).length -
                                  1 && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const newImages = [...formData.images]
                                    const actualIndex = formData.images.findIndex((img) => img === image)
                                    ;[newImages[actualIndex], newImages[actualIndex + 1]] = [
                                      newImages[actualIndex + 1],
                                      newImages[actualIndex],
                                    ]
                                    setFormData({ ...formData, images: newImages })
                                  }}
                                  className="h-8 w-8 p-0 border-gray-400 text-gray-200 hover:bg-gray-700"
                                >
                                  →
                                </Button>
                              )}
                            </div>
                          </div>
                          {index === 0 && (
                            <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">Principal</Badge>
                          )}
                        </div>
                        <CardContent className="p-2">
                          <p className="text-xs text-gray-400 text-center">
                            Imagen {index + 1}
                            {index === 0 && " (Principal)"}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                <div className="text-xs text-gray-400 bg-gray-800/50 p-3 rounded-lg">
                  <p className="font-medium mb-1">💡 Consejos para mejores resultados:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• La primera imagen será la imagen principal de la propiedad</li>
                    <li>• Usa imágenes de alta calidad (mínimo 800x600px)</li>
                    <li>• Incluye fotos del salón, cocina, dormitorios y baños</li>
                    <li>• Puedes reordenar las imágenes usando las flechas ← →</li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Tab 3: Preguntas Personalizadas */}
          <TabsContent value="questions" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Preguntas Personalizadas</h3>
              <p className="text-sm text-gray-400 mb-4">
                Crea preguntas específicas para filtrar mejor a los candidatos
              </p>

              {formData.customQuestions.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-200">Preguntas Configuradas:</h4>
                  {formData.customQuestions.map((question, index) => (
                    <Card key={question.id} className="bg-gray-800 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-100">
                                {index + 1}. {question.question}
                              </span>
                              {question.required && (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                  Obligatoria
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2 text-xs text-gray-400">
                              <Badge variant="outline" className="text-xs">
                                {question.type === "text" && "Texto"}
                                {question.type === "textarea" && "Texto largo"}
                                {question.type === "select" && "Selección"}
                                {question.type === "yesno" && "Sí/No"}
                                {question.type === "radio" && "Opción única"}
                                {question.type === "checkbox" && "Múltiple"}
                              </Badge>
                              {question.scoringImpact !== "neutral" && (
                                <Badge
                                  className={`text-xs ${
                                    question.scoringImpact === "positive"
                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                      : "bg-red-500/20 text-red-400 border-red-500/30"
                                  }`}
                                >
                                  {question.scoringImpact === "positive" ? "+" : "-"}
                                  {question.scoringValue} pts
                                </Badge>
                              )}
                            </div>
                            {question.options && question.options.length > 0 && (
                              <p className="text-xs text-gray-400 mt-1">Opciones: {question.options.join(", ")}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeQuestion(question.id)}
                            className="border-gray-600 text-gray-300 hover:bg-red-600 hover:border-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

            <FormEditor />
            </div>
          </TabsContent>

          {/* Tab 4: Preferencias de Inquilinos */}
          <TabsContent value="preferences" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Preferencias de Inquilinos</h3>
              <p className="text-sm text-gray-400 mb-6">Configura tus preferencias para el tipo de inquilino ideal</p>

              {/* Sección Financiera */}
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center text-lg">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Criterios Financieros
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Establezca los requisitos económicos mínimos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-gray-100 text-base font-medium">Múltiplo de salario requerido</Label>
                      <div className="bg-gray-600/50 p-4 rounded-lg">
                        <Slider
                          value={salaryMultiple}
                          onValueChange={setSalaryMultiple}
                          max={6}
                          min={1}
                          step={0.5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                          <span>1x</span>
                          <Badge className="bg-green-500 text-white">{salaryMultiple[0]}x el alquiler</Badge>
                          <span>6x</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-100 text-base font-medium">Número ideal de ocupantes</Label>
                      <div className="bg-gray-600/50 p-4 rounded-lg">
                        <Slider
                          value={maxOccupants}
                          onValueChange={setMaxOccupants}
                          max={6}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                          <span>1 persona</span>
                          <Badge className="bg-green-500 text-white">
                            {maxOccupants[0]} {maxOccupants[0] === 1 ? "persona" : "personas"}
                          </Badge>
                          <span>6+ personas</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <PreferenceSelector
                    title="Tipos de contrato"
                    preferences={contractPreferences}
                    setPreferences={setContractPreferences}
                    ranking={contractRanking}
                    setRanking={setContractRanking}
                    icon={<FileText className="w-4 h-4 mr-2 text-green-500" />}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-3">
                      <Label className="text-gray-100 font-medium">Solvencia económica</Label>
                      <RadioGroup
                        value={tenantPreferences.solvencyRequired}
                        onValueChange={(value) => handleTenantPreferenceChange("solvencyRequired", value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="excelente" id="solvency-excellent" className="border-green-500" />
                          <Label htmlFor="solvency-excellent" className="text-gray-100">
                            Excelente
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="buena" id="solvency-good" className="border-green-500" />
                          <Label htmlFor="solvency-good" className="text-gray-100">
                            Buena
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="aceptable" id="solvency-acceptable" className="border-green-500" />
                          <Label htmlFor="solvency-acceptable" className="text-gray-100">
                            Aceptable
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-100 font-medium">Deudas</Label>
                      <RadioGroup
                        value={tenantPreferences.debtsAcceptable}
                        onValueChange={(value) => handleTenantPreferenceChange("debtsAcceptable", value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="ninguna" id="debts-none" className="border-green-500" />
                          <Label htmlFor="debts-none" className="text-gray-100">
                            Sin deudas
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="menores" id="debts-minor" className="border-green-500" />
                          <Label htmlFor="debts-minor" className="text-gray-100">
                            Deudas menores
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="aceptables" id="debts-acceptable" className="border-green-500" />
                          <Label htmlFor="debts-acceptable" className="text-gray-100">
                            Aceptables
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-100 font-medium">Embargos</Label>
                      <Select
                        value={tenantPreferences.embargoAcceptable}
                        onValueChange={(value) => handleTenantPreferenceChange("embargoAcceptable", value)}
                      >
                        <SelectTrigger className="bg-gray-600 border-gray-500 text-gray-100">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-600 border-gray-500">
                          <SelectItem value="no-aceptable">No aceptable</SelectItem>
                          <SelectItem value="resueltos">Solo resueltos</SelectItem>
                          <SelectItem value="menores">Menores aceptables</SelectItem>
                          <SelectItem value="indiferente">Indiferente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sección Personal */}
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center text-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Perfil Personal y Demográfico
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Defina las características personales preferidas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-gray-100 text-base font-medium">Rangos de edad de interés</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-gray-600/20 p-4 rounded-lg">
                      {ageRanges.map((range) => (
                        <div key={range.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <Checkbox
                            id={`age-${range.id}`}
                            checked={selectedAgeRanges.includes(range.id)}
                            onCheckedChange={() => toggleAgeRange(range.id)}
                            className="border-gray-400"
                          />
                          <Label htmlFor={`age-${range.id}`} className="text-gray-100 text-sm">
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {selectedAgeRanges.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-400 mb-1">Rangos seleccionados:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedAgeRanges.map((rangeId) => (
                            <Badge key={rangeId} className="bg-green-500/20 text-green-400 text-xs">
                              {ageRanges.find((r) => r.id === rangeId)?.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <PreferenceSelector
                    title="Estado familiar"
                    preferences={familyPreferences}
                    setPreferences={setFamilyPreferences}
                    ranking={familyRanking}
                    setRanking={setFamilyRanking}
                    icon={<Users className="w-4 h-4 mr-2 text-green-500" />}
                  />

                  <PreferenceSelector
                    title="Estado laboral"
                    preferences={employmentPreferences}
                    setPreferences={setEmploymentPreferences}
                    ranking={employmentRanking}
                    setRanking={setEmploymentRanking}
                    icon={<DollarSign className="w-4 h-4 mr-2 text-green-500" />}
                  />
                </CardContent>
              </Card>

              {/* Sección Estilo de Vida */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center text-lg">
                    <Home className="w-5 h-5 mr-2" />
                    Estilo de Vida y Hábitos
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Configure las preferencias de estilo de vida
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="text-gray-100 flex items-center font-medium">
                        <PawPrint className="w-4 h-4 mr-2 text-green-500" />
                        Mascotas
                      </Label>
                      <RadioGroup
                        value={tenantPreferences.petsAllowed}
                        onValueChange={(value) => handleTenantPreferenceChange("petsAllowed", value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="no" id="pets-no" className="border-green-500" />
                          <Label htmlFor="pets-no" className="text-gray-100">
                            No permitidas
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="pequenas" id="pets-small" className="border-green-500" />
                          <Label htmlFor="pets-small" className="text-gray-100">
                            Solo pequeñas
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="si" id="pets-yes" className="border-green-500" />
                          <Label htmlFor="pets-yes" className="text-gray-100">
                            Permitidas
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-100 flex items-center font-medium">
                        <Cigarette className="w-4 h-4 mr-2 text-green-500" />
                        Fumador
                      </Label>
                      <RadioGroup
                        value={tenantPreferences.smokingAllowed}
                        onValueChange={(value) => handleTenantPreferenceChange("smokingAllowed", value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="no" id="smoking-no" className="border-green-500" />
                          <Label htmlFor="smoking-no" className="text-gray-100">
                            No fumador
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="exterior" id="smoking-outside" className="border-green-500" />
                          <Label htmlFor="smoking-outside" className="text-gray-100">
                            Solo exterior
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="indiferente" id="smoking-indifferent" className="border-green-500" />
                          <Label htmlFor="smoking-indifferent" className="text-gray-100">
                            Indiferente
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-100 flex items-center font-medium">
                        <FileText className="w-4 h-4 mr-2 text-green-500" />
                        Historial
                      </Label>
                      <RadioGroup
                        value={tenantPreferences.tenantHistory}
                        onValueChange={(value) => handleTenantPreferenceChange("tenantHistory", value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="excelente" id="history-excellent" className="border-green-500" />
                          <Label htmlFor="history-excellent" className="text-gray-100">
                            Excelente
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="bueno" id="history-good" className="border-green-500" />
                          <Label htmlFor="history-good" className="text-gray-100">
                            Bueno
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-600/30">
                          <RadioGroupItem value="primer-inquilino" id="history-first" className="border-green-500" />
                          <Label htmlFor="primer-inquilino" className="text-gray-100">
                            Primer inquilino
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 5: Configuración de Solicitudes */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuración de Rechazo Automático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-200">Activar Rechazo Automático</h4>
                    <p className="text-sm text-gray-400">
                      Las solicitudes que no cumplan los criterios serán rechazadas automáticamente
                    </p>
                  </div>
                  <Switch
                    checked={autoRejectSettings.enabled}
                    onCheckedChange={(checked) => setAutoRejectSettings({ ...autoRejectSettings, enabled: checked })}
                  />
                </div>

                {autoRejectSettings.enabled && (
                  <div className="space-y-4 border-t border-gray-700 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Puntuación Mínima</Label>
                        <Input
                          type="number"
                          value={autoRejectSettings.minimumScore}
                          onChange={(e) =>
                            setAutoRejectSettings({
                              ...autoRejectSettings,
                              minimumScore: Number(e.target.value),
                            })
                          }
                          className="bg-gray-700 border-gray-600 mt-1"
                          min="0"
                          max="100"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Solicitudes con puntuación inferior serán rechazadas
                        </p>
                      </div>

                      <div>
                        <Label>Ingresos Mínimos (€/mes)</Label>
                        <Input
                          type="number"
                          value={autoRejectSettings.minimumIncome}
                          onChange={(e) =>
                            setAutoRejectSettings({
                              ...autoRejectSettings,
                              minimumIncome: Number(e.target.value),
                            })
                          }
                          className="bg-gray-700 border-gray-600 mt-1"
                          min="0"
                        />
                        <p className="text-xs text-gray-400 mt-1">Recomendado: 3x el precio del alquiler</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-200">Restricciones Adicionales</h4>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-300">Permitir Mascotas</span>
                          <p className="text-xs text-gray-400">
                            Si está desactivado, rechazará solicitudes con mascotas
                          </p>
                        </div>
                        <Switch
                          checked={autoRejectSettings.allowPets}
                          onCheckedChange={(checked) =>
                            setAutoRejectSettings({ ...autoRejectSettings, allowPets: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-gray-300">Permitir Fumadores</span>
                          <p className="text-xs text-gray-400">
                            Si está desactivado, rechazará solicitudes de fumadores
                          </p>
                        </div>
                        <Switch
                          checked={autoRejectSettings.allowSmokers}
                          onCheckedChange={(checked) =>
                            setAutoRejectSettings({ ...autoRejectSettings, allowSmokers: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 6: Vista Previa */}
          <TabsContent value="preview" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-100">Vista Previa de la Propiedad</h3>
                <p className="text-sm text-gray-400">Así verán la propiedad los posibles inquilinos</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyPreviewLink}
                  className="border-gray-600 text-gray-300"
                  disabled={!formData.title}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar Enlace
                </Button>
                <Button
                  size="sm"
                  onClick={generatePreviewLink}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!formData.title}
                >
                  <Link className="h-4 w-4 mr-2" />
                  Generar Enlace
                </Button>
              </div>
            </div>

            {previewLink && (
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Enlace público:</p>
                <code className="text-green-400 text-sm break-all">
                  {window.location.origin}/property/{previewLink}
                </code>
              </div>
            )}

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                {formData.images.length > 0 && (
                  <div className="mb-4">
                    <ImageCarousel images={formData.images} title={formData.title || "Vista Previa"} />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-100">{formData.title || "Título de la propiedad"}</h2>
                      <p className="text-gray-400">{formData.address || "Dirección de la propiedad"}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">
                        {formData.price > 0 ? `${formData.price}€` : "0€"}
                      </div>
                      <p className="text-sm text-gray-400">por mes</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-100">{formData.bedrooms}</div>
                      <p className="text-sm text-gray-400">Habitaciones</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-100">{formData.bathrooms}</div>
                      <p className="text-sm text-gray-400">Baños</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-100">{formData.area || 0}</div>
                      <p className="text-sm text-gray-400">m²</p>
                    </div>
                  </div>

                  {formData.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-100 mb-2">Descripción</h3>
                      <p className="text-gray-300 leading-relaxed">{formData.description}</p>
                    </div>
                  )}

                  {formData.customQuestions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-4">Preguntas Adicionales</h3>
                      <div className="space-y-3">
                        {formData.customQuestions.map((question, index) => (
                          <div key={question.id} className="bg-gray-700 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-gray-200">
                                {index + 1}. {question.question}
                              </span>
                              {question.required && (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                  Obligatoria
                                </Badge>
                              )}
                            </div>
                            {question.options && question.options.length > 0 && (
                              <div className="text-sm text-gray-400">Opciones: {question.options.join(", ")}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Resumen de Preferencias */}
            {(familyRanking.length > 0 ||
              employmentRanking.length > 0 ||
              contractRanking.length > 0 ||
              selectedAgeRanges.length > 0) && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Resumen de Preferencias Configuradas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{salaryMultiple[0]}x</div>
                      <div className="text-sm text-gray-400">Múltiplo salario</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{maxOccupants[0]}</div>
                      <div className="text-sm text-gray-400">Max ocupantes</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{selectedAgeRanges.length}</div>
                      <div className="text-sm text-gray-400">Rangos edad</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">
                        {familyRanking.length + employmentRanking.length + contractRanking.length}
                      </div>
                      <div className="text-sm text-gray-400">Rankings activos</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {familyRanking.length > 0 && (
                      <div>
                        <Label className="text-gray-300 text-sm">👨‍👩‍👧‍👦 Estado familiar:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {familyRanking.slice(0, 3).map((id, index) => {
                            const item = familyPreferences.find((p) => p.id === id)
                            return (
                              <Badge key={id} className="bg-green-500/20 text-green-400 text-xs">
                                #{index + 1} {item?.label}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {employmentRanking.length > 0 && (
                      <div>
                        <Label className="text-gray-300 text-sm">💼 Estado laboral:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {employmentRanking.slice(0, 3).map((id, index) => {
                            const item = employmentPreferences.find((p) => p.id === id)
                            return (
                              <Badge key={id} className="bg-blue-500/20 text-blue-400 text-xs">
                                #{index + 1} {item?.label}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {contractRanking.length > 0 && (
                      <div>
                        <Label className="text-gray-300 text-sm">📄 Tipo de contrato:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {contractRanking.slice(0, 3).map((id, index) => {
                            const item = contractPreferences.find((p) => p.id === id)
                            return (
                              <Badge key={id} className="bg-purple-500/20 text-purple-400 text-xs">
                                #{index + 1} {item?.label}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {selectedAgeRanges.length > 0 && (
                      <div>
                        <Label className="text-gray-300 text-sm">🎂 Rangos de edad:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedAgeRanges.map((rangeId) => (
                            <Badge key={rangeId} className="bg-orange-500/20 text-orange-400 text-xs">
                              {ageRanges.find((r) => r.id === rangeId)?.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t border-gray-700">
          <div className="flex gap-2">
            {activeTab !== "basic" && (
              <Button
                variant="outline"
                onClick={() => {
                  const tabs = ["basic", "images", "questions", "preferences", "settings", "preview"]
                  const currentIndex = tabs.indexOf(activeTab)
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1])
                  }
                }}
                className="border-gray-600 text-black"
              >
                Anterior
              </Button>
            )}
            {activeTab !== "preview" && (
              <Button
                onClick={() => {
                  const tabs = ["basic", "images", "questions", "preferences", "settings", "preview"]
                  const currentIndex = tabs.indexOf(activeTab)
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1])
                  }
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Siguiente
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="border-gray-600 text-black">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Crear Propiedad
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



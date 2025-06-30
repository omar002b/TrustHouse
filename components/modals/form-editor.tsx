"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Settings, Plus, Trash2, Eye, HelpCircle, FileText, Info, ChevronLeft, ChevronRight, Check } from "lucide-react"

interface FormField {
  id: string
  label: string
  type: "text" | "email" | "tel" | "number" | "select" | "textarea" | "radio" | "checkbox" | "yesno"
  required: boolean
  enabled: boolean
  options?: string[]
  placeholder?: string
  allowedTypes?: ("text" | "email" | "tel" | "number" | "select" | "textarea" | "radio" | "checkbox" | "yesno")[]
}

interface FormSection {
  id: string
  title: string
  icon: string
  enabled: boolean
  fields: FormField[]
  allowCustomFields?: boolean
}

interface CustomQuestion {
  id: string
  question: string
  type: "text" | "textarea" | "select" | "radio" | "checkbox" | "yesno"
  required: boolean
  options?: string[]
}

interface DocumentRequirement {
  id: string
  name: string
  required: boolean
  enabled: boolean
}

interface ExtraInfoRequest {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "yesno"
  required: boolean
  options?: string[]
  enabled: boolean
}

interface Step {
  id: string
  title: string
  icon: string
  component: "sections" | "questions" | "documents" | "extra"
}

export default function FormEditor() {
  const [showPreview, setShowPreview] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps: Step[] = [
    { id: "personal", title: "Información Personal", icon: "📋", component: "sections" },
    { id: "work", title: "Información Laboral", icon: "💼", component: "sections" },
    { id: "home", title: "Información del Hogar", icon: "🏠", component: "sections" },
    { id: "questions", title: "Preguntas Específicas", icon: "❓", component: "questions" },
    { id: "documents", title: "Documentos", icon: "📎", component: "documents" },
    { id: "extra", title: "Información Extra", icon: "ℹ️", component: "extra" },
  ]

  const [formSections, setFormSections] = useState<FormSection[]>([
    {
      id: "personal",
      title: "Información Personal",
      icon: "📋",
      enabled: true,
      allowCustomFields: true,
      fields: [
        {
          id: "fullName",
          label: "Nombre completo",
          type: "text",
          required: true,
          enabled: true,
          allowedTypes: ["text"],
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          required: true,
          enabled: true,
          allowedTypes: ["email"],
        },
        {
          id: "phone",
          label: "Teléfono",
          type: "tel",
          required: true,
          enabled: true,
          allowedTypes: ["tel"],
        },
        {
          id: "age",
          label: "Edad",
          type: "number",
          required: false,
          enabled: true,
          allowedTypes: ["number", "text"],
        },
        {
          id: "dni",
          label: "DNI/NIE",
          type: "text",
          required: false,
          enabled: false,
          allowedTypes: ["text"],
        },
        {
          id: "nationality",
          label: "Nacionalidad",
          type: "text",
          required: false,
          enabled: false,
          allowedTypes: ["text", "select"],
        },
      ],
    },
    {
      id: "work",
      title: "Información Laboral",
      icon: "💼",
      enabled: true,
      allowCustomFields: true,
      fields: [
        {
          id: "occupation",
          label: "Ocupación",
          type: "text",
          required: true,
          enabled: true,
          allowedTypes: ["text", "select"],
        },
        {
          id: "monthlyIncome",
          label: "Ingresos mensuales (€)",
          type: "number",
          required: true,
          enabled: true,
          allowedTypes: ["number"],
        },
        {
          id: "contractType",
          label: "Tipo de contrato",
          type: "select",
          required: false,
          enabled: true,
          options: ["Indefinido", "Temporal", "Autónomo", "Estudiante", "Jubilado", "Otro"],
          allowedTypes: ["select", "text"],
        },
        {
          id: "company",
          label: "Empresa",
          type: "text",
          required: false,
          enabled: true,
          allowedTypes: ["text"],
        },
        {
          id: "workExperience",
          label: "Experiencia laboral",
          type: "select",
          required: false,
          enabled: false,
          options: ["Menos de 1 año", "1-3 años", "3-5 años", "5-10 años", "Más de 10 años"],
          allowedTypes: ["select", "text"],
        },
      ],
    },
    {
      id: "home",
      title: "Información del Hogar",
      icon: "🏠",
      enabled: true,
      allowCustomFields: true,
      fields: [
        {
          id: "familySituation",
          label: "Situación familiar",
          type: "select",
          required: false,
          enabled: true,
          options: ["Soltero/a", "En pareja", "Casado/a", "Divorciado/a", "Viudo/a"],
          allowedTypes: ["select", "text"],
        },
        {
          id: "rentalType",
          label: "¿Cómo vas a alquilar la propiedad?",
          type: "radio",
          required: true,
          enabled: true,
          options: ["Solo/a", "Con otras personas"],
          allowedTypes: ["radio", "select"],
        },
        {
          id: "hasPets",
          label: "¿Tienes mascotas?",
          type: "yesno",
          required: false,
          enabled: true,
          allowedTypes: ["yesno", "text", "textarea"],
        },
        {
          id: "isSmoker",
          label: "¿Eres fumador/a?",
          type: "yesno",
          required: false,
          enabled: true,
          allowedTypes: ["yesno"],
        },
        {
          id: "previousRental",
          label: "¿Has alquilado antes?",
          type: "yesno",
          required: false,
          enabled: false,
          allowedTypes: ["yesno", "text"],
        },
      ],
    },
  ])

  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([
    {
      id: "1",
      question: "¿Tienes experiencia previa alquilando?",
      type: "yesno",
      required: true,
    },
    {
      id: "2",
      question: "¿Cuál es tu horario de trabajo?",
      type: "select",
      required: true,
      options: ["Mañana", "Tarde", "Noche", "Flexible"],
    },
  ])

  const [documents, setDocuments] = useState<DocumentRequirement[]>([
    { id: "1", name: "DNI o NIE", required: true, enabled: true },
    { id: "2", name: "Últimas 3 nóminas", required: true, enabled: true },
    { id: "3", name: "Contrato de trabajo", required: true, enabled: true },
    { id: "4", name: "Declaración de la renta", required: false, enabled: true },
    { id: "5", name: "Justificante de ingresos", required: false, enabled: true },
    { id: "6", name: "Referencias de anteriores alquileres", required: false, enabled: true },
  ])

  const [extraInfoRequests, setExtraInfoRequests] = useState<ExtraInfoRequest[]>([
    { id: "1", label: "Motivo del cambio de vivienda", type: "textarea", required: false, enabled: true },
    { id: "2", label: "Referencias personales", type: "text", required: false, enabled: true },
  ])

  const updateFieldInSection = (sectionId: string, fieldId: string, updates: Partial<FormField>) => {
    setFormSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)),
            }
          : section,
      ),
    )
  }

  const addFieldToSection = (sectionId: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: "Nuevo campo",
      type: "text",
      required: false,
      enabled: true,
      allowedTypes: ["text", "textarea", "select", "yesno"],
    }

    setFormSections((sections) =>
      sections.map((section) =>
        section.id === sectionId ? { ...section, fields: [...section.fields, newField] } : section,
      ),
    )
  }

  const removeFieldFromSection = (sectionId: string, fieldId: string) => {
    setFormSections((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, fields: section.fields.filter((field) => field.id !== fieldId) }
          : section,
      ),
    )
  }

  const toggleSectionEnabled = (sectionId: string) => {
    setFormSections((sections) =>
      sections.map((section) => (section.id === sectionId ? { ...section, enabled: !section.enabled } : section)),
    )
  }

  const addCustomQuestion = () => {
    const newQuestion: CustomQuestion = {
      id: Date.now().toString(),
      question: "Nueva pregunta",
      type: "text",
      required: false,
    }
    setCustomQuestions([...customQuestions, newQuestion])
  }

  const updateCustomQuestion = (id: string, updates: Partial<CustomQuestion>) => {
    setCustomQuestions((questions) => questions.map((q) => (q.id === id ? { ...q, ...updates } : q)))
  }

  const removeCustomQuestion = (id: string) => {
    setCustomQuestions((questions) => questions.filter((q) => q.id !== id))
  }

  const addDocument = () => {
    const newDoc: DocumentRequirement = {
      id: Date.now().toString(),
      name: "Nuevo documento",
      required: false,
      enabled: true,
    }
    setDocuments([...documents, newDoc])
  }

  const updateDocument = (id: string, updates: Partial<DocumentRequirement>) => {
    setDocuments((docs) => docs.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc)))
  }

  const removeDocument = (id: string) => {
    setDocuments((docs) => docs.filter((doc) => doc.id !== id))
  }

  const addExtraInfoRequest = () => {
    const newRequest: ExtraInfoRequest = {
      id: Date.now().toString(),
      label: "Nueva solicitud de información",
      type: "text",
      required: false,
      enabled: true,
    }
    setExtraInfoRequests([...extraInfoRequests, newRequest])
  }

  const updateExtraInfoRequest = (id: string, updates: Partial<ExtraInfoRequest>) => {
    setExtraInfoRequests((requests) => requests.map((req) => (req.id === id ? { ...req, ...updates } : req)))
  }

  const removeExtraInfoRequest = (id: string) => {
    setExtraInfoRequests((requests) => requests.filter((req) => req.id !== id))
  }

  const getFieldTypeOptions = (field: FormField) => {
    const allTypes = [
      { value: "text", label: "Texto" },
      { value: "email", label: "Email" },
      { value: "tel", label: "Teléfono" },
      { value: "number", label: "Número" },
      { value: "select", label: "Selección" },
      { value: "textarea", label: "Área de texto" },
      { value: "radio", label: "Radio" },
      { value: "yesno", label: "Sí/No" },
    ]

    if (field.allowedTypes) {
      return allTypes.filter((type) => field.allowedTypes!.includes(type.value as any))
    }

    return allTypes
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const getCurrentSection = () => {
    const currentStepData = steps[currentStep]
    if (currentStepData.component === "sections") {
      return formSections.find((section) => section.id === currentStepData.id)
    }
    return null
  }

  const renderStepContent = () => {
    const currentStepData = steps[currentStep]

    if (currentStepData.component === "sections") {
      const section = getCurrentSection()
      if (!section) return null

      return (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-400 flex items-center gap-2 text-xl">
                <span>{section.icon}</span>
                {section.title}
              </CardTitle>
              <div className="flex items-center gap-3">
                {section.allowCustomFields && (
                  <Button
                    onClick={() => addFieldToSection(section.id)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Agregar Campo
                  </Button>
                )}
                <div className="flex items-center gap-2">
                  <Label className="text-white text-sm">Sección activa</Label>
                  <Switch
                    checked={section.enabled}
                    onCheckedChange={() => toggleSectionEnabled(section.id)}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.id} className="bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      checked={field.enabled}
                      onCheckedChange={(checked) => updateFieldInSection(section.id, field.id, { enabled: !!checked })}
                      className="border-green-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Input
                      value={field.label}
                      onChange={(e) => updateFieldInSection(section.id, field.id, { label: e.target.value })}
                      className="text-white bg-transparent border-none p-0 h-auto text-base font-medium focus-visible:ring-0 flex-1"
                      disabled={!field.enabled}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-white text-sm">Obligatorio</Label>
                    <Switch
                      checked={field.required}
                      onCheckedChange={(checked) => updateFieldInSection(section.id, field.id, { required: checked })}
                      disabled={!field.enabled}
                      className="data-[state=checked]:bg-green-600"
                    />
                    {section.allowCustomFields && !["fullName", "email", "phone"].includes(field.id) && (
                      <Button
                        onClick={() => removeFieldFromSection(section.id, field.id)}
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white text-sm mb-2 block">Tipo de campo</Label>
                    <Select
                      value={field.type}
                      onValueChange={(value) =>
                        updateFieldInSection(section.id, field.id, { type: value as FormField["type"] })
                      }
                      disabled={!field.enabled}
                    >
                      <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {getFieldTypeOptions(field).map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="text-white focus:bg-gray-600 focus:text-white"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(field.type === "select" || field.type === "radio") && (
                    <div>
                      <Label className="text-white text-sm mb-2 block">Opciones (separadas por comas)</Label>
                      <Input
                        value={field.options?.join(", ") || ""}
                        onChange={(e) =>
                          updateFieldInSection(section.id, field.id, {
                            options: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="Opción 1, Opción 2, Opción 3..."
                        className="bg-gray-600 text-white border-gray-500"
                        disabled={!field.enabled}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )
    }

    if (currentStepData.component === "questions") {
      return (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-400 flex items-center gap-2 text-xl">
                <HelpCircle className="w-6 h-6" />
                Preguntas Específicas
              </CardTitle>
              <Button onClick={addCustomQuestion} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Pregunta
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {customQuestions.map((question, index) => (
              <div key={question.id} className="bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <Input
                    value={question.question}
                    onChange={(e) => updateCustomQuestion(question.id, { question: e.target.value })}
                    className="bg-gray-600 border-gray-500 text-gray-100 flex-1 mr-3"
                    placeholder="Escribe tu pregunta..."
                  />
                  <Button
                    onClick={() => removeCustomQuestion(question.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white text-sm mb-2 block">Tipo de respuesta</Label>
                    <Select
                      value={question.type}
                      onValueChange={(value) =>
                        updateCustomQuestion(question.id, { type: value as CustomQuestion["type"] })
                      }
                    >
                      <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="text" className="text-white focus:bg-gray-600 focus:text-white">
                          Texto corto
                        </SelectItem>
                        <SelectItem value="textarea" className="text-white focus:bg-gray-600 focus:text-white">
                          Texto largo
                        </SelectItem>
                        <SelectItem value="select" className="text-white focus:bg-gray-600 focus:text-white">
                          Lista desplegable
                        </SelectItem>
                        <SelectItem value="radio" className="text-white focus:bg-gray-600 focus:text-white">
                          Opción única
                        </SelectItem>
                        <SelectItem value="checkbox" className="text-white focus:bg-gray-600 focus:text-white">
                          Múltiple selección
                        </SelectItem>
                        <SelectItem value="yesno" className="text-white focus:bg-gray-600 focus:text-white">
                          Sí/No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <div className="flex items-center gap-2">
                      <Label className="text-white text-sm">Obligatoria</Label>
                      <Switch
                        checked={question.required}
                        onCheckedChange={(checked) => updateCustomQuestion(question.id, { required: checked })}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                  </div>
                </div>

                {(question.type === "select" || question.type === "radio" || question.type === "checkbox") && (
                  <div className="mt-4">
                    <Label className="text-white text-sm mb-2 block">Opciones (separadas por comas)</Label>
                    <Input
                      value={question.options?.join(", ") || ""}
                      onChange={(e) =>
                        updateCustomQuestion(question.id, {
                          options: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Opción 1, Opción 2, Opción 3..."
                      className="bg-gray-600 border-gray-500"
                    />
                  </div>
                )}
              </div>
            ))}

            {customQuestions.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No hay preguntas específicas</p>
                <p className="text-sm">Haz clic en "Agregar Pregunta" para crear una</p>
              </div>
            )}
          </CardContent>
        </Card>
      )
    }

    if (currentStepData.component === "documents") {
      return (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-400 flex items-center gap-2 text-xl">
                <FileText className="w-6 h-6" />
                Documentos Requeridos
              </CardTitle>
              <Button onClick={addDocument} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Documento
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={doc.enabled}
                    onCheckedChange={(checked) => updateDocument(doc.id, { enabled: !!checked })}
                    className="border-green-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Input
                    value={doc.name}
                    onChange={(e) => updateDocument(doc.id, { name: e.target.value })}
                    className="bg-gray-600 border-gray-500 text-gray-100 flex-1"
                    disabled={!doc.enabled}
                  />
                  <div className="flex items-center gap-2">
                    <Label className="text-white text-sm">Obligatorio</Label>
                    <Switch
                      checked={doc.required}
                      onCheckedChange={(checked) => updateDocument(doc.id, { required: checked })}
                      disabled={!doc.enabled}
                      className="data-[state=checked]:bg-green-600"
                    />
                  </div>
                  <Button
                    onClick={() => removeDocument(doc.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )
    }

    if (currentStepData.component === "extra") {
      return (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-400 flex items-center gap-2 text-xl">
                <Info className="w-6 h-6" />
                Información Extra
              </CardTitle>
              <Button onClick={addExtraInfoRequest} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Solicitud
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {extraInfoRequests.map((request) => (
              <div key={request.id} className="bg-gray-700/30 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <Input
                    value={request.label}
                    onChange={(e) => updateExtraInfoRequest(request.id, { label: e.target.value })}
                    className="bg-gray-600 border-gray-500 text-gray-100 flex-1 mr-3"
                    placeholder="Solicitud de información..."
                    disabled={!request.enabled}
                  />
                  <Button
                    onClick={() => removeExtraInfoRequest(request.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={request.enabled}
                    onCheckedChange={(checked) => updateExtraInfoRequest(request.id, { enabled: !!checked })}
                    className="border-green-500 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />

                  <div className="flex-1">
                    <Label className="text-white text-sm mb-2 block">Tipo</Label>
                    <Select
                      value={request.type}
                      onValueChange={(value) =>
                        updateExtraInfoRequest(request.id, { type: value as ExtraInfoRequest["type"] })
                      }
                      disabled={!request.enabled}
                    >
                      <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="text" className="text-white focus:bg-gray-600 focus:text-white">
                          Texto
                        </SelectItem>
                        <SelectItem value="textarea" className="text-white focus:bg-gray-600 focus:text-white">
                          Texto largo
                        </SelectItem>
                        <SelectItem value="select" className="text-white focus:bg-gray-600 focus:text-white">
                          Selección
                        </SelectItem>
                        <SelectItem value="yesno" className="text-white focus:bg-gray-600 focus:text-white">
                          Sí/No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <div className="flex items-center gap-2">
                      <Label className="text-white text-sm">Obligatorio</Label>
                      <Switch
                        checked={request.required}
                        onCheckedChange={(checked) => updateExtraInfoRequest(request.id, { required: checked })}
                        disabled={!request.enabled}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                  </div>
                </div>

                {request.type === "select" && (
                  <div className="mt-4">
                    <Label className="text-white text-sm mb-2 block">Opciones (separadas por comas)</Label>
                    <Input
                      value={request.options?.join(", ") || ""}
                      onChange={(e) =>
                        updateExtraInfoRequest(request.id, {
                          options: e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="Opción 1, Opción 2..."
                      className="bg-gray-600 border-gray-500"
                      disabled={!request.enabled}
                    />
                  </div>
                )}
              </div>
            ))}

            {extraInfoRequests.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No hay solicitudes extra</p>
                <p className="text-sm">Haz clic en "Agregar Solicitud" para crear una</p>
              </div>
            )}
          </CardContent>
        </Card>
      )
    }

    return null
  }

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
              <Settings className="w-6 h-6 text-green-400" />
              Editor de Formulario de Alquiler
            </h1>
            <p className="text-gray-400 mt-1">Personaliza los campos y preguntas del formulario de solicitud</p>
          </div>
          <Button
            onClick={() => setShowPreview(true)}
            variant="outline"
            className="bg-green-600 text-white border-none"
          >
            <Eye className="w-4 h-4 mr-2" />
            Vista Previa
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(index)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    index === currentStep
                      ? "bg-green-600 text-white"
                      : index < currentStep
                        ? "bg-green-800 text-green-200"
                        : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                  }`}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : <span className="text-sm">{step.icon}</span>}
                  <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-2 ${
                      index < currentStep ? "bg-green-600" : "bg-gray-600"
                    } transition-colors`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[500px]">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="border-gray-600 text-black disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2 " />
            Anterior
          </Button>

          <div className="text-sm text-gray-400">
            Paso {currentStep + 1} de {steps.length}
          </div>

          {currentStep === steps.length - 1 ? (
            <Button className="bg-green-600 hover:bg-green-700">Guardar Configuración</Button>
          ) : (
            <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">
              Siguiente
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Modal de Vista Previa - Mantengo el mismo código anterior */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-xl flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Vista Previa del Formulario
            </DialogTitle>
            <p className="text-sm text-gray-400">Esto es lo que verán los solicitantes cuando accedan al formulario</p>
          </DialogHeader>

          <div className="space-y-6">
            {/* Secciones habilitadas */}
            {formSections
              .filter((section) => section.enabled)
              .map((section) => (
                <div key={section.id}>
                  <h4 className="font-semibold text-gray-200 mb-3">
                    {section.icon} {section.title}
                  </h4>
                  <div className="bg-gray-700/30 p-4 rounded-lg space-y-3">
                    {section.fields
                      .filter((field) => field.enabled)
                      .map((field) => (
                        <div key={field.id}>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            {field.label} {field.required && <span className="text-red-400">*</span>}
                          </label>

                          {field.type === "text" ||
                          field.type === "email" ||
                          field.type === "tel" ||
                          field.type === "number" ? (
                            <div className="h-8 bg-gray-600 rounded border border-gray-500"></div>
                          ) : field.type === "textarea" ? (
                            <div className="h-16 bg-gray-600 rounded border border-gray-500"></div>
                          ) : field.type === "select" ? (
                            <div className="h-8 bg-gray-600 rounded border border-gray-500 flex items-center px-2">
                              <span className="text-gray-400 text-xs">
                                {field.options?.length ? `Opciones: ${field.options.join(", ")}` : "Seleccionar..."}
                              </span>
                            </div>
                          ) : field.type === "radio" ? (
                            <div className="space-y-1">
                              {field.options?.map((option, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-gray-600 rounded-full border border-gray-500"></div>
                                  <span className="text-gray-300 text-sm">{option}</span>
                                </div>
                              ))}
                            </div>
                          ) : field.type === "yesno" ? (
                            <div className="flex gap-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-600 rounded-full border border-gray-500"></div>
                                <span className="text-gray-300 text-sm">Sí</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-600 rounded-full border border-gray-500"></div>
                                <span className="text-gray-300 text-sm">No</span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                  </div>
                </div>
              ))}

            {/* Preguntas específicas */}
            {customQuestions.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">❓ Preguntas Específicas</h4>
                <div className="space-y-4 bg-gray-700/30 p-4 rounded-lg">
                  {customQuestions.map((question, index) => (
                    <div key={question.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-300">
                          {index + 1}. {question.question}
                        </label>
                        {question.required && (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Obligatoria</Badge>
                        )}
                      </div>

                      {question.type === "text" && (
                        <div className="h-8 bg-gray-600 rounded border border-gray-500"></div>
                      )}

                      {question.type === "textarea" && (
                        <div className="h-16 bg-gray-600 rounded border border-gray-500"></div>
                      )}

                      {question.type === "select" && (
                        <div className="h-8 bg-gray-600 rounded border border-gray-500 flex items-center px-3">
                          <span className="text-gray-400 text-sm">
                            {question.options?.length ? `Opciones: ${question.options.join(", ")}` : "Seleccionar..."}
                          </span>
                        </div>
                      )}

                      {question.type === "yesno" && (
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-600 rounded-full border border-gray-500"></div>
                            <span className="text-gray-300 text-sm">Sí</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-600 rounded-full border border-gray-500"></div>
                            <span className="text-gray-300 text-sm">No</span>
                          </div>
                        </div>
                      )}

                      {(question.type === "radio" || question.type === "checkbox") && (
                        <div className="space-y-1">
                          {question.options?.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 bg-gray-600 border border-gray-500 ${
                                  question.type === "radio" ? "rounded-full" : "rounded"
                                }`}
                              ></div>
                              <span className="text-gray-300 text-sm">{option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Información Extra */}
            {extraInfoRequests.filter((req) => req.enabled).length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">ℹ️ Información Adicional</h4>
                <div className="bg-gray-700/30 p-4 rounded-lg space-y-3">
                  {extraInfoRequests
                    .filter((req) => req.enabled)
                    .map((request) => (
                      <div key={request.id}>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          {request.label} {request.required && <span className="text-red-400">*</span>}
                        </label>

                        {request.type === "text" && (
                          <div className="h-8 bg-gray-600 rounded border border-gray-500"></div>
                        )}

                        {request.type === "textarea" && (
                          <div className="h-16 bg-gray-600 rounded border border-gray-500"></div>
                        )}

                        {request.type === "select" && (
                          <div className="h-8 bg-gray-600 rounded border border-gray-500 flex items-center px-2">
                            <span className="text-gray-400 text-xs">
                              {request.options?.length ? `Opciones: ${request.options.join(", ")}` : "Seleccionar..."}
                            </span>
                          </div>
                        )}

                        {request.type === "yesno" && (
                          <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-600 rounded-full border border-gray-500"></div>
                              <span className="text-gray-300 text-sm">Sí</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-gray-600 rounded-full border border-gray-500"></div>
                              <span className="text-gray-300 text-sm">No</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Documentos */}
            {documents.filter((doc) => doc.enabled).length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">📎 Documentos Requeridos</h4>
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <div className="space-y-2">
                    {documents
                      .filter((doc) => doc.enabled)
                      .map((doc) => (
                        <div key={doc.id} className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-600 rounded border border-gray-500"></div>
                          <span className="text-gray-300 text-sm">
                            {doc.name}
                            {doc.required && <span className="text-red-400 ml-1">*</span>}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button variant="outline" onClick={() => setShowPreview(false)} className="border-gray-600 text-gray-300">
              Cerrar Vista Previa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

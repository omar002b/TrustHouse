"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, User, FileText, CreditCard } from "lucide-react"
import { FileUploadZone } from "./file-upload-zone"

interface CoTenant {
  id: string
  willPay: boolean
  personalInfo: {
    name: string
    lastName: string
    phone: string
    email: string
    birthDate: string
  }
  documents: {
    dni: File[]
    payslips: File[]
    workContract: File[]
    bankStatements: File[]
    otherDocuments: File[]
  }
  financialInfo?: {
    monthlyIncome: string
    jobTitle: string
    companyName: string
    workExperience: string
  }
}

export default function RentalInfoForm() {
  const [rentalType, setRentalType] = useState<string>("")
  const [coTenants, setCoTenants] = useState<CoTenant[]>([])

  const addCoTenant = () => {
    const newCoTenant: CoTenant = {
      id: Date.now().toString(),
      willPay: false,
      personalInfo: {
        name: "",
        lastName: "",
        phone: "",
        email: "",
        birthDate: "",
      },
      documents: {
        dni: [],
        payslips: [],
        workContract: [],
        bankStatements: [],
        otherDocuments: [],
      },
    }
    setCoTenants([...coTenants, newCoTenant])
  }

  const removeCoTenant = (id: string) => {
    setCoTenants(coTenants.filter((tenant) => tenant.id !== id))
  }

  const updateCoTenant = (id: string, field: string, value: any) => {
    setCoTenants(
      coTenants.map((tenant) => {
        if (tenant.id === id) {
          if (field.includes(".")) {
            const [parent, child] = field.split(".")
            return {
              ...tenant,
              [parent]: {
                ...tenant[parent as keyof CoTenant],
                [child]: value,
              },
            }
          }
          return { ...tenant, [field]: value }
        }
        return tenant
      }),
    )
  }

  const updateDocuments = (id: string, documentType: string, files: File[]) => {
    setCoTenants(
      coTenants.map((tenant) => {
        if (tenant.id === id) {
          return {
            ...tenant,
            documents: {
              ...tenant.documents,
              [documentType]: files,
            },
          }
        }
        return tenant
      }),
    )
  }

  const handlePaymentStatusChange = (id: string, willPay: boolean) => {
    setCoTenants(
      coTenants.map((tenant) => {
        if (tenant.id === id) {
          const updatedTenant = { ...tenant, willPay }
          if (willPay && !updatedTenant.financialInfo) {
            updatedTenant.financialInfo = {
              monthlyIncome: "",
              jobTitle: "",
              companyName: "",
              workExperience: "",
            }
          } else if (!willPay) {
            delete updatedTenant.financialInfo
          }
          return updatedTenant
        }
        return tenant
      }),
    )
  }

  return (
    <div className="border-none ">
 
      <div className="">
        {/* Tipo de alquiler */}
        <div>
          <Label className="block text-sm font-medium text-gray-300 mb-1">¿Cómo vas a alquilar la propiedad?</Label>
          <RadioGroup value={rentalType} onValueChange={setRentalType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="solo" id="solo" className="border-green-500 text-green-500" />
              <Label htmlFor="solo" className="text-gray-300">
                Solo/a
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compartido" id="compartido" className="border-green-500 text-green-500" />
              <Label htmlFor="compartido" className="text-gray-300">
                Con otras personas
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Sección de co-inquilinos */}
        {rentalType === "compartido" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-200">Personas adicionales</h4>
              <Button
                onClick={addCoTenant}
                variant="outline"
                size="sm"
                className="bg-green-700 border-green-600 text-green-100 hover:bg-green-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar persona
              </Button>
            </div>

            {coTenants.map((tenant, index) => (
              <Card key={tenant.id} className="bg-gray-700/30 border-gray-600">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-200">Persona {index + 1}</CardTitle>
                    <Button
                      onClick={() => removeCoTenant(tenant.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tipo de participación */}
                  <div>
                    <Label className="text-sm font-medium text-gray-300 mb-2 block">
                      ¿Esta persona contribuirá al pago del alquiler?
                    </Label>
                    <RadioGroup
                      value={tenant.willPay ? "si" : "no"}
                      onValueChange={(value) => handlePaymentStatusChange(tenant.id, value === "si")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="si"
                          id={`pay-${tenant.id}`}
                          className="border-green-500 text-green-500"
                        />
                        <Label htmlFor={`pay-${tenant.id}`} className="text-gray-300">
                          Sí, pagará parte del alquiler (co-inquilino)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="no"
                          id={`no-pay-${tenant.id}`}
                          className="border-green-500 text-green-500"
                        />
                        <Label htmlFor={`no-pay-${tenant.id}`} className="text-gray-300">
                          No, solo vivirá en la propiedad
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Información personal básica */}
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-200 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Datos Personales
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-sm text-gray-300">Nombre</Label>
                        <Input
                          value={tenant.personalInfo.name}
                          onChange={(e) => updateCoTenant(tenant.id, "personalInfo.name", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500"
                          placeholder="Nombre completo"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-300">Apellidos</Label>
                        <Input
                          value={tenant.personalInfo.lastName}
                          onChange={(e) => updateCoTenant(tenant.id, "personalInfo.lastName", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500"
                          placeholder="Apellidos"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-300">Teléfono</Label>
                        <Input
                          value={tenant.personalInfo.phone}
                          onChange={(e) => updateCoTenant(tenant.id, "personalInfo.phone", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500"
                          placeholder="+34 600 000 000"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-300">Email</Label>
                        <Input
                          type="email"
                          value={tenant.personalInfo.email}
                          onChange={(e) => updateCoTenant(tenant.id, "personalInfo.email", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500"
                          placeholder="email@ejemplo.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm text-gray-300">Fecha de nacimiento</Label>
                        <Input
                          type="date"
                          value={tenant.personalInfo.birthDate}
                          onChange={(e) => updateCoTenant(tenant.id, "personalInfo.birthDate", e.target.value)}
                          className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    {/* DNI/NIE Upload */}
                    <FileUploadZone
                      label="DNI/NIE"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onFilesChange={(files) => updateDocuments(tenant.id, "dni", files)}
                    />
                  </div>

                  {/* Información financiera (solo si va a pagar) */}
                  {tenant.willPay && tenant.financialInfo && (
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-200 mb-3 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Información Financiera
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label className="text-sm text-gray-300">Ingresos mensuales netos</Label>
                          <Input
                            value={tenant.financialInfo.monthlyIncome}
                            onChange={(e) => updateCoTenant(tenant.id, "financialInfo.monthlyIncome", e.target.value)}
                            className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500"
                            placeholder="€ 0,00"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-300">Puesto de trabajo</Label>
                          <Input
                            value={tenant.financialInfo.jobTitle}
                            onChange={(e) => updateCoTenant(tenant.id, "financialInfo.jobTitle", e.target.value)}
                            className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500"
                            placeholder="Desarrollador, Contador, etc."
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-300">Empresa</Label>
                          <Input
                            value={tenant.financialInfo.companyName}
                            onChange={(e) => updateCoTenant(tenant.id, "financialInfo.companyName", e.target.value)}
                            className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500"
                            placeholder="Nombre de la empresa"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-300">Experiencia laboral</Label>
                          <Select
                            value={tenant.financialInfo.workExperience}
                            onValueChange={(value) => updateCoTenant(tenant.id, "financialInfo.workExperience", value)}
                          >
                            <SelectTrigger className="bg-gray-600 border-gray-500 text-gray-100 focus:border-green-500 focus:ring-green-500">
                              <SelectValue placeholder="Selecciona..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="menos-1">Menos de 1 año</SelectItem>
                              <SelectItem value="1-3">1-3 años</SelectItem>
                              <SelectItem value="3-5">3-5 años</SelectItem>
                              <SelectItem value="5-10">5-10 años</SelectItem>
                              <SelectItem value="mas-10">Más de 10 años</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Documentos financieros */}
                      <div className="space-y-4">
                        <FileUploadZone
                          label="Nóminas (últimos 3 meses)"
                          accept=".pdf,.jpg,.jpeg,.png"
                          multiple={true}
                          onFilesChange={(files) => updateDocuments(tenant.id, "payslips", files)}
                        />

                        <FileUploadZone
                          label="Contrato de trabajo"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onFilesChange={(files) => updateDocuments(tenant.id, "workContract", files)}
                        />

                        <FileUploadZone
                          label="Extractos bancarios"
                          accept=".pdf,.jpg,.jpeg,.png"
                          multiple={true}
                          onFilesChange={(files) => updateDocuments(tenant.id, "bankStatements", files)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Documentos adicionales */}
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-200 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Otros Documentos
                    </h5>
                    <FileUploadZone
                      label="Documentos adicionales"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      multiple={true}
                      onFilesChange={(files) => updateDocuments(tenant.id, "otherDocuments", files)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            {coTenants.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No hay personas adicionales agregadas</p>
                <p className="text-sm">Haz clic en "Agregar persona" para comenzar</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Property } from "@/types"

interface Props {
  isOpen: boolean
  onClose: () => void
  properties: Property[]
  onSave: (applicationData: any) => void
}

export function AddApplicationModal({ isOpen, onClose, properties, onSave }: Props) {
  const [formData, setFormData] = useState({
    propertyId: "",
    name: "",
    email: "",
    phone: "",
    employment: "",
    income: 0,
    family: "",
    pets: false,
    smoker: false,
  })

  const handleSubmit = () => {
    if (!formData.propertyId || !formData.name || !formData.email || !formData.phone) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    const applicationData = {
      ...formData,
      propertyId: Number(formData.propertyId),
      applicant: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      score: Math.floor(Math.random() * 40) + 60, // Score aleatorio entre 60-100
      solvency: Math.floor(Math.random() * 30) + 70,
      history: Math.floor(Math.random() * 30) + 70,
      profile: Math.floor(Math.random() * 30) + 70,
      status: "pending",
      appliedDate: new Date().toISOString().split("T")[0],
      documents: ["DNI", "Nóminas"],
      customAnswers: {},
    }

    onSave(applicationData)
    onClose()

    // Reset form
    setFormData({
      propertyId: "",
      name: "",
      email: "",
      phone: "",
      employment: "",
      income: 0,
      family: "",
      pets: false,
      smoker: false,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-xl">Nueva Solicitud</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Propiedad *</Label>
            <Select
              value={formData.propertyId}
              onValueChange={(value) => setFormData({ ...formData, propertyId: value })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600 mt-1">
                <SelectValue placeholder="Selecciona una propiedad" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.title} - {property.price}€/mes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-800 border-gray-600 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-800 border-gray-600 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-800 border-gray-600 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="employment">Empleo</Label>
              <Input
                id="employment"
                value={formData.employment}
                onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                className="bg-gray-800 border-gray-600 mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="income">Ingresos mensuales (€)</Label>
              <Input
                id="income"
                type="number"
                value={formData.income}
                onChange={(e) => setFormData({ ...formData, income: Number(e.target.value) })}
                className="bg-gray-800 border-gray-600 mt-1"
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="family">Situación familiar</Label>
              <Input
                id="family"
                value={formData.family}
                onChange={(e) => setFormData({ ...formData, family: e.target.value })}
                className="bg-gray-800 border-gray-600 mt-1"
                placeholder="Ej: Soltero, Pareja, Familia con hijos"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>¿Tiene mascotas?</Label>
              <Switch
                checked={formData.pets}
                onCheckedChange={(checked) => setFormData({ ...formData, pets: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>¿Es fumador?</Label>
              <Switch
                checked={formData.smoker}
                onCheckedChange={(checked) => setFormData({ ...formData, smoker: checked })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Crear Solicitud
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

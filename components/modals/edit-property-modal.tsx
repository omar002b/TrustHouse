"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import type { Property, PropertyFormData } from "@/types"
import { updateProperty } from "@/utils/supabase"
import { deleteProperty } from "@/utils/supabase"
import supabase from "@/lib/supabaseClient" // tu cliente supabase


interface Props {
  isOpen: boolean
  onClose: () => void
  property: Property | null
  onSave: (id: string, property: PropertyFormData) => void
}

export function EditPropertyModal({ isOpen, onClose, property, onSave }: Props) {
  const [formData, setFormData] = useState<PropertyFormData>({
    id: property?.id,
    title: "",
    price: 0,
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    description: "",
    images: [""],
    customQuestions: [],
  })

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        price: property.price,
        address: property.address,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        description: property.description,
        images: property.images.length > 0 ? property.images : [""],
        customQuestions: property.customQuestions || [],
      })
    }
  }, [property])

  const handleDelete = async () => {
    if (!property) return

    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar esta propiedad? Esta acción no se puede deshacer."
    )
    if (!confirmDelete) return

    const { error } = await deleteProperty({ id: String(property.id) });

    if (error) {
      alert("Error al eliminar la propiedad: " + error.message)
      return
    }
    

    onClose()
  }

  const handleSubmit = async () => {
    if (!property || !formData.title || !formData.address || formData.price <= 0) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    const propertyData = {
      id: String(property.id),
      title: formData.title,
      price: formData.price,
      address: formData.address,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      area: formData.area,
      description: formData.description,
      images: formData.images,
      custom_questions: formData.customQuestions as any,
    }

    const { data, error } = await updateProperty(propertyData)
    if (error) {
      alert("Error al actualizar la propiedad: " + error.message)
      return
    }

    onSave(String(property.id), formData)
    onClose()
  }

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    })
  }

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  if (!property) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-xl">Editar Propiedad</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-gray-800 border-gray-600 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="price">Precio (€/mes) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="bg-gray-800 border-gray-600 mt-1"
                min="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Dirección *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-gray-800 border-gray-600 mt-1"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Habitaciones</Label>
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
              <Label htmlFor="area">Área (m²)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                className="bg-gray-800 border-gray-600 mt-1"
                min="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-800 border-gray-600 mt-1"
              rows={4}
            />
          </div>

          {/* Imágenes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Imágenes</Label>
              <Button size="sm" onClick={addImage} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-1" />
                Añadir
              </Button>
            </div>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    className="bg-gray-800 border-gray-600"
                    placeholder="URL de la imagen"
                  />
                  {formData.images.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeImage(index)}
                      className="border-gray-600 text-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          {/* Botón eliminar a la izquierda */}
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </Button>

          {/* Botones cancelar y guardar a la derecha */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="border-gray-600 text-black">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

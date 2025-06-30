"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageCarousel } from "@/components/common/ImageCarousel"
import { MapPin, Euro, Bed, Bath, Square, Users, Calendar, Link, FileText, Copy, ExternalLink } from "lucide-react"
import { getStatusColor } from "@/utils/helpers"
import type { Property } from "@/types"
import RentalInfoForm from "./rental-info-form"

interface Props {
  isOpen: boolean
  onClose: () => void
  property: Property | null
  onEdit: (id: string) => void
}

export function PropertyDetailsModal({ isOpen, onClose, property, onEdit }: Props) {
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  if (!property) return null

  const copyPublicLink = () => {
    const link = `${window.location.origin}/property/${property.publicLink}`
    navigator.clipboard.writeText(link)
    alert("Enlace copiado al portapapeles")
  }

  const copyApplicationFormLink = () => {
    const link = `${window.location.origin}/apply/${property.publicLink}`
    navigator.clipboard.writeText(link)
    alert("Enlace del formulario copiado al portapapeles")
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-xl flex items-center justify-between">
              <span>{property.title}</span>
              <Badge className={getStatusColor(property.status)}>
                {property.status === "available" && "Disponible"}
                {property.status === "pending" && "Pendiente"}
                {property.status === "rented" && "Alquilado"}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Carrusel de imágenes */}
            <ImageCarousel images={property.images} title={property.title} />

            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Información General</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span>{property.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-green-400 text-2xl font-bold">
                    <Euro className="h-6 w-6" />
                    <span>{property.price}€/mes</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Bed className="h-5 w-5 text-green-400" />
                      <span className="text-sm text-gray-400">Habitaciones</span>
                      <span className="font-semibold text-white">{property.bedrooms}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Bath className="h-5 w-5 text-green-400" />
                      <span className="text-sm text-gray-400">Baños</span>
                      <span className="font-semibold text-white">{property.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Square className="h-5 w-5 text-green-400" />
                      <span className="text-sm text-gray-400">Área</span>
                      <span className="font-semibold text-white">{property.area}m²</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">Solicitudes</span>
                    </div>
                    <span className="font-semibold text-blue-400">{property.applications}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">Visitas</span>
                    </div>
                    <span className="font-semibold text-purple-400">{property.viewings}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-700 space-y-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyPublicLink}
                      className="w-full border-gray-600 text-black"
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Copiar Enlace Público
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => setShowApplicationForm(true)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Formulario de Solicitud
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Descripción */}
            {property.description && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Preguntas personalizadas */}
            {property.customQuestions && property.customQuestions.length > 0 && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Preguntas Personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {property.customQuestions.map((question, index) => (
                      <div key={question.id} className="bg-gray-700 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-200">{question.question}</span>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-white text-xs">
                              {question.type}
                            </Badge>
                            {question.required && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                Obligatoria
                              </Badge>
                            )}
                          </div>
                        </div>
                        {question.options && question.options.length > 0 && (
                          <p className="text-sm text-gray-400">Opciones: {question.options.join(", ")}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-800">
              Cerrar
            </Button>
            <Button onClick={() => onEdit(String(property.id))} className="bg-green-600 hover:bg-green-700">
              Editar Propiedad
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal del Formulario de Solicitud */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-xl flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Formulario de Solicitud - {property.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Información de la propiedad */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Información de la Propiedad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-100 text-lg">{property.title}</h3>
                    <p className="text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {property.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{property.price}€/mes</div>
                    <p className="text-sm text-gray-400">
                      {property.bedrooms} hab • {property.bathrooms} baños • {property.area}m²
                    </p>
                  </div>
                </div>
                {property.description && (
                  <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                    <p className="text-gray-300 text-sm">{property.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vista previa del formulario */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Vista Previa del Formulario</CardTitle>
                <p className="text-sm text-gray-400">
                  Esto es lo que verán los solicitantes cuando accedan al formulario
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Información personal básica */}
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">📋 Información Personal</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-700/30 p-4 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Nombre completo *</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Teléfono *</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Edad</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                  </div>
                </div>

                {/* Información laboral */}
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">💼 Información Laboral</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-700/30 p-4 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Ocupación *</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Ingresos mensuales (€) *</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de contrato</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Empresa</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                  </div>
                </div>
                {/* Información personal adicional */}
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">🏠 Información del Hogar</h4>
                  <div className="bg-gray-700/30 p-4 rounded-lg space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Situación familiar</label>
                      <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                    </div>
                    <RentalInfoForm />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-600 rounded border border-gray-500"></div>
                        <span className="text-gray-300">¿Tienes mascotas?</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-600 rounded border border-gray-500"></div>
                        <span className="text-gray-300">¿Eres fumador/a?</span>
                      </div>
                    </div>
                  </div>
                </div>

                
                {/* Preguntas personalizadas */}
                {property.customQuestions && property.customQuestions.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-3">❓ Preguntas Específicas</h4>
                    <div className="space-y-4 bg-gray-700/30 p-4 rounded-lg">
                      {property.customQuestions.map((question, index) => (
                        <div key={question.id}>
                          <div className="flex items-center gap-2 mb-2">
                            <label className="block text-sm font-medium text-gray-300">
                              {index + 1}. {question.question}
                            </label>
                            {question.required && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                Obligatoria
                              </Badge>
                            )}
                          </div>

                          {question.type === "text" && (
                            <div className="h-10 bg-gray-600 rounded border border-gray-500"></div>
                          )}

                          {question.type === "textarea" && (
                            <div className="h-20 bg-gray-600 rounded border border-gray-500"></div>
                          )}

                          {question.type === "select" && (
                            <div className="h-10 bg-gray-600 rounded border border-gray-500 flex items-center px-3">
                              <span className="text-gray-400 text-sm">Opciones: {question.options?.join(", ")}</span>
                            </div>
                          )}

                          {question.type === "yesno" && (
                            <div className="flex gap-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-gray-600 rounded-full border border-gray-500"></div>
                                <span className="text-gray-300 text-sm">Sí</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-gray-600 rounded-full border border-gray-500"></div>
                                <span className="text-gray-300 text-sm">No</span>
                              </div>
                            </div>
                          )}

                          {(question.type === "radio" || question.type === "checkbox") && (
                            <div className="space-y-2">
                              {question.options?.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center space-x-2">
                                  <div
                                    className={`w-4 h-4 bg-gray-600 border border-gray-500 ${
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

                {/* Documentos requeridos */}
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">📎 Documentos Requeridos</h4>
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "DNI o NIE",
                        "Últimas 3 nóminas",
                        "Contrato de trabajo",
                        "Declaración de la renta",
                        "Justificante de ingresos",
                        "Referencias de anteriores alquileres",
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gray-600 rounded border border-gray-500"></div>
                          <span className="text-gray-300 text-sm">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enlace para compartir */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Compartir Formulario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Enlace del formulario de solicitud:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-gray-800 p-2 rounded text-green-400 text-sm break-all">
                      {window.location.origin}/apply/{property.publicLink}
                    </code>
                    <Button size="sm" onClick={copyApplicationFormLink} className="bg-green-600 hover:bg-green-700">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`/apply/${property.publicLink}`, "_blank")}
                    className="border-gray-600 text-black "
                  >
                    <ExternalLink className="h-4 w-4 mr-2 " />
                    Abrir Formulario
                  </Button>
                  <Button size="sm" onClick={copyApplicationFormLink} className="bg-green-600 hover:bg-green-700">
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Enlace
                  </Button>
                </div>

                <div className="text-xs text-gray-400 bg-gray-700/50 p-3 rounded">
                  <p className="font-medium mb-1">💡 Cómo usar este formulario:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Comparte este enlace con posibles inquilinos</li>
                    <li>• Los solicitantes completarán toda la información requerida</li>
                    <li>• Recibirás las solicitudes en tu panel de gestión</li>
                    <li>• Podrás revisar y aprobar/rechazar cada solicitud</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={() => setShowApplicationForm(false)}
              className="border-gray-600 text-black"
            >
              Cerrar
            </Button>
            <Button onClick={copyApplicationFormLink} className="bg-green-600 hover:bg-green-700">
              <Copy className="h-4 w-4 mr-2" />
              Copiar Enlace del Formulario
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

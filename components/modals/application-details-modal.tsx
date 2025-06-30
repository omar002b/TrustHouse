"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Star, User, FileText, AlertTriangle } from "lucide-react"
import { getScoreColor, getProgressColor } from "@/utils/helpers"
import type { Application, Property, AutoRejectSettings } from "@/types"

interface Props {
  isOpen: boolean
  onClose: () => void
  application: Application
  property?: Property
  autoRejectSettings: AutoRejectSettings
  onApprove: (id: number) => void
  onReject: (id: number) => void
}

export function ApplicationDetailsModal({
  isOpen,
  onClose,
  application,
  property,
  autoRejectSettings,
  onApprove,
  onReject,
}: Props) {
  if (!application) return null

  const autoReject =
    autoRejectSettings.enabled &&
    (application.score < autoRejectSettings.minimumScore ||
      application.income < autoRejectSettings.minimumIncome ||
      (application.pets && !autoRejectSettings.allowPets) ||
      (application.smoker && !autoRejectSettings.allowSmokers))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto text-gray-100">
        <div className="max-h-[80vh] overflow-y-auto pr-2 space-y-4"></div>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-400 text-lg">
            <FileText className="h-5 w-5" />
            Detalles de Solicitud
          </DialogTitle>
        </DialogHeader>

        {autoReject && (
          <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-sm text-red-300">Esta solicitud incumple los criterios de rechazo automático</span>
          </div>
        )}

        {/* Información del solicitante */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Solicitante
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={application.applicant.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-green-500/20 text-green-400 text-lg">
                  {application.applicant.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-gray-100">{application.applicant.name}</h3>
                <p className="text-gray-300">{application.employment}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {application.applicant.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {application.applicant.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-gray-400 text-sm">Ingresos:</span>
                <p className="font-semibold text-green-400">{application.income.toLocaleString()}€/mes</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Familia:</span>
                <p className="text-gray-200">{application.family}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Mascotas:</span>
                <p className={application.pets ? "text-yellow-400" : "text-green-400"}>
                  {application.pets ? "Sí" : "No"}
                </p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Fumador:</span>
                <p className={application.smoker ? "text-red-400" : "text-green-400"}>
                  {application.smoker ? "Sí" : "No"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Puntuaciones */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Evaluación y Puntuaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(application.score)} mb-2`}>
                    {application.score}
                  </div>
                  <p className="text-gray-400">Puntuación Total</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Solvencia</span>
                    <span className={getScoreColor(application.solvency)}>{application.solvency}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getProgressColor(application.solvency)}`}
                      style={{ width: `${application.solvency}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Historial</span>
                    <span className={getScoreColor(application.history)}>{application.history}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getProgressColor(application.history)}`}
                      style={{ width: `${application.history}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Perfil</span>
                    <span className={getScoreColor(application.profile)}>{application.profile}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getProgressColor(application.profile)}`}
                      style={{ width: `${application.profile}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Datos work*/}
        <Card className="bg-gray-800 border-gray-700 mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              Información Laboral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Ocupación:</span>
                <p className="text-white font-medium"></p>
              </div>
              <div>
                <span className="text-gray-400">Tipo de contrato:</span>
                <p className="text-white font-medium"></p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400 flex items-center gap-1">

                  Ingresos mensuales:
                </span>
                <p className="text-white font-medium">€</p>
              </div>
              <div>
                <span className="text-gray-400 flex items-center gap-1">

                  Empresa:
                </span>
                <p className="text-white font-medium"></p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Datos Life*/}
        <Card className="bg-gray-800 border-gray-700 mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              Informacion Familiar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Estado civil:</span>
                <p className="text-white font-medium"></p>
              </div>
              <div>
                <span className="text-gray-400">Número de personas que vivirán en el piso:</span>
                <p className="text-white font-medium"></p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400 flex items-center gap-1">
                  Duración estimada del alquiler:
                </span>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Respuestas a preguntas personalizadas */}
        {property?.customQuestions?.length ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-400">Respuestas Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {property.customQuestions.map((question) => {
                  const answer = application.customAnswers[question.id]
                  if (!answer) return null

                  return (
                    <div key={question.id} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-gray-200 font-bold">{question.question}</span>
                        {question.scoringImpact !== "neutral"}
                      </div>
                      <p className="text-gray-300">{answer}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ) : null}



        {/* Documentación */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400">Documentación Adjunta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {application.documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg">
                  <FileText className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-200">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2 pt-4">
          <Button size="sm" variant="outline" onClick={onClose} className="border-gray-600 text-black">
            Cerrar
          </Button>
          <Button size="sm" onClick={() => onReject(application.id)} className="bg-red-600 hover:bg-red-700">
            Rechazar
          </Button>
          <Button size="sm" onClick={() => onApprove(application.id)} className="bg-green-600 hover:bg-green-700">
            Aprobar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

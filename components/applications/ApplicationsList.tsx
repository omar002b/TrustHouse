"use client"

import { useState } from "react"
import { Search, Settings, Plus, Eye, X, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getStatusColor, getScoreColor, getProgressColor } from "@/utils/helpers"
import type { Application, Property, AutoRejectSettings } from "@/types"

interface ApplicationsListProps {
  applications: Application[]
  properties: Property[]
  autoRejectSettings: AutoRejectSettings
  onViewDetails: (id: number) => void
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onOpenSettings: () => void
  onAddApplication: () => void
}

export const ApplicationsList = ({
  applications,
  properties,
  autoRejectSettings,
  onViewDetails,
  onApprove,
  onReject,
  onOpenSettings,
  onAddApplication,
}: ApplicationsListProps) => {
  const [sortBy, setSortBy] = useState("score")
  const [filterStatus, setFilterStatus] = useState("all")

  const checkAutoReject = (application: Application) => {
    if (!autoRejectSettings.enabled) return false
    if (application.score < autoRejectSettings.minimumScore) return true
    if (application.income < autoRejectSettings.minimumIncome) return true
    if (application.pets && !autoRejectSettings.allowPets) return true
    if (application.smoker && !autoRejectSettings.allowSmokers) return true
    return false
  }

  const filteredApplications = applications
    .filter((app) => filterStatus === "all" || app.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score
      if (sortBy === "date") return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      if (sortBy === "income") return b.income - a.income
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Solicitudes</h2>
        <div className="flex gap-2">
          <Button
            onClick={onOpenSettings}
            variant="outline"
            className="border-gray-600 text-black"
          >
            <Settings className="h-4 w-4 mr-2" />
            Rechazo Automático
          </Button>
          <Button onClick={onAddApplication} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Solicitud
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar solicitudes..."
              className="pl-10 bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600 text-gray-100">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="approved">Aprobadas</SelectItem>
              <SelectItem value="reviewing">En revisión</SelectItem>
              <SelectItem value="rejected">Rechazadas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-gray-100">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-600">
            <SelectItem value="score">Mejor puntuación</SelectItem>
            <SelectItem value="date">Fecha más reciente</SelectItem>
            <SelectItem value="income">Mayor ingreso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => {
          const property = properties.find((p) => p.id === application.propertyId)
          const shouldAutoReject = checkAutoReject(application)

          return (
            <Card
              key={application.id}
              className={`bg-gray-900 border-gray-700 hover:border-green-500/30 transition-colors ${
                shouldAutoReject ? "ring-1 ring-red-500/30" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={application.applicant.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-green-500/20 text-green-400">
                        {application.applicant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-100">{application.applicant.name}</h3>
                      <p className="text-gray-300">{application.employment}</p>
                      <p className="text-sm text-gray-400">{property?.title}</p>
                    </div>
                    {shouldAutoReject && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Auto-rechazo
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(application.score)}`}>
                        {application.score}
                      </div>
                      <p className="text-xs text-gray-400">Puntuación</p>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status === "pending" && "Pendiente"}
                      {application.status === "approved" && "Aprobada"}
                      {application.status === "reviewing" && "En revisión"}
                      {application.status === "rejected" && "Rechazada"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm text-gray-400">
                    <span>
                      Ingresos:{" "}
                      <span className="text-green-400 font-semibold">{application.income.toLocaleString()}€</span>
                    </span>
                    <span>Familia: {application.family}</span>
                    <span>
                      Mascotas:{" "}
                      <span className={application.pets ? "text-yellow-400" : "text-green-400"}>
                        {application.pets ? "Sí" : "No"}
                      </span>
                    </span>
                    <span>
                      Fumador:{" "}
                      <span className={application.smoker ? "text-red-400" : "text-green-400"}>
                        {application.smoker ? "Sí" : "No"}
                      </span>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(application.id)}
                      className="border-gray-600 text-black "
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                    {application.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => onReject(application.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Rechazar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onApprove(application.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Aprobar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

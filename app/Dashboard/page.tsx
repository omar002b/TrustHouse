"use client"

import { useState } from "react"
import { Sidebar } from "@/components/common/Sidebar"
import { Dashboard } from "@/components/dashboard/Dashboard"
import { ApplicationsList } from "@/components/applications/ApplicationsList"
import { PropertiesList } from "@/components/properties/PropertiesList"
import { ViewingsList } from "@/components/viewings/ViewingsList"
import { ModalsContainer } from "@/components/modals/modals-container"
import { useRentalData } from "@/hooks/useRentalData"

export default function RentalDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const {
    properties,
    applications,
    viewings,
    stats,
    autoRejectSettings,
    setAutoRejectSettings,
    selectedApplicationDetails,
    setSelectedApplicationDetails,
    isApplicationResponseOpen,
    setIsApplicationResponseOpen,
    applicationResponse,
    setApplicationResponse,
    isAutoRejectSettingsOpen,
    setIsAutoRejectSettingsOpen,
    isAddPropertyOpen,
    setIsAddPropertyOpen,
    isEditPropertyOpen,
    setIsEditPropertyOpen,
    editingPropertyId,
    setEditingPropertyId,
    isApplicationFormOpen,
    setIsApplicationFormOpen,
    selectedPropertyDetails,
    setSelectedPropertyDetails,
    handleSaveProperty,
    handleSaveEditProperty,
    handleSaveApplication,
    openEditPropertyModal,
  } = useRentalData()

  // Handlers para acciones
  const handleViewApplicationDetails = (id: number) => {
    setSelectedApplicationDetails(id)
  }

  const handleApproveApplication = (id: number) => {
    setApplicationResponse({
      applicationId: id,
      status: "approved",
      message: "Su solicitud ha sido aprobada. Nos pondremos en contacto para programar una visita.",
      scheduledDate: "",
      scheduledTime: "",
    })
    setIsApplicationResponseOpen(true)
  }

  const handleRejectApplication = (id: number) => {
    setApplicationResponse({
      applicationId: id,
      status: "rejected",
      message: "Lamentamos informarle que su solicitud no cumple con nuestros criterios actuales.",
      scheduledDate: "",
      scheduledTime: "",
    })
    setIsApplicationResponseOpen(true)
  }

  const handleOpenAutoRejectSettings = () => {
    setIsAutoRejectSettingsOpen(true)
  }

  const handleAddApplication = () => {
    setIsApplicationFormOpen(true)
  }

  const handleAddProperty = () => {
    setIsAddPropertyOpen(true)
  }

  const handleEditProperty = (id: string) => {
    console.log('handleEditProperty called with id:', id)
    openEditPropertyModal(id)
  }

  const handleViewPropertyDetails = (id: string) => {
    console.log('handleViewPropertyDetails called with id:', id)
    setSelectedPropertyDetails(id)
  }

  const handleAddViewing = () => {
    console.log("Programar nueva visita")
    // TODO: Implementar modal de nueva visita
  }

  const handleSubmitApplicationResponse = () => {
    alert(`Solicitud ${applicationResponse.status === "approved" ? "aprobada" : "rechazada"} exitosamente!`)
    setIsApplicationResponseOpen(false)
    setApplicationResponse({
      applicationId: 0,
      status: "approved",
      message: "",
      scheduledDate: "",
      scheduledTime: "",
    })
  }

  const handleSaveAutoRejectSettings = () => {
    alert("Configuración guardada exitosamente!")
    setIsAutoRejectSettingsOpen(false)
  }

  const renderContent = () => {
    console.log('renderContent, activeSection:', activeSection)
    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard
            totalApplications={stats.totalApplications}
            pendingApplications={stats.pendingApplications}
            approvedApplications={stats.approvedApplications}
            averageScore={stats.averageScore}
            applications={applications}
            properties={properties}
          />
        )
      case "applications":
        return (
          <ApplicationsList
            applications={applications}
            properties={properties}
            autoRejectSettings={autoRejectSettings}
            onViewDetails={handleViewApplicationDetails}
            onApprove={handleApproveApplication}
            onReject={handleRejectApplication}
            onOpenSettings={handleOpenAutoRejectSettings}
            onAddApplication={handleAddApplication}
          />
        )
      case "properties":
        return (
          <PropertiesList
            properties={properties}
            onAddProperty={handleAddProperty}
            onEditProperty={handleEditProperty}
            onViewDetails={handleViewPropertyDetails}
          />
        )
      case "viewings":
        return <ViewingsList viewings={viewings} properties={properties} onAddViewing={handleAddViewing} />
      default:
        return <div className="text-gray-100">Sección no encontrada</div>
    }
  }

  return (
    <div className="flex h-screen bg-gray-800 text-gray-200">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>

      <ModalsContainer
        // Application modals
        selectedApplicationDetails={selectedApplicationDetails}
        applications={applications}
        properties={properties}
        autoRejectSettings={autoRejectSettings}
        onCloseApplicationDetails={() => setSelectedApplicationDetails(null)}
        onApproveFromDetails={handleApproveApplication}
        onRejectFromDetails={handleRejectApplication}
        isApplicationResponseOpen={isApplicationResponseOpen}
        applicationResponse={applicationResponse}
        setApplicationResponse={setApplicationResponse}
        onCloseApplicationResponse={() => setIsApplicationResponseOpen(false)}
        onSubmitApplicationResponse={handleSubmitApplicationResponse}
        isAutoRejectSettingsOpen={isAutoRejectSettingsOpen}
        setAutoRejectSettings={setAutoRejectSettings}
        onCloseAutoRejectSettings={() => setIsAutoRejectSettingsOpen(false)}
        onSaveAutoRejectSettings={handleSaveAutoRejectSettings}
        // Property modals
        isAddPropertyOpen={isAddPropertyOpen}
        onCloseAddProperty={() => setIsAddPropertyOpen(false)}
        onSaveProperty={handleSaveProperty}
        isEditPropertyOpen={isEditPropertyOpen}
        editingPropertyId={editingPropertyId}
        onCloseEditProperty={() => {
          setIsEditPropertyOpen(false)
          setEditingPropertyId(null)
        }}
        onSaveEditProperty={handleSaveEditProperty}
        selectedPropertyDetails={selectedPropertyDetails}
        onClosePropertyDetails={() => setSelectedPropertyDetails(null)}
        onEditFromDetails={handleEditProperty}
        // Application form modal
        isApplicationFormOpen={isApplicationFormOpen}
        onCloseApplicationForm={() => setIsApplicationFormOpen(false)}
        onSaveApplication={handleSaveApplication}
      />
    </div>
  )
}

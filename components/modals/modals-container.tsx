"use client"

import { ApplicationDetailsModal } from "./application-details-modal"
import { ApplicationResponseModal } from "./application-response-modal"
import { AutoRejectSettingsModal } from "./auto-reject-settings-modal"
import { AddPropertyModal } from "./add-property-modal"
import { EditPropertyModal } from "./edit-property-modal"
import { PropertyDetailsModal } from "./property-details-modal"
import { AddApplicationModal } from "./add-application-modal"
import type { Application, Property, AutoRejectSettings, ApplicationResponse, PropertyFormData } from "@/types"

interface Props {
  // Application modals
  selectedApplicationDetails: number | null
  applications: Application[]
  properties: Property[]
  autoRejectSettings: AutoRejectSettings
  onCloseApplicationDetails: () => void
  onApproveFromDetails: (id: number) => void
  onRejectFromDetails: (id: number) => void
  isApplicationResponseOpen: boolean
  applicationResponse: ApplicationResponse
  setApplicationResponse: (r: ApplicationResponse) => void
  onCloseApplicationResponse: () => void
  onSubmitApplicationResponse: () => void
  isAutoRejectSettingsOpen: boolean
  setAutoRejectSettings: (s: AutoRejectSettings) => void
  onCloseAutoRejectSettings: () => void
  onSaveAutoRejectSettings: () => void

  // Property modals
  isAddPropertyOpen: boolean
  onCloseAddProperty: () => void
  onSaveProperty: (property: PropertyFormData) => void
  isEditPropertyOpen: boolean
  editingPropertyId: string | null
  onCloseEditProperty: () => void
  onSaveEditProperty: (id: string, property: PropertyFormData) => void
  selectedPropertyDetails: string | null
  onClosePropertyDetails: () => void
  onEditFromDetails: (id: string) => void

  // Application form modal
  isApplicationFormOpen: boolean
  onCloseApplicationForm: () => void
  onSaveApplication: (application: any) => void
}

export function ModalsContainer({
  selectedApplicationDetails,
  applications,
  properties,
  autoRejectSettings,
  onCloseApplicationDetails,
  onApproveFromDetails,
  onRejectFromDetails,
  isApplicationResponseOpen,
  applicationResponse,
  setApplicationResponse,
  onCloseApplicationResponse,
  onSubmitApplicationResponse,
  isAutoRejectSettingsOpen,
  setAutoRejectSettings,
  onCloseAutoRejectSettings,
  onSaveAutoRejectSettings,
  isAddPropertyOpen,
  onCloseAddProperty,
  onSaveProperty,
  isEditPropertyOpen,
  editingPropertyId,
  onCloseEditProperty,
  onSaveEditProperty,
  selectedPropertyDetails,
  onClosePropertyDetails,
  onEditFromDetails,
  isApplicationFormOpen,
  onCloseApplicationForm,
  onSaveApplication,
}: Props) {
  const selectedApplication = applications.find((a) => a.id === selectedApplicationDetails)
  const editingProperty = properties.find((p) => String(p.id) === String(editingPropertyId))
  const selectedProperty = properties.find((p) => String(p.id) === String(selectedPropertyDetails))

  return (
    <>
      {selectedApplication && (
        <ApplicationDetailsModal
          isOpen
          onClose={onCloseApplicationDetails}
          application={selectedApplication}
          property={properties.find((p) => p.id === selectedApplication.propertyId)}
          autoRejectSettings={autoRejectSettings}
          onApprove={onApproveFromDetails}
          onReject={onRejectFromDetails}
        />
      )}

      <ApplicationResponseModal
        isOpen={isApplicationResponseOpen}
        onClose={onCloseApplicationResponse}
        applicationResponse={applicationResponse}
        setApplicationResponse={setApplicationResponse}
        onSubmit={onSubmitApplicationResponse}
      />

      <AutoRejectSettingsModal
        isOpen={isAutoRejectSettingsOpen}
        onClose={onCloseAutoRejectSettings}
        settings={autoRejectSettings}
        setSettings={setAutoRejectSettings}
        onSave={onSaveAutoRejectSettings}
      />

      <AddPropertyModal isOpen={isAddPropertyOpen} onClose={onCloseAddProperty} onSave={onSaveProperty} />

      <EditPropertyModal
        isOpen={isEditPropertyOpen}
        onClose={onCloseEditProperty}
        property={editingProperty || null}
        onSave={onSaveEditProperty}
      />

      <PropertyDetailsModal
        isOpen={selectedPropertyDetails !== null}
        onClose={onClosePropertyDetails}
        property={selectedProperty || null}
        onEdit={onEditFromDetails}
      />

      <AddApplicationModal
        isOpen={isApplicationFormOpen}
        onClose={onCloseApplicationForm}
        properties={properties}
        onSave={onSaveApplication}
      />
    </>
  )
}

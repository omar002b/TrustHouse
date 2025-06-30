"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ApplicationResponse } from "@/types"

interface Props {
  isOpen: boolean
  onClose: () => void
  applicationResponse: ApplicationResponse
  setApplicationResponse: (r: ApplicationResponse) => void
  onSubmit: () => void
}

export function ApplicationResponseModal({
  isOpen,
  onClose,
  applicationResponse,
  setApplicationResponse,
  onSubmit,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-lg text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-lg">
            {applicationResponse.status === "approved" ? "Aprobar solicitud" : "Rechazar solicitud"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="msg">Mensaje</Label>
            <Textarea
              id="msg"
              value={applicationResponse.message}
              onChange={(e) =>
                setApplicationResponse({
                  ...applicationResponse,
                  message: e.target.value,
                })
              }
              className="bg-gray-800 border-gray-600 mt-1"
              rows={4}
            />
          </div>

          {applicationResponse.status === "approved" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Fecha visita</Label>
                <Input
                  type="date"
                  value={applicationResponse.scheduledDate}
                  onChange={(e) =>
                    setApplicationResponse({
                      ...applicationResponse,
                      scheduledDate: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-600 mt-1"
                />
              </div>
              <div>
                <Label>Hora visita</Label>
                <Input
                  type="time"
                  value={applicationResponse.scheduledTime}
                  onChange={(e) =>
                    setApplicationResponse({
                      ...applicationResponse,
                      scheduledTime: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-600 mt-1"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-black" size="sm">
            Cancelar
          </Button>
          <Button size="sm" onClick={onSubmit}>
            Enviar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

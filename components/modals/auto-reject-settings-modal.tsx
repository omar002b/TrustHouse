"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"
import type { AutoRejectSettings } from "@/types"

interface Props {
  isOpen: boolean
  onClose: () => void
  settings: AutoRejectSettings
  setSettings: (s: AutoRejectSettings) => void
  onSave: () => void
}

export function AutoRejectSettingsModal({ isOpen, onClose, settings, setSettings, onSave }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-lg text-gray-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-400 text-lg">
            <Settings className="h-4 w-4" />
            Rechazo automático
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span>Habilitar rechazo automático</span>
            <Switch checked={settings.enabled} onCheckedChange={(c) => setSettings({ ...settings, enabled: c })} />
          </div>

          {settings.enabled && (
            <>
              <div>
                <Label>Puntuación mínima</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={settings.minimumScore}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      minimumScore: Number(e.target.value),
                    })
                  }
                  className="bg-gray-800 border-gray-600 mt-1"
                />
              </div>
              <div>
                <Label>Ingresos mínimos (€ / mes)</Label>
                <Input
                  type="number"
                  min={0}
                  value={settings.minimumIncome}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      minimumIncome: Number(e.target.value),
                    })
                  }
                  className="bg-gray-800 border-gray-600 mt-1"
                />
              </div>
              <div className="flex justify-between items-center">
                <span>Permitir mascotas</span>
                <Switch
                  checked={settings.allowPets}
                  onCheckedChange={(c) => setSettings({ ...settings, allowPets: c })}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>Permitir fumadores</span>
                <Switch
                  checked={settings.allowSmokers}
                  onCheckedChange={(c) => setSettings({ ...settings, allowSmokers: c })}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" size="sm" onClick={onClose} className="border-gray-600 text-black">
            Cancelar
          </Button>
          <Button className="bg-green-500" size="sm" onClick={onSave}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

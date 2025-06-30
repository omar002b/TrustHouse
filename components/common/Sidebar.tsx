"use client"

import { Home, Users, Building, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "applications", label: "Solicitudes", icon: Users },
    { id: "properties", label: "Propiedades", icon: Building },
    { id: "viewings", label: "Visitas", icon: Calendar },
  ]

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-400">TrustHouse</h1>
        <p className="text-gray-400 text-sm">Panel de Gestión</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activeSection === item.id
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-800"
              }`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </div>
  )
}

import { Users, TrendingUp, Clock, Star, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardsProps {
  totalApplications: number
  pendingApplications: number
  approvedApplications: number
  averageScore: number
}

export const StatsCards = ({
  totalApplications,
  pendingApplications,
  approvedApplications,
  averageScore,
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Total Solicitudes</CardTitle>
          <div className="p-2 bg-green-500/20 rounded-full">
            <Users className="h-5 w-5 text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-400 mb-1">{totalApplications}</div>
          <div className="flex items-center text-xs">
            <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
            <span className="text-green-400">+12%</span>
            <span className="text-gray-400 ml-1">desde el mes pasado</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Pendientes</CardTitle>
          <div className="p-2 bg-yellow-500/20 rounded-full">
            <Clock className="h-5 w-5 text-yellow-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-400 mb-1">{pendingApplications}</div>
          <p className="text-xs text-gray-400">Requieren revisión urgente</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Aprobadas</CardTitle>
          <div className="p-2 bg-green-500/20 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-400 mb-1">{approvedApplications}</div>
          <p className="text-xs text-gray-400">Listas para contrato</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-300">Puntuación Media</CardTitle>
          <div className="p-2 bg-blue-500/20 rounded-full">
            <Star className="h-5 w-5 text-blue-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-400 mb-1">{averageScore}</div>
          <p className="text-xs text-gray-400">Calidad de solicitudes</p>
        </CardContent>
      </Card>
    </div>
  )
}

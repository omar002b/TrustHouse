import { Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getStatusColor, getScoreColor } from "@/utils/helpers"
import type { Application, Property } from "@/types"

interface RecentApplicationsProps {
  applications: Application[]
  properties: Property[]
}

export const RecentApplications = ({ applications, properties }: RecentApplicationsProps) => {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100 flex items-center gap-2">
          <Users className="h-5 w-5 text-green-400" />
          Solicitudes Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.slice(0, 3).map((application) => {
            const property = properties.find((p) => p.id === application.propertyId)
            return (
              <div
                key={application.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-green-500/20">
                    <AvatarImage src={application.applicant.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-green-500/20 text-green-400 font-semibold">
                      {application.applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-100">{application.applicant.name}</h4>
                    <p className="text-sm text-gray-400">{property?.title}</p>
                    <p className="text-xs text-gray-500">{application.employment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(application.score)}`}>{application.score}</div>
                    <p className="text-xs text-gray-400">Puntuación</p>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status === "pending" && "Pendiente"}
                    {application.status === "approved" && "Aprobada"}
                    {application.status === "reviewing" && "En revisión"}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

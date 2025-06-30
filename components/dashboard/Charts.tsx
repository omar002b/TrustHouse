import { BarChart, PieChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

interface ChartsProps {
  approvedApplications: number
  pendingApplications: number
  totalApplications: number
}

export const Charts = ({ approvedApplications, pendingApplications, totalApplications }: ChartsProps) => {
  const chartData = [
    { name: "Ene", solicitudes: 12, aprobadas: 8 },
    { name: "Feb", solicitudes: 19, aprobadas: 13 },
    { name: "Mar", solicitudes: 15, aprobadas: 11 },
    { name: "Abr", solicitudes: 22, aprobadas: 16 },
    { name: "May", solicitudes: 18, aprobadas: 14 },
    { name: "Jun", solicitudes: 25, aprobadas: 19 },
  ]

  const pieData = [
    { name: "Aprobadas", value: approvedApplications, color: "#10b981" },
    { name: "Pendientes", value: pendingApplications, color: "#f59e0b" },
    {
      name: "Rechazadas",
      value: totalApplications - approvedApplications - pendingApplications,
      color: "#ef4444",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <BarChart className="h-5 w-5 text-green-400" />
            Tendencia de Solicitudes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
              />
              <Bar dataKey="solicitudes" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="aprobadas" fill="#34d399" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-green-400" />
            Estado de Solicitudes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F3F4F6",
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm text-gray-300">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

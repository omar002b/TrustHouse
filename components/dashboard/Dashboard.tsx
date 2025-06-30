import { StatsCards } from "./StatsCards"
import { Charts } from "./Charts"
import { RecentApplications } from "./RecentApplications"
import type { Property, Application } from "@/types"

interface DashboardProps {
  totalApplications: number
  pendingApplications: number
  approvedApplications: number
  averageScore: number
  applications: Application[]
  properties: Property[]
}

export const Dashboard = ({
  totalApplications,
  pendingApplications,
  approvedApplications,
  averageScore,
  applications,
  properties,
}: DashboardProps) => {
  return (
    <div className="space-y-6">
      <StatsCards
        totalApplications={totalApplications}
        pendingApplications={pendingApplications}
        approvedApplications={approvedApplications}
        averageScore={averageScore}
      />

      <Charts
        approvedApplications={approvedApplications}
        pendingApplications={pendingApplications}
        totalApplications={totalApplications}
      />

      <RecentApplications applications={applications} properties={properties} />
    </div>
  )
}

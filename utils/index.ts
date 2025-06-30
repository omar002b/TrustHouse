export const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "rented":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "approved":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "reviewing":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "scheduled":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "completed":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "cancelled":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "rejected":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export const getScoreColor = (score: number) => {
  if (score >= 90) return "text-emerald-400"
  if (score >= 80) return "text-green-400"
  if (score >= 70) return "text-lime-400"
  if (score >= 60) return "text-yellow-400"
  if (score >= 50) return "text-orange-400"
  return "text-red-400"
}

export const getProgressColor = (score: number) => {
  if (score >= 90) return "bg-emerald-500"
  if (score >= 80) return "bg-green-500"
  if (score >= 70) return "bg-lime-500"
  if (score >= 60) return "bg-yellow-500"
  if (score >= 50) return "bg-orange-500"
  return "bg-red-500"
}

export const generatePublicLink = (title: string) => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-") +
    "-" +
    Math.random().toString(36).substring(2, 8)
  )
}

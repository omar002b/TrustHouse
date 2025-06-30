"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Clock, Users, Sparkles } from "lucide-react"

export default function Component() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ satisfaction: 0, timeReduction: 0, activeUsers: 0 })

  useEffect(() => {
    setIsVisible(true)

    // Animate counters
    const animateCounter = (target: number, key: keyof typeof counts, suffix = "") => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, 30)
    }

    setTimeout(() => {
      animateCounter(95, "satisfaction")
      animateCounter(80, "timeReduction")
      animateCounter(10, "activeUsers")
    }, 500)
  }, [])

  return (
    <div>

      <div className="max-w-6xl mx-auto px-4 py-10 relative z-10">
        <div
          className={`bg-white/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-amber-200/50 shadow-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            background: "linear-gradient(135deg, rgba(255,251,235,0.6) 0%, rgba(254,243,199,0.4) 100%)",
            boxShadow: "0 25px 50px -12px rgba(180,83,9,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent mb-4">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl md:text-3xl font-bold">Résultats Exceptionnels</h2>
            </div>
            <p className="text-amber-800 text-lg">Des performances qui parlent d'elles-mêmes</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Satisfaction Rate */}
            <div
              className={`group text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50/90 to-yellow-50/90 border border-amber-200/60 hover:shadow-xl hover:scale-105 transition-all duration-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 group-hover:rotate-12 transition-transform duration-150">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-amber-700 to-orange-700 bg-clip-text text-transparent mb-2">
                {counts.satisfaction}%
              </div>
              <p className="text-amber-800 font-medium text-lg">Taux de Succès</p>
              <div className="w-full bg-amber-200/50 rounded-full h-2 mt-4">
                <div
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${counts.satisfaction}%` }}
                ></div>
              </div>
            </div>

            {/* Time Reduction */}
            <div
              className={`group text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50/90 to-amber-50/90 border border-orange-200/60 hover:shadow-xl hover:scale-105 transition-all duration-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl mb-4 group-hover:rotate-12 transition-transform duration-150">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-orange-700 to-yellow-700 bg-clip-text text-transparent mb-2">
                -{counts.timeReduction}%
              </div>
              <p className="text-amber-800 font-medium text-lg">Temps de sélection</p>
              <div className="w-full bg-orange-200/50 rounded-full h-2 mt-4">
                <div
                  className="bg-gradient-to-r from-orange-400 to-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${counts.timeReduction}%` }}
                ></div>
              </div>
            </div>

            {/* Active Users */}
            <div
              className={`group text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50/90 to-orange-50/90 border border-yellow-200/60 hover:shadow-xl hover:scale-105 transition-all duration-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl mb-4 group-hover:rotate-12 transition-transform duration-150">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-yellow-700 to-amber-700 bg-clip-text text-transparent mb-2">
                {counts.activeUsers}k+
              </div>
              <p className="text-amber-800 font-medium text-lg">Candidatures traitées</p>
              <div className="w-full bg-yellow-200/50 rounded-full h-2 mt-4">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

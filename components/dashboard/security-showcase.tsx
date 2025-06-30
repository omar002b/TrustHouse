"use client"

import { useState, useEffect } from "react"
import { Shield, Lock, Eye, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SecurityShowcase() {
  const [showProtected, setShowProtected] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto transition effect
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setShowProtected((prev) => !prev)
      }, 4000) // Change every 8 seconds

      return () => clearInterval(interval)
    }
  }, [isAutoPlaying])

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const toggleProtection = () => {
    setIsAutoPlaying(false)
    setShowProtected(!showProtected)
  }

  return (
    <section >
      <div className="">

        {/* Main showcase */}
        <div className="items-center">
          {/* Before/After Image Transition */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl">
                {/* Original Image */}
                <div className="relative">
                  <Image
                    src="/identity-card.jpeg"
                    alt="Documento original sin protección"
                    width={600} // Usa las dimensiones reales de tu imagen
                    height={400}
                    className="object-contain w-full h-auto rounded-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-red-500/90 text-white px-3 py-2 rounded-lg text-sm font-bold">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Sans Protections
                    </div>
                  </div>
                </div>

                {/* Protected Image */}
                <div
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-[6000ms] ease-out ${showProtected ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                >
                  <Image
                    src="/protected-document.jpeg"
                    alt="Documento protegido con encriptación"
                    width={600}
                    height={400}
                    className="object-contain w-full h-auto rounded-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-2 rounded-lg text-sm font-bold">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Protéger
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

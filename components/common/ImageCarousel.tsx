"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageCarouselProps {
  images: string[]
  title: string
}

export const ImageCarousel = ({ images, title }: ImageCarouselProps) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
      setIsTransitioning(false)
    }, 150)
  }

  const prevImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
      setIsTransitioning(false)
    }, 150)
  }

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentImage) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImage(index)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
      <div
        className={`flex transition-transform duration-300 ease-in-out h-full ${
          isTransitioning ? "opacity-75" : "opacity-100"
        }`}
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={image || "/placeholder.svg"}
              alt={`${title} - Imagen ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white transition-all duration-200 hover:scale-110"
            onClick={prevImage}
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white transition-all duration-200 hover:scale-110"
            onClick={nextImage}
            disabled={isTransitioning}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImage ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

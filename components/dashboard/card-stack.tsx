"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Euro, Calendar, Award, Code, Briefcase, Palette } from "lucide-react"

interface ProfileData {
  id: number
  name: string
  age: number
  profession: string
  monthlyIncome: number
  rentalExperience: number
  profileScore: number
  description: string
  imageUrl: string
  professionIcon: string
  colors: {
    primary: string
    gradient: string
  }
}

const baseProfiles: ProfileData[] = [
  {
    id: 1,
    name: "Marie Dubois",
    age: 28,
    profession: "Ingénieure Logiciel",
    monthlyIncome: 3500,
    rentalExperience: 5,
    profileScore: 95,
    description:
      "Professionnelle très responsable, avec un excellent historique de crédit et des références impeccables. Elle est reconnue pour sa fiabilité, sa discrétion et son sens aigu des responsabilités, des qualités qui inspirent confiance dans un environnement professionnel exigeant.",
    imageUrl:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    professionIcon: "code",
    colors: {
      primary: "#10B981",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    },
  },
  {
    id: 2,
    name: "Pierre Martin",
    age: 35,
    profession: "Architecte",
    monthlyIncome: 4200,
    rentalExperience: 8,
    profileScore: 88,
    description: "Architecte expérimenté avec une trajectoire professionnelle solide et reconnue, disposant d’excellentes références. Il se distingue par sa rigueur, son sens du détail et sa capacité à piloter des projets architecturaux complexes, alliant créativité et maîtrise technique.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    professionIcon: "briefcase",
    colors: {
      primary: "#3B82F6",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
    },
  },
  {
    id: 3,
    name: "Sophie Leroy",
    age: 24,
    profession: "Graphiste",
    monthlyIncome: 2800,
    rentalExperience: 2,
    profileScore: 72,
    description: "Jeune professionnelle créative, dotée d’un fort potentiel et d’une grande capacité d’adaptation. Sérieuse, engagée et curieuse, elle bénéficie également du soutien d’un cadre familial stable et encourageant, ce qui renforce sa fiabilité et sa motivation dans le milieu professionnel.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    professionIcon: "palette",
    colors: {
      primary: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    },
  },
]

export default function CardStack() {
  const [profiles, setProfiles] = useState<ProfileData[]>(baseProfiles)
  const [timeLeft, setTimeLeft] = useState(5000)
  const [currentIndex, setCurrentIndex] = useState(0)
  const TIMER_DURATION = 5000

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 50) {
          // Move to next profile
          setCurrentIndex((prevIndex) => (prevIndex + 1) % baseProfiles.length)
          return TIMER_DURATION
        }
        return prev - 50
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const removeProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % baseProfiles.length)
    setTimeLeft(TIMER_DURATION)
  }

  const getProfessionIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="h-4 w-4" />
      case "briefcase":
        return <Briefcase className="h-4 w-4" />
      case "palette":
        return <Palette className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getScoreText = (score: number) => {
    if (score >= 90) return "Très Bon"
    if (score >= 80) return "Excellent"
    if (score >= 70) return "Bon"
    return "Correct"
  }

  // Get current 3 profiles to display
  const displayProfiles = [
    baseProfiles[currentIndex],
    baseProfiles[(currentIndex + 1) % baseProfiles.length],
    baseProfiles[(currentIndex + 2) % baseProfiles.length],
  ]

  return (
    <div className="relative h-[480px] w-full max-w-sm mx-auto">
      <AnimatePresence>
        {displayProfiles.map((profile, index) => (
          <Card
            key={`${profile.id}-${currentIndex}-${index}`}
            profile={profile}
            index={index}
            removeProfile={removeProfile}
            getScoreText={getScoreText}
            getProfessionIcon={getProfessionIcon}
          />
        ))}
      </AnimatePresence>
      {/* Timer */}
      <div className="absolute top-4 right-4 z-50">
        <div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <svg className="absolute w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="12" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" fill="none" />
            <motion.circle
  initial={{ strokeDashoffset: 0.0001 }} // evita "0" directo
  animate={{ strokeDashoffset: 0.754 }}
  transition={{ duration: 1 }}
  style={{ strokeDasharray: 1 }} // necesario para que funcione strokeDashoffset
/>

          </svg>
          <span className="text-xs font-bold text-white">{Math.ceil(timeLeft / 1000)}</span>
        </div>
      </div>
    </div>
  )
}

interface CardProps {
  profile: ProfileData
  index: number
  removeProfile: () => void
  getScoreText: (score: number) => string
  getProfessionIcon: (iconName: string) => JSX.Element
}

function Card({ profile, index, removeProfile, getScoreText, getProfessionIcon }: CardProps) {
  const yOffset = index * 12
  const xOffset = index * 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{
        opacity: 1,
        y: yOffset,
        x: xOffset,
        scale: 1 - index * 0.02,
        rotateZ: index * -1,
      }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{
        zIndex: 3 - index,
        background: profile.colors.gradient,
        boxShadow: `0 ${8 + index * 4}px ${24 + index * 6}px rgba(0, 0, 0, 0.15)`,
      }}
      className="absolute left-0 top-0 h-full w-full cursor-grab overflow-hidden rounded-2xl"
      drag={index === 0}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (index === 0) {
          const distance = Math.sqrt(Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2))
          if (distance > 100) {
            removeProfile()
          }
        }
      }}
    >
      <div className="relative flex h-full flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="rounded-xl p-2 bg-white/15">{getProfessionIcon(profile.professionIcon)}</div>
            <span className="text-sm font-semibold">{profile.profession}</span>
          </div>
          <div className="rounded-xl px-3 py-1 text-sm font-bold bg-white/20">{profile.profileScore}</div>
        </div>

        {/* Profile */}
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-xl bg-cover bg-center border-2 border-white/20"
              style={{ backgroundImage: `url(${profile.imageUrl})` }}
            />
            <div>
              <h2 className="text-lg font-bold">{profile.name}</h2>
              <p className="text-sm opacity-90">{profile.age} ans</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/10">
              <div className="flex items-center gap-2">
                <Euro className="h-4 w-4" />
                <span className="text-sm">Revenus</span>
              </div>
              <span className="font-bold text-sm">{profile.monthlyIncome.toLocaleString()}€</span>
            </div>

            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Expérience</span>
              </div>
              <span className="font-bold text-sm">{profile.rentalExperience} ans</span>
            </div>

            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/10">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span className="text-sm">Évaluation</span>
              </div>
              <span className="font-bold text-sm">{getScoreText(profile.profileScore)}</span>
            </div>
          </div>

          {/* Description */}
          <div className="px-3 pt-3 pb-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm leading-relaxed text-center">{profile.description}</p>
          </div>
        </div>

        {/* Drag Indicator */}
        {index === 0 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <motion.div
              className="h-1 w-8 rounded-full bg-white/40"
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

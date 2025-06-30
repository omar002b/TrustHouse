"use client"

import { useState } from "react"
import { CheckCircle, Home, Users, Zap, Mail, Star, TrendingUp, Shield, Headphones } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Component() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const plans = [
    {
      name: "Par Logement",
      price: "8€",
      period: "par logement",
      description: "Parfait pour les propriétaires avec peu de biens",
      features: [
        { icon: Home, text: "Paiement à l'usage" },
        { icon: Users, text: "100 CV par logement" },
        { icon: CheckCircle, text: "Screening de base" },
        { icon: Mail, text: "Support par email" },
        { icon: Shield, text: "Vérification d'identité" },
      ],
      buttonText: "Commencer maintenant",
      buttonVariant: "outline" as const,
      popular: false,
      gradient: "from-[#F5F5DC]/80 to-[#F0E68C]/60",
      borderColor: "border-[#D2B48C]/40",
    },
    {
      name: "Illimité",
      price: "50€",
      period: "par mois",
      description: "Le meilleur choix pour les gestionnaires professionnels et les agences immobilières (abonnement restreint à un par agence)",
      features: [
        { icon: Home, text: "15 Logements par mois" },
        { icon: TrendingUp, text: "Formulaires personnalisé" },
        { icon: Users, text: "+200 CV par logement" },
        { icon: Zap, text: "Screening avancé" },
        { icon: Star, text: "Support prioritaire" },
        { icon: Shield, text: "Vérification complète" },
      ],
      buttonText: "Commencer l'essai",
      buttonVariant: "default" as const,
      popular: true,
      gradient: "from-[#F5DEB3]/90 to-[#DEB887]/80",
      borderColor: "border-[#CD853F]/50",
    },
    {
      name: "Personnalisé",
      price: "Sur mesure",
      period: "nous contacter",
      description: "Solution entreprise adaptée à vos besoins",
      features: [
        { icon: Home, text: "Volume entreprise" },
        { icon: Zap, text: "Intégrations personnalisées" },
        { icon: TrendingUp, text: "Scalabilité des prix" },
        { icon: Headphones, text: "Gestionnaire de compte dédié" },
        { icon: Shield, text: "SLA garanti" },
      ],
      buttonText: "Contacter les ventes",
      buttonVariant: "outline" as const,
      popular: false,
      gradient: "from-[#F5F5DC]/80 to-[#FAEBD7]/70",
      borderColor: "border-[#D2B48C]/40",
    },
  ]

  return (
    <div id="pricing" className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-6 bg-[#F5DEB3]/80 backdrop-blur-sm text-[#8B4513] hover:bg-[#DEB887]/80 border border-[#D2B48C]/40 px-4 py-2 text-sm font-medium">
          ✨ Plans et Tarifs
        </Badge>
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#8B4513] to-[#A0522D] bg-clip-text text-transparent mb-6">
          Choisissez votre plan parfait
        </h2>
        <p className="text-xl text-[#8B4513]/80 max-w-3xl mx-auto leading-relaxed">
          Des plans flexibles conçus pour grandir avec vous. Des propriétaires individuels aux grandes sociétés de
          gestion immobilière.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br ${plan.gradient} backdrop-blur-sm ${plan.borderColor} border-2 ${
              plan.popular ? "scale-105 lg:scale-110" : ""
            } ${hoveredCard === index ? "ring-4 ring-[#DEB887]/40" : ""}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-[#CD853F] to-[#A0522D] text-white px-6 py-2 text-sm font-semibold shadow-lg">
                  🔥 Le Plus Populaire
                </Badge>
              </div>
            )}

            <CardContent className="p-8 lg:p-10">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#8B4513] mb-3">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#A0522D] to-[#8B4513] bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-[#8B4513]/70 ml-2 text-lg">{plan.period}</span>
                </div>
                <p className="text-[#8B4513]/70 text-sm leading-relaxed">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#CD853F] to-[#A0522D] flex items-center justify-center mr-4 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-[#8B4513]/90 font-medium group-hover:text-[#8B4513] transition-colors">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.buttonVariant}
                className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                  plan.buttonVariant === "default"
                    ? "bg-gradient-to-r from-[#CD853F] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white shadow-lg hover:shadow-xl border-0"
                    : "bg-[#FAEBD7]/80 backdrop-blur-sm border-2 border-[#D2B48C]/50 text-[#8B4513] hover:bg-[#F5DEB3]/80 hover:border-[#CD853F]/60 hover:text-[#A0522D]"
                } ${hoveredCard === index ? "scale-105" : ""}`}
              >
                {plan.buttonText}
              </Button>

              {/* Additional Info */}
              {plan.name === "Personnalisé" && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-[#8B4513]/70">
                    📧{" "}
                    <a
                      href="mailto:hi@trusthouse.fr"
                      className="text-[#A0522D] hover:text-[#8B4513] font-medium"
                    >
                      hi@trusthouse.fr
                    </a>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

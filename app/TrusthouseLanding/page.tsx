// UI Components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Custom Components
import CardStack from "@/components/dashboard/card-stack"
import ModernPricing from "@/components/dashboard/modern-pricing"
import ModernStats from "@/components/dashboard/modern-stats"
import SecurityShowcase from "@/components/dashboard/security-showcase"
import StackedCardsMatching from "../../components/Notas/stacked-cards-matching"

// Icons
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react"

// Libraries
import Image from "next/image"
import Link from "next/link"

export default function TrusthouseLanding() {
  return (
    <div className="min-h-screen bg-stone-50">

      {/*  Navbar  */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-6xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl px-6 py-3 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-stone-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-white drop-shadow-lg">TrustHouse</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 pl-24">
              <Link href="#features" className="text-white/90 hover:text-white transition-colors font-bold drop-shadow-lg">Fonctionnalités</Link>
              <Link href="#pricing" className="text-white/90 hover:text-white transition-colors font-bold drop-shadow-lg">Tarifs</Link>
              <Link href="mailto:hi@trusthouse.fr" className="text-white/90 hover:text-white transition-colors font-bold drop-shadow-lg">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/20 font-medium">Connexion</Button>
              <Button className="bg-stone-200/30 backdrop-blur-md border font-bold border-stone-300/40 text-stone-800 hover:bg-stone-200/40 rounded-full px-6 shadow-lg">Enregistrement</Button>
            </div>
          </div>
        </div>
      </nav>

      {/*  Hero Section  */}
      {/* Hero Section */}
      <section className="relative flex items-start justify-center py-32 overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 h-[120vh] z-0">
          <Image
            src="/sirisvisual-dvL9AH_pOzQ-unsplash.jpg"
            alt="Classic Parisian Haussmann building"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-500/10"></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/20 backdrop-blur-md font-bold border-white/30 text-white hover:bg-white/30 shadow-lg">
            🚀 Boostez votre productivité
          </Badge>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Automatise ta sélection <br />
              <span className="bg-gradient-to-r from-amber-200 to-stone-100 bg-clip-text text-transparent drop-shadow-lg">
                de locataires
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              <strong className="text-white">TrustHouse</strong> la plateforme pour accélérer ton acquisition de locataires
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-stone-200/40 backdrop-blur-md border font-bold border-stone-300/50 text-stone-800 hover:bg-stone-200/50 rounded-full px-8 py-4 text-lg shadow-2xl">
              Commencer gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 🔽 Degradado suave hacia el color de la sección siguiente */}
        <div className="absolute bottom-0 w-full h-48 z-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-transparent to-[#fdca96]" />
        </div>
      </section>


      {/*  Features Section  */}
      <section
        id="features"
        className="relative section-gradient gap-7 px-4 bg-[#fdca96] pt-32 text-stone-800"
      >
        <div className="pb-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-[#F5DEB3]/80 backdrop-blur-sm text-[#8B4513] hover:bg-[#DEB887]/80 border border-[#D2B48C]/40 px-4 py-2 text-sm font-medium">Analyse 🔍</Badge>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#8B4513] to-[#A0522D] bg-clip-text text-transparent mb-6">Analyse Optimale en Profondeur</h2>
            <p className="text-xl text-[#8B4513]/80 max-w-3xl mx-auto leading-relaxed">
              Notre outil repose sur une série d’algorithmes intelligents, spécialement entraînés pour analyser les données et optimiser la sélection des profils les plus pertinents à contacter. Cette approche garantit un ciblage précis, stratégique et à haute valeur ajoutée.
            </p>
          </div>
          <StackedCardsMatching />
        </div>

        {/*  Document Security  */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 max-w-7xl mx-auto px-4">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <Badge className="mb-6 bg-[#F5DEB3]/80 backdrop-blur-sm text-[#8B4513] hover:bg-[#DEB887]/80 border border-[#D2B48C]/40 px-4 py-2 text-sm font-medium">Sécurité 🔒</Badge>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#8B4513] to-[#A0522D] bg-clip-text text-transparent mb-6">Assurez la confidentialité des données de vos clients</h2>
            <p className="text-xl text-[#8B4513]/80 max-w-3xl mx-auto leading-relaxed">
              Assurez la protection des documents de vos clients grâce à des filtres intelligents et des modèles de détection avancés, conçus pour prévenir les fraudes et les fuites de données.
            </p>
          </div>
          <div className="lg:w-1/3 w-full">
            <SecurityShowcase />
          </div>
        </div>
        {/*  Time Optimization  */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 max-w-7xl mx-auto px-4 pt-12 text-center">
          <div className="lg:w-1/3 w-full">
            <CardStack />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <Badge className="mb-6 bg-[#F5DEB3]/80 backdrop-blur-sm text-[#8B4513] hover:bg-[#DEB887]/80 border border-[#D2B48C]/40 px-4 py-2 text-sm font-medium">Optimisations 🕑</Badge>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#8B4513] to-[#A0522D] bg-clip-text text-transparent mb-6">Optimisez votre temps dans la recherche de profils à louer</h2>
            <p className="text-xl text-[#8B4513]/80 max-w-3xl mx-auto leading-relaxed">
              Optimisez votre temps en accédant rapidement aux profils à louer les plus pertinents. Grâce à notre système intelligent, la recherche devient plus simple, plus rapide et plus efficace.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <ModernPricing />

        {/* Stats Section */}
        <ModernStats />
      </section>

      {/* Footer  */}
      <footer className="bg-gray-800/80 backdrop-blur-md text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-stone-700 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                  <span className="font-bold text-xl">TrustHouse</span>
                </div>
                <p className="text-gray-300">
                  La plateforme qui révolutionne la sélection de locataires pour les propriétaires modernes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Produit</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="#features" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                  <li><Link href="#pricing" className="hover:text-white transition-colors">Tarifs</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="mailto:hi@trusthouse.fr" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Statut</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Légal</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Confidentialité</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Conditions</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Cookies</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Trusthouse. Tous droits réservés a <a href="www.cubelabs.fr" target="_blank" className="text-white">CUBELABS</a>.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

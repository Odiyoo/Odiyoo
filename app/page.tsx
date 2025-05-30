"use client"

import Link from "next/link"
import {
  ArrowRight,
  Calculator,
  CheckSquare2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Home,
  Instagram,
  Shield,
  Star,
  Twitter,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { Separator } from "@/components/ui/separator"
import { Suspense, useEffect, useState } from "react"
import Image from "next/image"
import Footer from "@/components/footer"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import FullLogoBlack from "@/components/full-logo-black"
import SmartQuoteBar from "@/components/smart-quote"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TypeAnimation } from 'react-type-animation'

const floatingAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .float-animation-1 {
    animation: float 3s ease-in-out infinite;
  }
  
  .float-animation-2 {
    animation: float 4s ease-in-out infinite;
  }
`
function VideoComponent({ url, isMuted, height, ...props }: { url: string, isMuted?: boolean, height?: number }) {

  return (
    <video preload="none" aria-label="Video player" muted={isMuted} style={{ height: height }} {...props}>
      <source src={url} type="video/mp4" />
      Your browser does not suppor the video tag.
    </video>
  )
}

export default function LandingPage() {

  const [activeTestimonial, setActiveTestimonial] = useState<number>(1);

  const goPreviousTestimonial = () => {
    setActiveTestimonial((num) => {
      if (num === 1) {
        return 3
      } else {
        return num - 1
      }
    })
  }
  const goNextTestimonial = () => {
    setActiveTestimonial((num) => {
      if (num === 3) {
        return 1
      } else {
        return num + 1
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <style jsx global>
        {floatingAnimation}
      </style>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Brand Trust */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20 pb-2">
          <div className="container mb-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-odiyoo mb-4">
                <Link href="#getuigenissen">
                  <b>400+</b>&nbsp;tevreden klanten 🇧🇪
                </Link>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl heading-typography">
                Uw dak, onze <span className="italic px-1 bg-odiyoo-secondary text-white">Expertise</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Wij bezorgen jou kwalitatieve aannemers met ervaring in diensten als&nbsp; 
                <TypeAnimation
                  sequence={[
                    'Dakreiniging',
                    2500,
                    'Dakrenovatie',
                    2500,
                    'Dakinspectie',
                    2500,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="underline"
                  repeat={Infinity}
                />.
              </p>
            </div>
            <SmartQuoteBar />
            <ActionChoice className="mt-28" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


function ActionChoice({ ...props }) {

  type Realisatie = {
    before_img: string,
    after_img: string,
    city: string,
    rating: number,
    type: string,
    price: string,
  }
  const realisaties: Realisatie[] = [
    {
      before_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/margriet_before_1500px.webp",
      after_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/margriet_after_1500px.webp",
      city: 'Leuven',
      rating: 4.9,
      type: 'Dakrenovatie - hellend dak',
      price: '€3.750',
    },
    {
      before_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/antwerpen_before.webp",
      after_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/antwerpen_after.webp",
      city: "Antwerpen",
      price: "€4.250",
      rating: 4.5,
      type: "Dakreiniging - hellend dak"
    },
    {
      before_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/gent_before.webp",
      after_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/gent_after.webp",
      city: 'Gent',
      rating: 4.3,
      price: '€3.750',
      type: "Dakrenovatie - hellend dak"
    },
    {
      before_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/brugge_before.webp",
      after_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/brugge_after.webp",
      city: 'Brugge',
      rating: 5,
      price: '€2.375',
      type: "Dakreiniging - hellend dak"
    },
    {
      before_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/mechelen_before.webp",
      after_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/mechelen_after.webp",
      city: 'Mechelen',
      rating: 4.3,
      price: '€3.075',
      type: "Dakreiniging - hellend dak"
    },
    {
      before_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/hasselt_before.webp",
      after_img: "https://lvcvdxayxtcnfebvfeyc.supabase.co/storage/v1/object/public/assets/before-after-pictures/hasselt_after.webp",
      city: 'Hasselt',
      rating: 4.9,
      price: '€4.750',
      type: "Dakrenovatie - hellend dak"
    }
  ]

  function shuffleArray(array: Realisatie[]) {
    let result = array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return result
  }

  const SliderCard = ({ before_img, after_img, city, rating, type, price }: Realisatie) => {
    return (
      <Link href={`/projecten/${city}`}>
        <Card className="pt-6 rounded-2xl">
        <CardContent>
          <BeforeAfterSlider
            image1={before_img}
            image2={after_img} />
        </CardContent>
        <CardFooter className="items-start flex-col">
          <div className="flex justify-between w-full">
            <p className="font-bold">Project in {city}</p>
            <p><Star className="inline h-4 w-4 fill-yellow-500 text-yellow-500 align-middle" /> {rating}</p>
          </div>
          <p className="text-muted-foreground">{type}</p>
          <div className="flex justify-between w-full">
            <p className="text-muted-foreground">Uitvoeringsprijs</p>
            <p><b>({price})</b></p>
          </div>
        </CardFooter>
      </Card>
      </Link>
    )
  }

  return (
    <div className="" {...props}>
      <Tabs defaultValue="dakrenovatie">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dakrenovatie">🏠 Dak renoveren</TabsTrigger>
          <TabsTrigger value="dakreiniging">🧽 Dak reinigen</TabsTrigger>
        </TabsList>
        <TabsContent value="dakrenovatie">
          <div className="hidden md:grid grid-cols-3 gap-2">
            {realisaties.map((realisatie, key) => (
              <SliderCard key={key} before_img={realisatie.before_img} after_img={realisatie.after_img} city={realisatie.city} rating={realisatie.rating} type={realisatie.type} price={realisatie.price} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="dakreiniging">
          <div className="hidden md:grid grid-cols-3 gap-2">
            {shuffleArray(realisaties).map((realisatie, key) => (
              <SliderCard key={key} before_img={realisatie.before_img} after_img={realisatie.after_img} city={realisatie.city} rating={realisatie.rating} type={realisatie.type} price={realisatie.price} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <Link href="/quote">
        <div className="flex justify-center mt-4 text-odiyoo hover:text-primary hover:underline"><p>Ik wil dit ook </p><ArrowRight className="place-self-center ml-2 h-4 w-4" /></div>
      </Link>
    </div>
  )
}
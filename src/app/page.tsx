"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Sparkles, Clock, BadgeDollarSign, MessageCircleHeart } from "lucide-react";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.h1 
                variants={fadeIn}
                className="font-heading text-5xl lg:text-7xl font-bold tracking-tight text-primary mb-6 leading-tight"
              >
                Create Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Signature Scent</span>
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Explore hundreds of premium fragrances and create a perfume that truly represents you. Luxury quality, personalized for you.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full" asChild>
                  <Link href="/builder">Create Custom Perfume</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-primary text-primary hover:bg-primary/5" asChild>
                  <Link href="/catalog">Browse Collection</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-lg mx-auto aspect-[4/5]">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent rounded-3xl transform rotate-3 scale-105" />
                <Image
                  src="/hero-bottle.png"
                  alt="Premium Perfume Bottle"
                  fill
                  className="object-cover rounded-3xl shadow-2xl z-10"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-surface relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose Great Parfum</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We combine the art of traditional perfumery with modern customization.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Droplets, title: "500+ Premium Fragrances", desc: "A vast library of top-tier ingredients" },
              { icon: Sparkles, title: "Custom Blending", desc: "Tailored to your unique personality" },
              { icon: Clock, title: "Long Lasting", desc: "High concentration Extrait de Parfum" },
              { icon: BadgeDollarSign, title: "Affordable Pricing", desc: "Luxury scents without the markup" },
              { icon: MessageCircleHeart, title: "Free Consultation", desc: "Expert advice on finding your scent" },
            ].map((feature, idx) => (
              <Card key={idx} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fragrances Placeholder */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Featured Collections</h2>
              <p className="text-muted-foreground">Discover our most loved signature blends.</p>
            </div>
            <Button variant="ghost" className="text-primary hidden sm:flex" asChild>
              <Link href="/catalog">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-muted">
                  <Image src="/custom-blend.png" alt="Perfume" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground">Midnight Bloom</h3>
                <p className="text-sm text-muted-foreground mb-2">Floral, Woody</p>
                <p className="font-medium text-primary">Rp 45.000</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary to-transparent"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Ready to create your masterpiece?</h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join our membership program to get 20% off your first custom blend and start earning loyalty points.
          </p>
          <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 text-lg px-8 py-6 rounded-full" asChild>
             <Link href="/builder">Start Customizing Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

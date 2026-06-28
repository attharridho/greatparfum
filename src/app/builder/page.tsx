"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";

type Size = "30ml" | "50ml" | "100ml";
type Family = "Citrus" | "Floral" | "Woody" | "Aquatic" | "Oriental" | "Gourmand" | "Fresh";
type Concentration = "EDC" | "EDT" | "EDP" | "Extrait";

const SIZES = [
  { id: "30ml", label: "30ml (Travel)", basePrice: 45000 },
  { id: "50ml", label: "50ml (Standard)", basePrice: 65000 },
  { id: "100ml", label: "100ml (Premium)", basePrice: 95000 },
];

const FAMILIES = ["Citrus", "Floral", "Woody", "Aquatic", "Oriental", "Gourmand", "Fresh"];
const NOTES = {
  top: ["Bergamot", "Lemon", "Mandarin", "Pink Pepper", "Sea Salt", "Blackcurrant", "Saffron"],
  middle: ["Jasmine", "Rose", "Orchid", "Lavender", "Sage", "Leather", "Caramel"],
  base: ["Vanilla", "Sandalwood", "Patchouli", "Oud", "Musk", "Amber", "Vetiver"]
};

const CONCENTRATIONS = [
  { id: "EDC", label: "Eau de Cologne", mult: 1.0, desc: "Light, refreshing (2-4% oil)" },
  { id: "EDT", label: "Eau de Toilette", mult: 1.1, desc: "Everyday wear (5-15% oil)" },
  { id: "EDP", label: "Eau de Parfum", mult: 1.2, desc: "Long lasting (15-20% oil)" },
  { id: "Extrait", label: "Extrait de Parfum", mult: 1.4, desc: "Intense, eternal (20-40% oil)" },
];

export default function CustomBuilderPage() {
  const [step, setStep] = useState(1);
  
  const [size, setSize] = useState<Size>("50ml");
  const [family, setFamily] = useState<Family | "">("");
  const [topNote, setTopNote] = useState("");
  const [middleNote, setMiddleNote] = useState("");
  const [baseNote, setBaseNote] = useState("");
  const [concentration, setConcentration] = useState<Concentration>("EDP");
  const [customName, setCustomName] = useState("");

  const calculatePrice = () => {
    const base = SIZES.find(s => s.id === size)?.basePrice || 0;
    const mult = CONCENTRATIONS.find(c => c.id === concentration)?.mult || 1;
    return base * mult;
  };

  const handleNext = () => setStep(s => Math.min(s + 1, 9));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p);
  };

  const generateWhatsAppLink = () => {
    const text = `Hello Great Parfum! I'd like to order my custom blend:
*Name*: ${customName || 'My Signature Scent'}
*Size*: ${size}
*Family*: ${family}
*Notes*: ${topNote} (Top), ${middleNote} (Heart), ${baseNote} (Base)
*Concentration*: ${concentration}
*Estimated Price*: ${formatPrice(calculatePrice())}

Please let me know how to proceed with payment and shipping.`;
    
    return `https://wa.me/6285773585632?text=${encodeURIComponent(text)}`;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-6">Select Bottle Size</h2>
            {SIZES.map(s => (
              <button
                key={s.id}
                onClick={() => setSize(s.id as Size)}
                className={`w-full p-4 rounded-xl border-2 flex justify-between items-center transition-all ${size === s.id ? 'border-secondary bg-secondary/5 text-primary' : 'border-border hover:border-secondary/50'}`}
              >
                <span className="font-semibold">{s.label}</span>
                <span>Starting at {formatPrice(s.basePrice)}</span>
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-6">Choose Fragrance Family</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {FAMILIES.map(f => (
                <button
                  key={f}
                  onClick={() => setFamily(f as Family)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${family === f ? 'border-secondary bg-secondary/5 text-primary' : 'border-border hover:border-secondary/50'}`}
                >
                  <span className="font-semibold">{f}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-2">Choose Top Note</h2>
            <p className="text-muted-foreground mb-6">The first impression, lasts 15-30 mins.</p>
            <div className="grid grid-cols-2 gap-4">
              {NOTES.top.map(n => (
                <button
                  key={n}
                  onClick={() => setTopNote(n)}
                  className={`p-3 rounded-xl border-2 transition-all ${topNote === n ? 'border-secondary bg-secondary/5 text-primary' : 'border-border hover:border-secondary/50'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-2">Choose Heart Note</h2>
            <p className="text-muted-foreground mb-6">The core character, lasts 2-4 hours.</p>
            <div className="grid grid-cols-2 gap-4">
              {NOTES.middle.map(n => (
                <button
                  key={n}
                  onClick={() => setMiddleNote(n)}
                  className={`p-3 rounded-xl border-2 transition-all ${middleNote === n ? 'border-secondary bg-secondary/5 text-primary' : 'border-border hover:border-secondary/50'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-2">Choose Base Note</h2>
            <p className="text-muted-foreground mb-6">The foundation, lasts 6+ hours.</p>
            <div className="grid grid-cols-2 gap-4">
              {NOTES.base.map(n => (
                <button
                  key={n}
                  onClick={() => setBaseNote(n)}
                  className={`p-3 rounded-xl border-2 transition-all ${baseNote === n ? 'border-secondary bg-secondary/5 text-primary' : 'border-border hover:border-secondary/50'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-6">Choose Concentration</h2>
            {CONCENTRATIONS.map(c => (
              <button
                key={c.id}
                onClick={() => setConcentration(c.id as Concentration)}
                className={`w-full p-4 rounded-xl border-2 flex flex-col items-start transition-all ${concentration === c.id ? 'border-secondary bg-secondary/5 text-primary' : 'border-border hover:border-secondary/50'}`}
              >
                <div className="flex justify-between w-full mb-1">
                  <span className="font-semibold">{c.label}</span>
                  <span className="text-sm font-medium">x{c.mult} multiplier</span>
                </div>
                <span className="text-sm text-muted-foreground">{c.desc}</span>
              </button>
            ))}
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-heading font-bold mb-2">Name Your Creation</h2>
            <p className="text-muted-foreground mb-6">What should we print on the label?</p>
            <Input 
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Summer Breeze 2026"
              className="text-lg py-6"
              maxLength={24}
            />
          </div>
        );
      case 8:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-heading font-bold mb-2">Your Signature Scent</h2>
            <p className="text-muted-foreground mb-8">Review your custom blend details</p>
            
            <div className="bg-surface p-6 rounded-2xl border border-border text-left space-y-4">
              <div className="flex justify-between border-b border-border pb-4">
                <span className="text-muted-foreground">Name</span>
                <span className="font-bold text-primary">{customName || "Untitled Blend"}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-4">
                <span className="text-muted-foreground">Size & Concentration</span>
                <span className="font-medium">{size} • {concentration}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-4">
                <span className="text-muted-foreground">Family</span>
                <span className="font-medium">{family}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Notes</span>
                <div className="text-right">
                  <span className="block font-medium text-sm">Top: {topNote}</span>
                  <span className="block font-medium text-sm">Heart: {middleNote}</span>
                  <span className="block font-medium text-sm">Base: {baseNote}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-2xl flex justify-between items-center">
              <span className="font-semibold">Total Price</span>
              <span className="text-2xl font-bold text-primary">{formatPrice(calculatePrice())}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return !!size;
      case 2: return !!family;
      case 3: return !!topNote;
      case 4: return !!middleNote;
      case 5: return !!baseNote;
      case 6: return !!concentration;
      case 7: return customName.length > 0;
      default: return true;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 flex flex-col lg:flex-row gap-12">
      {/* Live Preview Sidebar */}
      <div className="w-full lg:w-1/3 lg:sticky lg:top-24 h-max order-2 lg:order-1">
        <div className="bg-surface rounded-3xl p-8 border border-border flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-bl-full -z-10" />
          <h3 className="font-heading font-semibold text-lg mb-8 text-center uppercase tracking-widest text-muted-foreground">Live Preview</h3>
          
          <div className="relative w-48 h-64 mb-8">
            <Image 
              src="/hero-bottle.png" 
              alt="Bottle Preview" 
              fill 
              className="object-contain"
            />
            {customName && (
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded text-center min-w-[100px] border border-white/50 shadow-sm">
                  <p className="text-[10px] font-bold tracking-wider text-primary truncate max-w-[120px] font-heading uppercase">{customName}</p>
                </div>
              </div>
            )}
          </div>

          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Live Price:</span>
              <span className="font-bold text-lg text-primary">{formatPrice(calculatePrice())}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Builder Steps */}
      <div className="flex-1 order-1 lg:order-2">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all ${
                    i === step ? 'w-8 bg-primary' : i < step ? 'w-4 bg-secondary' : 'w-4 bg-secondary/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">Step {step} of 8</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-12 pt-6 border-t border-border">
            <Button 
              variant="ghost" 
              onClick={handlePrev} 
              disabled={step === 1}
              className={step === 1 ? "invisible" : ""}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            {step < 8 ? (
              <Button 
                onClick={handleNext} 
                disabled={!isStepValid()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              >
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                asChild
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg shadow-lg"
              >
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" /> Order via WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

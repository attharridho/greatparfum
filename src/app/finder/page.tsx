"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fragrances, Fragrance } from "@/lib/data";
import { ArrowRight, ArrowLeft, RefreshCcw } from "lucide-react";

type Question = {
  id: string;
  title: string;
  options: { label: string; value: string; icon?: string }[];
};

const questions: Question[] = [
  {
    id: "gender",
    title: "Who are you shopping for?",
    options: [
      { label: "Myself (Women)", value: "Women" },
      { label: "Myself (Men)", value: "Men" },
      { label: "Unisex / Anyone", value: "Unisex" },
    ]
  },
  {
    id: "family",
    title: "What scent profile do you gravitate towards?",
    options: [
      { label: "Fresh & Clean", value: "Fresh" },
      { label: "Floral & Romantic", value: "Floral" },
      { label: "Woody & Earthy", value: "Woody" },
      { label: "Sweet & Warm", value: "Gourmand" },
      { label: "Spicy & Exotic", value: "Oriental" },
      { label: "Zesty & Energizing", value: "Citrus" },
      { label: "Oceanic & Breezy", value: "Aquatic" },
    ]
  },
  {
    id: "intensity",
    title: "How intense do you like your fragrance?",
    options: [
      { label: "Subtle (Skin scent)", value: "Moderate" },
      { label: "Noticeable (Leaves a trail)", value: "Long Lasting" },
      { label: "Intense (Fills the room)", value: "Eternal" },
    ]
  }
];

export default function PerfumeFinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [recommendations, setRecommendations] = useState<Fragrance[]>([]);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendations();
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendations = () => {
    // Simple matching algorithm
    const familyMatch = answers.family;
    const genderMatch = answers.gender;
    const intensityMatch = answers.intensity;

    let scored = fragrances.map(f => {
      let score = 0;
      if (f.family === familyMatch || (familyMatch === 'Fresh' && f.family === 'Citrus')) score += 3;
      if (f.category === genderMatch || f.category === 'Unisex') score += 2;
      if (f.longevity === intensityMatch) score += 1;
      return { ...f, score };
    });

    scored.sort((a, b) => b.score - a.score);
    setRecommendations(scored.slice(0, 3));
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
    setRecommendations([]);
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">AI Perfume Finder</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Answer a few quick questions and let our intelligent matching system find your perfect signature scent.
        </p>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex justify-between items-center text-sm text-muted-foreground font-medium">
            <span>Step {currentStep + 1} of {questions.length}</span>
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div key={idx} className={`h-1.5 w-8 rounded-full ${idx <= currentStep ? 'bg-secondary' : 'bg-secondary/20'}`} />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border shadow-sm rounded-3xl p-8 md:p-12"
            >
              <h2 className="font-heading text-2xl font-bold text-center mb-8">{currentQuestion.title}</h2>
              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(currentQuestion.id, option.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      answers[currentQuestion.id] === option.value
                        ? "border-secondary bg-secondary/5 text-primary shadow-sm"
                        : "border-transparent bg-surface hover:bg-surface/80 hover:border-secondary/30"
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-10 pt-6 border-t border-border">
                <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0} className={currentStep === 0 ? "invisible" : ""}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!answers[currentQuestion.id]}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-full"
                >
                  {currentStep === questions.length - 1 ? "Show Results" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center bg-secondary/10 py-12 rounded-3xl border border-secondary/20">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">Your Perfect Matches</h2>
            <p className="text-muted-foreground mb-6">Based on your preferences, we highly recommend these fragrances.</p>
            <Button variant="outline" onClick={resetQuiz} className="rounded-full">
              <RefreshCcw className="mr-2 h-4 w-4" /> Retake Quiz
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map((fragrance, idx) => (
              <motion.div
                key={fragrance.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border shadow-sm rounded-3xl p-6 flex flex-col relative overflow-hidden"
              >
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                    TOP MATCH
                  </div>
                )}
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-surface">
                  <Image src={fragrance.image} alt={fragrance.name} fill className="object-cover" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{fragrance.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{fragrance.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs bg-surface px-2 py-1 rounded-md text-muted-foreground">{fragrance.family}</span>
                  <span className="text-xs bg-surface px-2 py-1 rounded-md text-muted-foreground">{fragrance.longevity}</span>
                </div>
                <div className="mt-auto">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full" asChild>
                    <Link href={`/catalog/${fragrance.id}`}>View Details</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

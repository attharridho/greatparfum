"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fragrances, Fragrance } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function CatalogPage() {
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLongevities, setSelectedLongevities] = useState<string[]>([]);

  const families = ["Citrus", "Floral", "Woody", "Aquatic", "Oriental", "Gourmand", "Fresh"];
  const categories = ["Men", "Women", "Unisex"];
  const longevities = ["Moderate", "Long Lasting", "Eternal"];

  const toggleFilter = (list: string[], setList: (l: string[]) => void, value: string) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const filteredFragrances = fragrances.filter(f => {
    const familyMatch = selectedFamilies.length === 0 || selectedFamilies.includes(f.family);
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(f.category);
    const longevityMatch = selectedLongevities.length === 0 || selectedLongevities.includes(f.longevity);
    return familyMatch && categoryMatch && longevityMatch;
  });

  const FilterSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading font-semibold mb-4 text-lg">Category</h3>
        <div className="space-y-3">
          {categories.map(c => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${c}`} 
                checked={selectedCategories.includes(c)}
                onCheckedChange={() => toggleFilter(selectedCategories, setSelectedCategories, c)}
              />
              <label htmlFor={`cat-${c}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {c}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold mb-4 text-lg">Fragrance Family</h3>
        <div className="space-y-3">
          {families.map(f => (
            <div key={f} className="flex items-center space-x-2">
              <Checkbox 
                id={`fam-${f}`} 
                checked={selectedFamilies.includes(f)}
                onCheckedChange={() => toggleFilter(selectedFamilies, setSelectedFamilies, f)}
              />
              <label htmlFor={`fam-${f}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {f}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading font-semibold mb-4 text-lg">Longevity</h3>
        <div className="space-y-3">
          {longevities.map(l => (
            <div key={l} className="flex items-center space-x-2">
              <Checkbox 
                id={`long-${l}`} 
                checked={selectedLongevities.includes(l)}
                onCheckedChange={() => toggleFilter(selectedLongevities, setSelectedLongevities, l)}
              />
              <label htmlFor={`long-${l}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {l}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">Fragrance Catalog</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Discover our curated collection of premium inspired fragrances. Filter by category, scent family, or longevity to find your perfect match.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto">
              <div className="py-6">
                <h2 className="font-heading font-bold text-2xl mb-6">Filters</h2>
                <FilterSection />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterSection />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredFragrances.map((fragrance, idx) => (
              <motion.div 
                key={fragrance.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative flex flex-col"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-muted">
                  <Image 
                    src={fragrance.image} 
                    alt={fragrance.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-primary hover:bg-white/90">
                      {fragrance.family}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Button className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary text-white">
                      <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <Link href={`/catalog/${fragrance.id}`}>
                      <h3 className="font-heading font-semibold text-lg text-foreground hover:text-secondary transition-colors">
                        {fragrance.name}
                      </h3>
                    </Link>
                    <span className="font-medium text-primary">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(fragrance.price)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                    {fragrance.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Notes:</span> {fragrance.notes.middle.join(", ")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredFragrances.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-xl font-heading font-semibold mb-2">No fragrances found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to discover more scents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

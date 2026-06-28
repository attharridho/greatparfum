import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fragrances } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, ArrowLeft, Truck, ShieldCheck, Droplet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fragrance = fragrances.find((f) => f.id === id);

  if (!fragrance) {
    notFound();
  }

  const similarFragrances = fragrances
    .filter((f) => f.family === fragrance.family && f.id !== fragrance.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/catalog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
      </Link>

      <div className="flex flex-col md:flex-row gap-12 mb-24">
        {/* Product Images */}
        <div className="flex-1">
          <div className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden bg-surface">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent mix-blend-multiply pointer-events-none" />
            <Image
              src={fragrance.image}
              alt={fragrance.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Thumbnail gallery placeholder */}
          <div className="flex gap-4 mt-4">
            {[1, 2, 3].map((thumb) => (
              <div key={thumb} className="relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-secondary transition-colors">
                <Image src={fragrance.image} alt="thumbnail" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-secondary/20 text-primary hover:bg-secondary/30">
                {fragrance.family}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                {fragrance.category}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                {fragrance.concentration}
              </Badge>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">{fragrance.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-semibold text-foreground">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(fragrance.price)}
              </span>
              <div className="flex items-center text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current opacity-50" />
                <span className="text-sm text-muted-foreground ml-2">(124 reviews)</span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {fragrance.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 rounded-full">
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="sm:flex-none rounded-full py-6 px-6 border-primary/20 hover:bg-primary/5">
              <Heart className="h-5 w-5 text-primary" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12 p-6 bg-surface rounded-2xl">
            <div className="flex items-start gap-3">
              <Droplet className="h-6 w-6 text-secondary shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Longevity</h4>
                <p className="text-xs text-muted-foreground">{fragrance.longevity}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-secondary shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Quality</h4>
                <p className="text-xs text-muted-foreground">Premium Ingredients</p>
              </div>
            </div>
            <div className="flex items-start gap-3 col-span-2 mt-2 pt-4 border-t border-border">
              <Truck className="h-6 w-6 text-secondary shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Free Shipping & Returns</h4>
                <p className="text-xs text-muted-foreground">On all orders over $100</p>
              </div>
            </div>
          </div>

          {/* Fragrance Pyramid Tabs */}
          <Tabs defaultValue="pyramid" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6 p-1 bg-surface rounded-xl">
              <TabsTrigger value="pyramid" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Scent Notes</TabsTrigger>
              <TabsTrigger value="details" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Details</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="pyramid" className="space-y-6">
              <div className="relative p-6 bg-surface rounded-2xl">
                <div className="space-y-6 relative z-10">
                  <div className="text-center">
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Top Notes</h4>
                    <p className="text-primary font-medium">{fragrance.notes.top.join(" • ")}</p>
                  </div>
                  <div className="w-full h-px bg-border max-w-[200px] mx-auto" />
                  <div className="text-center">
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Heart Notes</h4>
                    <p className="text-primary font-medium">{fragrance.notes.middle.join(" • ")}</p>
                  </div>
                  <div className="w-full h-px bg-border max-w-[200px] mx-auto" />
                  <div className="text-center">
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">Base Notes</h4>
                    <p className="text-primary font-medium">{fragrance.notes.base.join(" • ")}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="details" className="p-6 bg-surface rounded-2xl text-muted-foreground text-sm leading-relaxed">
              <p>Every bottle of Great Parfum is meticulously crafted using the finest ingredients sourced globally. Our Extrait de Parfum concentration ensures a long-lasting sillage that evolves beautifully throughout the day.</p>
              <p className="mt-4"><strong>Volume:</strong> 50ml / 1.7 fl oz</p>
              <p><strong>Application:</strong> Spray on pulse points (wrists, neck, inner elbows) from a distance of 15cm.</p>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 bg-surface rounded-2xl">
              <p className="text-center text-muted-foreground text-sm italic">Reviews are currently being updated.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Similar Fragrances */}
      {similarFragrances.length > 0 && (
        <section className="border-t border-border pt-16 mt-16">
          <h2 className="font-heading text-3xl font-bold text-primary mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarFragrances.map((f) => (
              <Link href={`/catalog/${f.id}`} key={f.id} className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-muted">
                  <Image src={f.image} alt={f.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-secondary transition-colors">{f.name}</h3>
                <p className="font-medium text-primary">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(f.price)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Socials */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-2xl tracking-tighter mb-4">
              Great Parfum
            </h3>
            <p className="text-primary-foreground/80 max-w-xs">
              Crafting premium inspired fragrances and custom blends that resonate with your unique personality.
            </p>
            <div className="flex gap-4 pt-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/catalog" className="text-primary-foreground/80 hover:text-secondary transition-colors">Shop Perfumes</Link></li>
              <li><Link href="/builder" className="text-primary-foreground/80 hover:text-secondary transition-colors">Custom Blend</Link></li>
              <li><Link href="/finder" className="text-primary-foreground/80 hover:text-secondary transition-colors">Fragrance Finder</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link href="/blog" className="text-primary-foreground/80 hover:text-secondary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-secondary" />
                <span>Jl. Utan Kayu Raya No.111A 20, RT.20/RW.10,<br />Utan Kayu Utara, Matraman, Jakarta Timur 13120</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>0857-7358-5632</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="h-5 w-5 text-secondary" />
                <span>hello@greatparfum.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-secondary"
              />
              <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Great Parfum. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-secondary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

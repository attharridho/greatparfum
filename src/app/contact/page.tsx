"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have a question about our fragrances or want to book a custom blending session? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info & Map */}
        <div className="space-y-8">
          <div>
            <h2 className="font-heading text-2xl font-bold mb-6">Visit Our Store</h2>
            <div className="grid gap-6">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full text-primary shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Jl. Utan Kayu Raya No.111A 20, RT.20/RW.10,<br />
                      Utan Kayu Utara, Kec. Matraman,<br />
                      Kota Jakarta Timur, DKI Jakarta 13120
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="border-border shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="bg-secondary/20 p-3 rounded-full text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground text-sm">0857-7358-5632</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <div className="bg-secondary/20 p-3 rounded-full text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Hours</h3>
                      <p className="text-muted-foreground text-sm">Mon - Sun: 10AM - 9PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-[400px] border border-border shadow-sm bg-muted relative">
            <iframe 
              src="https://maps.google.com/maps?q=Jl.%20Utan%20Kayu%20Raya%20No.111A%2020,%20Utan%20Kayu%20Utara,%20Kec.%20Matraman,%20Kota%20Jakarta%20Timur,%20Daerah%20Khusus%20Ibukota%20Jakarta%2013120&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Great Parfum Store Map"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-surface p-8 md:p-10 rounded-3xl border border-border">
          <h2 className="font-heading text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input id="firstName" placeholder="John" className="bg-background" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input id="lastName" placeholder="Doe" className="bg-background" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john@example.com" className="bg-background" />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input id="subject" placeholder="How can we help you?" className="bg-background" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea 
                id="message" 
                rows={5}
                placeholder="Write your message here..." 
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 rounded-xl">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

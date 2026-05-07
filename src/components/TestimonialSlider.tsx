import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Rajesh Kumar", city: "Kanyakumari", text: "Excellent AC service! The technician arrived on time and fixed the issue in 30 minutes. Very professional and affordable.", rating: 5 },
  { name: "Priya Sharma", city: "Nagercoil", text: "Got my AC deep cleaned and gas refilled. Cooling is like a brand new AC now. Highly recommended!", rating: 5 },
  { name: "Mohammed Irfan", city: "Madurai", text: "Best fridge repair service. They diagnosed the problem accurately and fixed it the same day. Fair pricing too.", rating: 5 },
  { name: "Lakshmi Devi", city: "Chennai", text: "We've been using their AMC service for 2 years. Always punctual, thorough, and the AC runs perfectly.", rating: 4 },
  { name: "Suresh Babu", city: "Coimbatore", text: "Quick response for emergency AC repair. The compressor was fixed within hours. Great service!", rating: 5 },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <div className="relative max-w-2xl mx-auto text-center">
      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
        ))}
      </div>
      <blockquote className="text-lg text-foreground mb-4 italic leading-relaxed">
        "{t.text}"
      </blockquote>
      <p className="font-display font-bold text-foreground">{t.name}</p>
      <p className="text-sm text-muted-foreground">{t.city}</p>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-primary" : "w-2 bg-border"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <button onClick={() => setCurrent((p) => (p + 1) % testimonials.length)} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="Next">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;

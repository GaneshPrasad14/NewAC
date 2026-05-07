import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2rem] border border-primary/20 bg-primary/5 p-12 text-center"
          >
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
               <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-display text-3xl font-black text-foreground mb-4">Request Received</h3>
            <p className="text-muted-foreground text-lg">Our technical supervisor will contact you within <span className="text-primary font-bold">15 minutes</span> to confirm your booking.</p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit} 
            className="space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000" 
                  required 
                  className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Required Service</label>
              <select 
                required 
                className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
              >
                <option value="">Choose a Service Type</option>
                <option>Premium AC Installation</option>
                <option>Advanced AC Deep Clean</option>
                <option>Emergency AC Repair</option>
                <option>Refrigerator Maintenance</option>
                <option>Washing Machine Repair</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Brief Description</label>
              <textarea 
                placeholder="Tell us about the issue..." 
                rows={4} 
                className="w-full rounded-2xl border border-border bg-background px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" 
              />
            </div>

            <button type="submit" className="btn-premium w-full group">
              <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
              <span>Schedule Expert Visit</span>
            </button>
            
            <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-widest">
              By submitting, you agree to our 15-minute response guarantee.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadForm;

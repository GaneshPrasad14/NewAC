import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown, MapPin, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_NUMBER, BUSINESS_NAME } from "@/lib/constants";
import citiesData from "@/data/cities.json";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "py-3 px-4" 
          : "py-6 px-4"
      }`}
    >
      <div 
        className={`container mx-auto transition-all duration-500 rounded-3xl ${
          scrolled 
            ? "glass-morphism py-3 px-6" 
            : "bg-transparent py-2 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30"
            >
              <Zap className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-display font-black text-foreground tracking-tighter group-hover:text-primary transition-colors">
              Swift<span className="text-primary">Care</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
                  />
                )}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${PHONE_NUMBER}`} 
              className="hidden lg:flex items-center gap-2 text-sm font-black text-primary hover:text-primary/80 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                 <Phone className="h-4 w-4" />
              </div>
              {PHONE_NUMBER}
            </a>
            
            <Link 
              to="/contact" 
              className="hidden md:flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-xl shadow-foreground/10 active:scale-95"
            >
              Book Service
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-muted hover:bg-muted-foreground/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 glass-morphism rounded-3xl overflow-hidden shadow-2xl p-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-lg font-bold transition-all ${
                    location.pathname === link.href
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <a 
                href={`tel:${PHONE_NUMBER}`} 
                className="flex items-center justify-center gap-3 bg-foreground text-background py-4 rounded-2xl font-black text-lg shadow-xl"
              >
                <Phone className="h-6 w-6" /> {PHONE_NUMBER}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

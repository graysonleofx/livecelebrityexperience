import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";

const nav = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse Celebrities" },
  { to: "/#how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection]  = useState ('')

  useEffect(() => {
    const session = supabase.auth.getSession();
    if (session) {
      setUser(session.user);
    }
    // Listen for scroll highlight nav 
    const handleScroll = () => {
      const section = document.getElementById('how-it-works');
      if(section) {
        const rect = section.getBoundingClientRect();
        if(rect.top <= 80 && rect.bottom >= 80 ){
          setActiveSection("how-it-works");
        } else {
          setActiveSection("")
        }
      }
    }
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      authListener?.unsubscribe();
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  // Smooth Scroll handler 
  const scrollToHowItWorks = (e) => {
    e.preventDefault()
    const section = document.getElementById('how-it-works');
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection("how-it-works");
    }
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              n.label === "How It Works" ? (
                <a
                  key={n.to}
                  href= "/#how-it-works"
                  onClick={scrollToHowItWorks}
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-accent ${activeSection === "how-it-works" ? 'text-primary' : 'text-foreground'}`}
                >
                  {n.label}
                </a>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium hover:bg-accent ${isActive ? 'text-primary' : 'text-foreground'}`
                  }
                >
                  {n.label}
                </NavLink>
              
              )
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSelector />
          {/* Mobile Menu Button (Visible on smaller screens only) */}
          <div className="block md:hidden items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-2 mb-4 mt-2 border-b pb-4">
                  {nav.map((n) => (
                    n.to === "/#how-it-works" ? (
                      <a 
                        key={n.to}
                        href="#how-it-works"
                        onClick={scrollToHowItWorks}
                        className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-accent ${activeSection === "how-it-works" ? 'text-primary' : 'text-foreground'}`}
                      >
                        {n.label}
                      </a>
                    ) : (
                      <NavLink
                        key={n.to}
                        to={n.to}
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-md text-sm font-medium hover:bg-accent ${isActive ? 'text-primary' : 'text-foreground'}`
                        }
                      >
                        {n.label}
                      </NavLink>
                    )
                  ))}
                </nav>
                <div className="mt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      {/* <Link to="/dashboard" className="block mb-2">
                        <Button variant="outline" className="w-full">Dashboard</Button>
                      </Link> */}
                      <Link to="/signin" onClick={() => supabase.auth.signOut()} className="block">
                        <Button variant="hero" className="w-full">Sign Out</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="block mb-2">
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link to="/signup" className="block">
                        <Button variant="hero" className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {/* <Link to="/dashboard" className="block">
                  <Button variant="outline">Dashboard</Button>
                </Link> */}
                <Link to="/signin" onClick={() => supabase.auth.signOut()} className="block">
                  <Button variant="hero">Sign Out</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className="block">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/signup" className="block">
                  <Button variant="hero">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

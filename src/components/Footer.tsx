import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-card mt-12">
      <div className="container mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-3">Subscribe for updates and new celebrities.</p>
          <div className="flex gap-2">
            <Input placeholder="Your email address" type="email" aria-label="Email for newsletter" />
            <Button variant="hero">Subscribe</Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="story-link" href="/">Home</a></li>
            <li><a className="story-link" href="/browse">Browse</a></li>
            <li><a className="story-link" href="/contact">Contact</a></li>
            <li><a className="story-link" href="#terms">Terms</a></li>
            <li><a className="story-link" href="#privacy">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-3 text-muted-foreground">
            <a aria-label="Facebook" href="#"><Facebook /></a>
            <a aria-label="Twitter" href="#"><Twitter /></a>
            <a aria-label="Instagram" href="#"><Instagram /></a>
            <a aria-label="LinkedIn" href="#"><Linkedin /></a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-muted-foreground">contact-us@livecelebrityexperience.online<br/>+1 (555) 010-9999</p>
        </div>
      </div>
      <Separator />
      <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground flex items-center justify-between">
        <p>© {new Date().getFullYear()} Live Celebrity Experience</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

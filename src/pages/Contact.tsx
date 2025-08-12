import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <SEO title="Contact — Celebrity Experience" description="Get in touch with Celebrity Experience" />
      <h1 className="text-3xl font-bold mb-6">Get in Touch with Celebrity Experience</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Contact Form</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2"><Label>Full Name</Label><Input required /></div>
              <div className="grid gap-2"><Label>Email</Label><Input type="email" required /></div>
              <div className="grid gap-2"><Label>Subject</Label><Input required /></div>
              <div className="grid gap-2"><Label>Message</Label><Textarea rows={5} required /></div>
              <Button>Send Message</Button>
            </form>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <Card>
            <CardContent className="pt-6 text-sm">Email: support@celebrityexperience.app<br/>Phone: +1 (555) 010-9999</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Map</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <iframe title="Map" className="w-full h-64 rounded-md" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Times%20Square%20NYC&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;

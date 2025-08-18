import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "emailjs-com"
import { useState } from "react";
import {useToast} from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    emailjs.send(
      "service_my0gc0m",
      "template_d75vhw4",
      formData,
      "RbqwTYSXKLrKFzj64"
    ).then((result) => {
      console.log("Email sent successfully:", result);
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Success",
        description: "Your message has been sent successfully.",
        variant: "default",
      });
    }).catch((error) => {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "There was an error sending your message.",
        variant: "default",
      });
    });
  };
  return (
    <div className="container mx-auto px-4 py-10">
      <SEO title="Contact — Celebrity Experience" description="Get in touch with Celebrity Experience" />
      <h1 className="text-3xl font-bold mb-6">Get in Touch with Celebrity Experience</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Contact Form</CardTitle></CardHeader>
          <CardContent>
            <form
              className="grid gap-4"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Subject</Label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Message</Label>
                <Textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <Card>
            <CardContent className="pt-6 text-sm">Email: contact-us@livecelebrityexperience.online<br/>Phone: +1 (570) 761-2225</CardContent>
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

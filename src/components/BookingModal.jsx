import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { Celebrity } from "@/data/celebrities";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient"; // Ensure you have the Supabase client set up
import {useToast} from "@/hooks/use-toast"; // Custom hook for toast notifications
import Payment from "../pages/Payment";

const BookingModal = ({ open, onOpenChange, celeb }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data) {
        setUser(data?.user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleBooking = async () => {
    setLoading(true);

    if (!user) {
      setLoading(false);
      toast({ title: "Booking failed", description: "You must be logged in to book a celebrity.", status: "error" });
      navigate("/signin");
      onOpenChange(false);
      return;
    } else if (!celeb) {
      setLoading(false);
      toast({ title: "Booking failed", description: "No celebrity selected.", status: "error" });
      onOpenChange(false);
      return;
    } else {
      setLoading(true);
      toast({ title: "Booking in progress", description: `Booking ${celeb.name}...`, status: "info" });
      navigate("/booking-confirmation", { state: { celeb } });
    }
    try {
      // Here you would handle the booking logic, e.g., saving to a database
      // For example, you might want to save the booking details to Supabase
      const { data, error } = await supabase
        .from("bookings")
        .insert([{ user_id: user.id, celeb_id: celeb.id, type: tier, appearance, shoutout, VIP, custom, date, method, vacation, podcast, keynote, charity, secret, hospital, birthday, tour, brand, award, comedy }]);

      if (error) throw error;

      // For now, we'll just simulate a successful booking
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      toast({ title: "Booking successful!", description: `You have successfully booked ${celeb?.name}.`, status: "success" });
      onOpenChange(false); // Close the modal after booking
      navigate("/booking-confirmation", { state: { celeb } }); // Redirect to confirmation page
    } catch (error) {
      console.error("Error during booking:", error);
      toast({ title: "Booking failed", description: error.message, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const TIERS = [
    { id: "Meet & Greet", label: "Meet & Greet (In-Person)", price: 5000 }, // $50.00
    { id: "Appearance", label: "Appearance (Virtual)", price: 3000 }, // $30.00
    { id: "Video Shoutout", label: "Video Shoutout (Personalized)", price: 10000 }, // $100.00
    { id: "VIP Experience", label: "VIP Experience", price: 20000 }, // $200.00
    { id: "Dinner Date", label: "Dinner Date", price: 30000 }, // $300.00
    { id: "Vacation Package", label: "Vacation Package", price: 50000 }, // $500.00
    { id: "Podcast Interview", label: "Podcast Interview", price: 20000 }, // $200.00
    { id: "Keynote Speech", label: "Keynote Speech", price: 15000 }, // $150.00
    { id: "Charity Event Participation", label: "Charity Event Participation", price: 25000 }, // $250.00
    { id: "Secret Meet", label: "Secret Meet", price: 20000 }, // $200.00
    { id: "Hospital Visit", label: "Hospital Visit", price: 15000 }, // $150.00
    { id: "Birthday Surprise", label: "Birthday Surprise", price: 20000 }, // $200.00
    { id: "Tour with Celebrity", label: "Tour with Celebrity", price: 15000 }, // $150.00
    { id: "Brand Endorsement", label: "Brand Endorsement", price: 5000 }, // $50.00
    { id: "Award Ceremony Appearance", label: "Award Ceremony Appearance", price: 10000 }, // $100.00
    { id: "Comedy Show Appearance", label: "Comedy Show Appearance", price: 30000 }, // $300.00
    { id: "Private Concert", label: "Private Concert", price: 20000 }, // $200.00
    { id: "Sports Event Appearance", label: "Sports Event Appearance", price: 25000 }, // $250.00
    { id: "Fashion Show Appearance", label: "Fashion Show Appearance", price: 30000 }, // $300.00
    { id: "Merchandise Bundle", label: "Merchandise Bundle", price: 15000 }, // $150.00
    { id: "Fan Card Membership", label: "Fan Card Membership", price: 5000 }, // $50.00
    { id: "Custom Request", label: "Custom Request", price: 0 }, // Contact for pricing
  ];
  const [tier, setTier] = useState("Meet & Greet");
  const [appearance, setAppearance] = useState("Appearance");
  const [shoutout, setShoutout] = useState("Video Shoutout");
  const [VIP, setVIP] = useState("VIP Experience");
  const [dinner, setDinner] = useState("Dinner Date");
  const [vacation, setVacation] = useState("Vacation Package");
  const [podcast, setPodcast] = useState("Podcast Interview");
  const [keynote, setKeynote] = useState("Keynote Speech");
  const [charity, setCharity] = useState("Charity Event Participation");
  const [secret, setSecret] = useState("Secret Meet");
  const [hospital, setHospital] = useState("Hospital Visit");
  const [birthday, setBirthday] = useState("Birthday Surprise");
  const [tour, setTour] = useState("Tour with Celebrity");
  const [brand, setBrand] = useState("Brand Endorsement");
  const [award, setAward] = useState("Award Ceremony Appearance");
  const [comedy, setComedy] = useState("Comedy Show Appearance");
  const [sports, setSports] = useState("Sports Event Appearance");
  const [fashion, setFashion] = useState("Fashion Show Appearance");
  const [merch, setMerch] = useState("Merchandise Bundle");
  const [fan, setFan] = useState("Fan Card Membership");
  const [custom, setCustom] = useState("Custom Request");
  const [method, setMethod] = useState("paypal");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  // List all countries in alphabetical order with their code and name as an array of objects
  const COUNTRIES = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "NL", name: "Netherlands" },
    { code: "SE", name: "Sweden" },
    { code: "NO", name: "Norway" },
    { code: "FI", name: "Finland" },
    { code: "DK", name: "Denmark" },
    { code: "IE", name: "Ireland" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "IN", name: "India" },
    { code: "BR", name: "Brazil" },
    { code: "ZA", name: "South Africa" },
  ];

  const [country, setCountry] = useState("");


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex sm:flex-col lg:flex-row justify-center max-w-3xl p-2 bg-card rounded-lg shadow-lg w-full h-[580px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold">Book {celeb?.name}</DialogTitle>
          <div className="mt-4">
            <img src={celeb?.photo} alt={`${celeb?.name} portrait`} className="w-full h-48 object-cover rounded-lg" loading="lazy" />
          </div>
          <DialogDescription className="mt-2">
            Select a booking type and fill out the form below to book {celeb?.name}
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle booking logic here
            if (method === "gift") {
              navigate("/payment", { state: { celeb, tier, appearance, shoutout, VIP, custom, date, method, vacation, podcast, keynote, charity, secret, hospital, birthday, tour, brand, award, comedy } });
            } else if (method === "paypal" || method === "cashapp" || method === "venmo" || method === "crypto" || method === "wire" || method === "mg" || method === "wu") {
              // Handle other payment methods just submit
              handleBooking().then(() => {
                if (loading) {
                  toast({ title: "Booking in progress", description: `Booking ${celeb?.name}...`, status: "info" });
                } else {
                  onOpenChange(false); // Close the modal after booking
                  navigate("/booking-confirmation", { state: { celeb, tier, appearance, shoutout, VIP, custom, date, method, vacation, podcast, keynote, charity, secret, hospital, birthday, tour, brand, award, comedy } });
                  toast({ title: "Booking successful!", description: `You have successfully booked ${celeb?.name}.`, status: "success" });
                }
              });
            } else {
              // Handle other cases
              handleBooking().then(() => {
              if (loading) {
                toast({ title: "Booking in progress", description: `Booking ${celeb?.name}...`, status: "info" });
              } else {
                onOpenChange(false); // Close the modal after booking
                navigate("/booking-confirmation", { state: { celeb, tier, appearance, shoutout, VIP, custom, date, method, vacation, podcast, keynote, charity, secret, hospital, birthday, tour, brand, award, comedy } });
                toast({ title: "Booking successful!", description: `You have successfully booked ${celeb?.name}.`, status: "success" });
              }
            });
            }
          }}
        >
          <div className="grid gap-2">
            <Label>Booking Type</Label>
            <Select defaultValue="meet">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meet">Meet & Greet (In-Person) ${TIERS.find((t) => t.id === tier)?.price ?? 0}</SelectItem>
                <SelectItem value="shoutout">Video Shoutout (Personalized) ${TIERS.find((t) => t.id === shoutout)?.price ?? 0}</SelectItem>
                <SelectItem value="appearance">Appearance (Virtual) ${TIERS.find((t) => t.id === appearance)?.price ?? 0}</SelectItem>
                <SelectItem value="vip">VIP Experience (Exclusive Access) ${TIERS.find((t) => t.id === VIP)?.price ?? 0}</SelectItem>
                <SelectItem value="dinner">Dinner Event (In-Person) ${TIERS.find((t) => t.id === dinner)?.price ?? 0}</SelectItem>
                <SelectItem value="vacation">Vacation Package (All-Inclusive) ${TIERS.find((t) => t.id === vacation)?.price ?? 0}</SelectItem>
                <SelectItem value="podcast">Podcast Guest Appearance (Virtual) ${TIERS.find((t) => t.id === podcast)?.price ?? 0}</SelectItem>
                <SelectItem value="keynote">Keynote Speaking Engagement (Virtual) ${TIERS.find((t) => t.id === keynote)?.price ?? 0}</SelectItem>
                <SelectItem value="charity">Charity Event Appearance (In-Person) ${TIERS.find((t) => t.id === charity)?.price ?? 0}</SelectItem>
                <SelectItem value="secret">Secret Event (In-Person) ${TIERS.find((t) => t.id === secret)?.price ?? 0}</SelectItem>
                <SelectItem value="hospital">Hospital Visit (In-Person) ${TIERS.find((t) => t.id === hospital)?.price ?? 0}</SelectItem>
                <SelectItem value="birthday">Birthday Message (Virtual) ${TIERS.find((t) => t.id === birthday)?.price ?? 0}</SelectItem>
                <SelectItem value="tour">Tour Appearance (In-Person) ${TIERS.find((t) => t.id === tour)?.price ?? 0}</SelectItem>
                <SelectItem value="brand">Brand Partnership (In-Person) ${TIERS.find((t) => t.id === brand)?.price ?? 0}</SelectItem>
                <SelectItem value="award">Award Show Appearance (In-Person) ${TIERS.find((t) => t.id === award)?.price ?? 0}</SelectItem>
                <SelectItem value="comedy">Comedy Show Appearance (In-Person) ${TIERS.find((t) => t.id === comedy)?.price ?? 0}</SelectItem>
                <SelectItem value="custom">Custom Request (Contact Us)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2"><Label>Name</Label><Input required /></div>
            <div className="grid gap-2"><Label>Email</Label><Input type="email" required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* for Country/Region in select element */}
            <div className="grid gap-2">
              <Label>Country/Region</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country/region" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label>State</Label><Input required/></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2"><Label>Zip Code</Label><Input required /></div>
            <div className="grid gap-2"><Label>Town/City</Label><Input required/></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2"><Label>Phone</Label><Input type="tel" /></div>
            <div className="grid gap-2"><Label>Location</Label><Input required /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2"><Label>Date</Label><Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div className="grid gap-2"><Label>Time</Label><Input type="time" required value={time} onChange={(e) => setTime(e.target.value)} /></div>
          </div>
          <div className="grid gap-2"><Label>Message</Label><Textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} /></div>
 
          <div className="grid gap-2">
            <Label>Preferred Payment Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="cashapp">CashApp</SelectItem>
                <SelectItem value="venmo">Venmo</SelectItem>
                <SelectItem value="zelle">Zelle</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="wire">Wire Transfer</SelectItem>
                <SelectItem value="gift">Gift Card</SelectItem>
                <SelectItem value="mg">Moneygram</SelectItem>
                <SelectItem value="wu">Western Union</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">Submit Booking</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

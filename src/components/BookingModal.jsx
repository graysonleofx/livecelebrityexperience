import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { Celebrity } from "@/data/celebrities";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import supabase from "@/lib/supabaseClient"; // Ensure you have the Supabase client set up
import {useToast} from "@/hooks/use-toast"; // Custom hook for toast notifications
import emailjs from "emailjs-com"; // Ensure you have emailjs-com installed
import { Gift } from "lucide-react";

const BOOKING_TYPES = [
  { value: "Meet & Greet", label: "Meet & Greet (In-Person)", price: 5000 }, // $50.00
  { value: "Appearance", label: "Appearance (Virtual)", price: 3000 }, // $30.00
  { value: "Video Shoutout", label: "Video Shoutout (Personalized)", price: 10000 }, // $100.00
  { value: "VIP Experience", label: "VIP Experience", price: 20000 }, // $200.00
  { value: "Dinner Date", label: "Dinner Date", price: 30000 }, // $300.00
  { value: "Vacation Package", label: "Vacation Package", price: 50000 }, // $500.00
  { value: "Podcast Interview", label: "Podcast Interview", price: 20000 }, // $200.00
  { value: "Keynote Speech", label: "Keynote Speech", price: 15000 }, // $150.00
  { value: "Charity Event Participation", label: "Charity Event Participation", price: 25000 }, // $250.00
  { value: "Secret Meet", label: "Secret Meet", price: 20000 }, // $200.00
  { value: "Hospital Visit", label: "Hospital Visit", price: 15000 }, // $150.00
  { value: "Birthday Surprise", label: "Birthday Surprise", price: 20000 }, // $200.00
  { value: "Tour with Celebrity", label: "Tour with Celebrity", price: 15000 }, // $150.00
  { value: "Brand Endorsement", label: "Brand Endorsement", price: 5000 }, // $50.00
  { value: "Award Ceremony Appearance", label: "Award Ceremony Appearance", price: 10000 }, // $100.00
  { value: "Comedy Show Appearance", label: "Comedy Show Appearance", price: 30000 }, // $300.00
  { value: "Private Concert", label: "Private Concert", price: 20000 }, // $200.00
  { value: "Sports Event Appearance", label: "Sports Event Appearance", price: 25000 }, // $250.00
  { value: "Fashion Show Appearance", label: "Fashion Show Appearance", price: 30000 }, // $300.00
  { value: "Merchandise Bundle", label: "Merchandise Bundle", price: 15000 }, // $150.00
  { value: "Fan Card Membership", label: "Fan Card Membership", price: 5000 }, // $50.00
  { value: "Concert Booking", label: "Concert Booking", price: 20000 }, // $200.00
  { value: "Custom Request", label: "Custom Request", price: 0 }, // Contact for pricing
];

const PAYMENT_METHODS = [
  { value: "paypal", label: "PayPal" },
  { value: "cashapp", label: "CashApp" },
  { value: "venmo", label: "Venmo" },
  { value: "zelle", label: "Zelle" },
  { value: "crypto", label: "Crypto" },
  { value: "wire", label: "Wire Transfer" },
  { value: "gift", label: "Gift Card" },
  { value: "mg", label: "Moneygram" },
  { value: "wu", label: "Western Union" },
];

const GIFT_CARDS = [
  // Gift card payment 
  { value: "amazon", label: "Amazon Gift Card" },
  { value: "apple", label: "Apple Gift Card" },
  { value: "google", label: "Google Play Gift Card" },
  { value: "steam", label: "Steam Gift Card" },
  { value: "xbox", label: "Xbox Gift Card" },
  { value: "playstation", label: "PlayStation Gift Card" },
  { value: "nintendo", label: "Nintendo eShop Gift Card" },
  { value: "shopify", label: "Shopify Gift Card" },
  { value: "target", label: "Target Gift Card" },
  { value: "walmart", label: "Walmart Gift Card" },
];
const CRYPTO_CURRENCIES = [
  { value: "bitcoin", label: "Bitcoin" },
  { value: "ethereum", label: "Ethereum" },
  { value: "litecoin", label: "Litecoin" },
  { value: "ripple", label: "Ripple" },
  { value: "dogecoin", label: "Dogecoin" },
];

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


const BookingModal = ({ open, onOpenChange, celeb }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const formRef = useRef();
  // const [form, setForm] = useState({
  //   message: "",
  //   bookingType: "Meet & Greet",
  //   paymentMethod: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };

  // Booking details 
  const [bookingType, setBookingType] = useState("Meet & Greet");
  const [concertTitle, setConcertTitle] = useState("");
  const [concertDescription, setConcertDescription] = useState("");
  const [concertLocation, setConcertLocation] = useState("");
  const [concertAudience, setConcertAudience] = useState("");
  const [concertTicketLink, setConcertTicketLink] = useState("");
  const [concertBudget, setConcertBudget] = useState("");
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
  const [concert, setConcert] = useState("Concert Booking")
  const [sports, setSports] = useState("Sports Event Appearance");
  const [fashion, setFashion] = useState("Fashion Show Appearance");
  const [merch, setMerch] = useState("Merchandise Bundle");
  const [fan, setFan] = useState("Fan Card Membership");
  const [custom, setCustom] = useState("Custom Request");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");


  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data) {
        setUser(data?.user);
      } else {
        setUser(null);
      }
    });
  }, []);

  



  // Booking Data in one object
  const getBookingData = () => {
    return {
      celeb,
      bookingType,
      appearance,
      shoutout,
      VIP,
      custom,
      date,
      time,
      method,
      concert,
      vacation,
      podcast,
      keynote,
      charity,
      secret,
      hospital,
      birthday,
      tour,
      brand,
      award,
      comedy,
        ...(bookingType === "Concert Booking" && {
          title: concertTitle,
          description: concertDescription,
          location: concertLocation,
          audience: concertAudience,
          ticketLink: concertTicketLink,
          budget: concertBudget
        }),
      fan,
      merch,
      sports,
      fashion,
      zipCode,
      city,
      location,
      name,
      email,
      phone,
      state
    };
  };

  const handleBooking = async (e) => {
    e.preventDefault();
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
    }  else {
      const serviceId = "service_my0gc0m";
      const templateId = "template_d75vhw4";
      const userId = "RbqwTYSXKLrKFzj64";
      try {
        await emailjs.sendForm(serviceId, templateId, formRef.current, userId)
        .then((result) => {
          console.log("Email sent successfully:", result.text);
          toast({ 
            title: "Booking Sent!", 
            description: `Your booking for ${celeb.name} has been sent successfully.`, 
            status: "success" 
          });
          // Reset form fields
          formRef.current.reset();
          onOpenChange(false); // Close the modal after booking
          navigate("/booking-confirmation", { state: { celeb, bookingData: getBookingData() } });
        }).catch((error) => {
        console.log("Email sent failed:", error.text);
      });
        } catch (error) {
          console.log("Email sent failed:", error.text);
          toast({
            title: "Booking failed",
            description: error.text || "There was an error sending your booking.",
              status: "error" 
            });
          } finally {
        setLoading(false);
      }
    }
  };

  

  const [country, setCountry] = useState("");


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex lg:flex-row sm:flex-col justify-center max-w-3xl p-2 bg-card rounded-lg shadow-lg w-full h-[580px] overflow-y-auto">
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
          ref={formRef}
          onSubmit={handleBooking}
        >
          {/* <input type="hidden" name="celeb_name" value={celeb?.name || ""} /> */}
          <div className="grid gap-2">
            <Label>Booking Type</Label>
            <Select name="bookingType" defaultValue={BOOKING_TYPES[0].value} onValueChange={(value) => setBookingType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {BOOKING_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label} ${type.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Concert specific fields */}
          {BOOKING_TYPES.find(type => type.value === bookingType)?.label === "Concert Booking" && (
            <div className="grid gap-3 border rounded-md p-3">
              <div className="grid gap-2">
                <Label required>Concert Title</Label>
                <Input name="concertTitle" value={concertTitle} onChange={e => setConcertTitle(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label required>Concert Description</Label>
                <Textarea name="concertDescription" value={concertDescription} onChange={e => setConcertDescription(e.target.value)} required rows={2} />
              </div>
              <div className="grid gap-2">
                <Label required>Concert Location</Label>
                <Input name="concertLocation" value={concertLocation} onChange={e => setConcertLocation(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label>Expected Audience Size (optional)</Label>
                <Input name="concertAudience" value={concertAudience} onChange={e => setConcertAudience(e.target.value)} type="number" min="0" />
              </div>
              <div className="grid gap-2">
                <Label>Ticket Link (optional)</Label>
                <Input name="concertTicketLink" value={concertTicketLink} onChange={e => setConcertTicketLink(e.target.value)} type="url" />
              </div>
              <div className="grid gap-2">
                <Label>Budget/Offer (optional)</Label>
                <Input name="concertBudget" value={concertBudget} onChange={e => setConcertBudget(e.target.value)} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input name="name" required />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input name="email" type="email" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* for Country/Region in select element */}
            <div className="grid gap-2">
              <Label>Country/Region</Label>
              <Select name="country" defaultValue={COUNTRIES[0].code}>
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
            <div className="grid gap-2">
              <Label>State</Label>
              <Input name="state" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Zip Code</Label>
              <Input name="zip" required />
            </div>
            <div className="grid gap-2">
              <Label>Town/City</Label>
              <Input name="city" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input name="phone" type="tel" required />
            </div>
            <div className="grid gap-2">
              <Label>Location</Label>
              <Input name="location" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Date</Label>
              <Input name="date" type="date" required onChange={e => setDate(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Time</Label>
              <Input name="time" type="time" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Message</Label>
            <Textarea name="message" rows={3} required />
          </div>

          <div className="grid gap-2">
            <Label>Preferred Payment Method</Label>
            <Select name="paymentMethod" defaultValue={PAYMENT_METHODS[0].value} onValueChange={(value) => setMethod(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <input type="hidden" name="paymentMethod" value={method} /> */}
          </div>

          {PAYMENT_METHODS.find(m => m.value === method)?.value === "gift" && (
            // Gift card payment method
            <div>
              <div className="grid gap-2">
                <Label>Gift Card Type</Label>
                <Select name="giftCardType" defaultValue={GIFT_CARDS[0].value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gift card type" />
                  </SelectTrigger>
                  <SelectContent>
                    {GIFT_CARDS.map((card) => (
                      <SelectItem key={card.value} value={card.value}>
                        {card.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2 mt-4">
                <Label>Gift Card Number</Label>
                <Input name="giftCardNumber" required />
              </div>

            </div>

          )}

          {PAYMENT_METHODS.find(m => m.value === method)?.value === "crypto" && (
            <div className="grid gap-2">
              <Label>Select Cryptocurrency</Label>
              <Select name="cryptoCurrency" defaultValue={CRYPTO_CURRENCIES[0].value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  {CRYPTO_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? 'Submitting...' : 'Submit Booking'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

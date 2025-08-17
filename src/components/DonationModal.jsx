import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabaseClient"; // Ensure you have the Supabase client set up
import emailjs from "emailjs-com";

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

const CRYPTO_CURRENCIES = [
  { value: "bitcoin", label: "Bitcoin" },
  { value: "ethereum", label: "Ethereum" },
  { value: "litecoin", label: "Litecoin" },
  { value: "ripple", label: "Ripple" },
  { value: "dogecoin", label: "Dogecoin" },
];

const GIFT_CARDS = [
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

const DonationModal = ({ open, onOpenChange, celeb }) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [cryptoCurrency, setCryptoCurrency] = useState("Bitcoin");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [selectedGiftCard, setSelectedGiftCard] = useState("");
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data) {
        setUser(data?.user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!user) {
      setLoading(false);
      toast({ title: "Error", description: "You must be logged in to donate.", variant: "destructive" });
      onOpenChange(false);
      navigate("/signin", { state: { from: "donation" } });
      return;
    } else if (!amount || !name || !email || !paymentMethod) {
      setLoading(false);
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    } else if (isNaN(amount) || amount <= 0) {
      setLoading(false);
      toast({ title: "Error", description: "Please enter a valid donation amount.", variant: "destructive" });
      return;
    } else if (paymentMethod === "crypto" && !cryptoCurrency){
      setLoading(false);
      toast({ title: "Error", description: "Please select a cryptocurrency.", variant: "destructive" });
      return;
    }
    else if (paymentMethod === "gift" && (!giftCardCode || !selectedGiftCard)) {
      setLoading(false);
      toast({ title: "Error", description: "Please fill in all gift card details.", variant: "destructive" });
      return;
    }

    try {
      await emailjs.sendForm(
        "service_my0gc0m",
        "template_d75vhw4",
        formRef.current,
        "RbqwTYSXKLrKFzj64",
      ).then((result) => {
        console.log(result);
        toast({ title: "Donation Received", description: `Payment details will be sent to ${email} for your donation of $${amount}.`, variant: "default" });
        formRef.current.reset();
        onOpenChange(false);
      }).catch((error) => {
        console.error("Error sending email:", error);
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
      });
    }
    catch (error) {
      console.error("Error sending email:", error);
      toast({ title: "Error", description: "Failed to send donation. Please try again later.", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Donate to {celeb?.name}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-4"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="subject" value={`Donation from ${name} (${email})`} />
          <div className="grid gap-2">
            <Label>Amount</Label>
            <Input name="amount" type="number" min={1} step={1} value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label>Payment Method</Label>
            <Select name="paymentMethod" defaultValue={PAYMENT_METHODS[0].value} onValueChange={value => setPaymentMethod(value)} required>
              <SelectTrigger><SelectValue placeholder="Method" /></SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {PAYMENT_METHODS.find(method => method.value === paymentMethod)?.value === "crypto" && (
            <div className="grid gap-2">
              <Label>Cryptocurrency</Label>
              <Select name="cryptoCurrency" defaultValue={CRYPTO_CURRENCIES[0].value} onValueChange={value => setCryptoCurrency(value)} required>
                <SelectTrigger><SelectValue placeholder="Select cryptocurrency" /></SelectTrigger>
                <SelectContent>
                  {CRYPTO_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>{currency.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {PAYMENT_METHODS.find(method => method.value === paymentMethod)?.value === "gift" && (
            <div className="grid gap-2">
              <Label>Gift Card</Label>
              <Select name="giftCardType" defaultValue={GIFT_CARDS[0].value} onValueChange={value => setSelectedGiftCard(value)} required>
                <SelectTrigger><SelectValue placeholder="Select gift card" /></SelectTrigger>
                <SelectContent>
                  {GIFT_CARDS.map((card) => (
                    <SelectItem key={card.value} value={card.value}>{card.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input name="giftCardNumber" placeholder="Gift Card Code" value={giftCardCode} onChange={(e) => setGiftCardCode(e.target.value)} required />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2"><Label>Name</Label><Input name="name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="grid gap-2"><Label>Email</Label><Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          </div>
          <Button type="submit" disabled={loading} className="w-full mt-4">{loading ? "Processing..." : "Submit Donation"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;

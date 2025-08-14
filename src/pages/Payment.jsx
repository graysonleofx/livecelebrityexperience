import SEO from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import supabase from "@/lib/supabaseClient"; // Ensure you have the Supabase client set up
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Method = ({ children }) => (
  <div className="grid gap-4 rounded-xl border p-4 bg-card">{children}</div>
);

const Payment = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state) || {};
  const defaultTab = state.method ?? "paypal";
  const amountCents = state.amount;
  const amountDisplay = typeof amountCents === "number" ? `$${(amountCents / 100).toFixed(2)}` : undefined;
  const tier = state.tier;
  const celeb = state.celeb;
  const appearance = state.appearance;
  const shoutout = state.shoutout;
  const VIP = state.VIP;
  const custom = state.custom;
  const date = state.date;
  const method = state.method;
  const vacation = state.vacation;
  const podcast = state.podcast;
  const keynote = state.keynote;
  const charity = state.charity;
  const secret = state.secret;
  const hospital = state.hospital;
  const birthday = state.birthday;
  const tour = state.tour;
  const brand = state.brand;
  const award = state.award;
  const comedy = state.comedy;

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [selectedGiftCard, setSelectedGiftCard] = useState("amazon");
  const [selectedAmount, setSelectedAmount] = useState("50");
  const [uploadProof, setUploadProof] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data) {
        setUser(data?.user);
      } else {
        setUser(null);
      }
    });
  }, []);


  // Handle payment for gift method
  const handlePaymentForGiftMethod = async () => {
    if (!validateFields()) {
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
      return;
    }

    // Prepare data for payment submission
    const paymentData = {
      userId: user?.id,
      giftCardCode,
      selectedGiftCard,
      selectedAmount,
      uploadProof,
      amountCents,
      tier,
      celeb,
      appearance,
      shoutout,
      VIP,
      custom,
      date,
      method,
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
      comedy
    };

    navigate("/booking-confirmation", { state: paymentData });
  };

  const handlePaymentForCryptoMethod = async(selectedCrypto) => {
    if (!selectedCrypto) {
      toast({ title: "Error", description: "Please select a cryptocurrency.", variant: "destructive" });
      return;
    }

    // Prepare data for payment submission
    const paymentData = {
      userId: user?.id,
      selectedCrypto,
      amountCents,
      tier,
      celeb,
      appearance,
      shoutout,
      VIP,
      custom,
      date,
      method,
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
      comedy
    };

    navigate("/booking-confirmation", { state: paymentData });
  };

  // validate all input fields
  const validateFields = () => {
    if (method === "gift") {
      if (!giftCardCode || !selectedGiftCard || !selectedAmount || !uploadProof) {
        setErrorMessage("All fields are required.");
        return false;
      }
    } else if (method === "crypto") {
      if (!selectedCrypto) {
        setErrorMessage("Please select a cryptocurrency.");
        return false;
      }
    }

    // Additional validation logic can be added here
    setErrorMessage(""); // Clear error message if validation passes

    return true;
  };

  const allowedMethods = ["gift", "crypto"];
  const showOnly = allowedMethods.includes(method) ? method : null;

  return (
    <div className="container mx-auto px-4 py-10">
      <SEO title="Payment — Celebrity Experience" description="Submit your payment information securely (UI only)." />
      <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {(!showOnly || showOnly === "gift") && <TabsTrigger value="gift">Gift Card</TabsTrigger>}
          {(!showOnly || showOnly === "crypto") && <TabsTrigger value="crypto">Crypto</TabsTrigger>}
          {/* <TabsTrigger value="paypal">PayPal</TabsTrigger>
          <TabsTrigger value="cashapp">CashApp</TabsTrigger>
          <TabsTrigger value="venmo">Venmo</TabsTrigger>
          <TabsTrigger value="zelle">Zelle</TabsTrigger>
          <TabsTrigger value="wire">Wire Transfer</TabsTrigger>
          <TabsTrigger value="mg">Moneygram</TabsTrigger>
          <TabsTrigger value="wu">Western Union</TabsTrigger> */}
        </TabsList>


        {(!showOnly || showOnly === "gift") && (
          <TabsContent value="gift"><Method>
          <div className="grid gap-2">
            <Label>Gift Card Code</Label>
            <Input onChange={(e) => setGiftCardCode(e.target.value)} placeholder="XXXX-XXXX-XXXX" />
          </div>
          {/* Select Gift Card */}
          <div className="grid gap-2">
            <Label> Select Gift Card</Label>
            <Select defaultValue="amazon" onValueChange={(value) => setSelectedGiftCard(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gift card" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amazon">Amazon</SelectItem>
                <SelectItem value="itunes">iTunes</SelectItem>
                <SelectItem value="google">Google Play</SelectItem>
                <SelectItem value="steam">Steam</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="playstation">PlayStation</SelectItem>
                <SelectItem value="nintendo">Nintendo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Select Gift Card Amount */}
          <div className="grid gap-2">
            <Label>Gift Card Amount</Label>
            <Select defaultValue="50" onValueChange={(value) => setSelectedAmount(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">$50</SelectItem>
                <SelectItem value="100">$100</SelectItem>
                <SelectItem value="200">$200</SelectItem>
                <SelectItem value="500">$500</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2"><Label>Upload Proof</Label><Input type="file" onChange={(e) => setUploadProof(e.target.files[0])} /></div>
          </Method></TabsContent>
        )}

        {(!showOnly || showOnly === "crypto") && (
          <TabsContent value="crypto"><Method>
          <div className="grid gap-2">
            <Label>Select Crypto Currency</Label>
            <Select defaultValue="bitcoin" onValueChange={(value) => setSelectedCrypto(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                <SelectItem value="litecoin">Litecoin (LTC)</SelectItem>
                <SelectItem value="ripple">Ripple (XRP)</SelectItem>
                <SelectItem value="dogecoin">Dogecoin (DOGE)</SelectItem>
                <SelectItem value="solana">Solana (SOL)</SelectItem>
                <SelectItem value="cardano">Cardano (ADA)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          </Method></TabsContent>
        )}

        {/* <TabsContent value="paypal"><Method>
          <div className="grid gap-2"><Label>PayPal Email</Label><Input type="email" /></div>
          <div className="grid gap-2"><Label>Upload Proof</Label><Input type="file" /></div>
        </Method></TabsContent>

        <TabsContent value="cashapp"><Method>
          <div className="grid gap-2"><Label>CashTag</Label><Input placeholder="$YourTag" /></div>
          <div className="grid gap-2"><Label>Upload Proof</Label><Input type="file" /></div>
        </Method></TabsContent>

        <TabsContent value="venmo"><Method>
          <div className="grid gap-2"><Label>Venmo Username</Label><Input placeholder="@username" /></div>
          <div className="grid gap-2"><Label>Upload Proof</Label><Input type="file" /></div>
        </Method></TabsContent>

        <TabsContent value="zelle"><Method>
          <div className="grid gap-2"><Label>Zelle Email/Phone</Label><Input /></div>
          <div className="grid gap-2"><Label>Upload Proof</Label><Input type="file" /></div>
        </Method></TabsContent>

        <TabsContent value="wire"><Method>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="grid gap-2"><Label>Bank Name</Label><Input /></div>
            <div className="grid gap-2"><Label>Account Number</Label><Input /></div>
            <div className="grid gap-2"><Label>SWIFT/IBAN</Label><Input /></div>
            <div className="grid gap-2"><Label>Account Name</Label><Input /></div>
          </div>
          <div className="grid gap-2"><Label>Upload Proof</Label><Input type="file" /></div>
        </Method></TabsContent>

        <TabsContent value="mg"><Method>
          <div className="grid gap-2"><Label>Sender Name</Label><Input /></div>
          <div className="grid gap-2"><Label>MTCN</Label><Input /></div>
          <div className="grid gap-2"><Label>Pickup or Bank</Label><Input /></div>
          <div className="grid gap-2"><Label>Upload Proof</Label><Input type="file" /></div>
        </Method></TabsContent>

        <TabsContent value="wu"><Method>
          <div className="grid gap-2"><Label>Sender Name</Label><Input /></div>
          <div className="grid gap-2"><Label>MTCN</Label><Input /></div>
          <div className="grid gap-2"><Label>Pickup or Bank</Label><Input /></div>
          <div className="grid gap-2"><Label>Upload Proof</Label><Input type="file" /></div>
        </Method></TabsContent> */}
      </Tabs>

      <Button
        className="mt-8"
        onClick={async (e) => {
          e.preventDefault();
          if (method === "gift") {
            await handlePaymentForGiftMethod();
          } else if (method === "crypto") {
            await handlePaymentForCryptoMethod(selectedCrypto);
          } else {
            // Handle other payment methods here
            toast({ title: "Payment Method", description: "This feature is under development.", variant: "info" });
          }
        }}
      >
        Submit Payment Info
      </Button>
    </div>
  );
};

export default Payment;

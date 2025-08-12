import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabaseClient"; // Ensure you have the Supabase client set up


const DonationModal = ({ open, onOpenChange, celeb }) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
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

  const handleSubmit = async () => {
    if(!user) {
      toast({ title: "Error", description: "You must be logged in to donate.", variant: "destructive" });
      onOpenChange(false);
      navigate("/signin", { state: { from: "donation" } });
      return;
    } else if (!amount || !name || !email || !paymentMethod) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    } else if (isNaN(amount) || amount <= 0) {
      toast({ title: "Error", description: "Please enter a valid donation amount.", variant: "destructive" });
      return;
    } 
    // Here you would handle the donation logic, e.g. show success
    toast({ title: "Donation Successful", description: `Thank you for your donation of $${amount} to ${celeb?.name}! Check your email for confirmation.`, variant: "default" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Donate to {celeb?.name}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <div className="grid gap-2"><Label>Amount</Label><Input type="number" min={1} step={1} value={amount} onChange={(e) => setAmount(e.target.value)} required /></div>
          <div className="grid gap-2">
            <Label>Payment Method</Label>
            <Select defaultValue="paypal" onValueChange={setPaymentMethod}>
              <SelectTrigger><SelectValue placeholder="Method" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="gift">Gift Card</SelectItem>
                <SelectItem value="crypto">Crypto Currency</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="cashapp">CashApp</SelectItem>
                <SelectItem value="venmo">Venmo</SelectItem>
                <SelectItem value="zelle">Zelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="grid gap-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          </div>
          <Button type="submit" className="w-full">Submit Donation</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;

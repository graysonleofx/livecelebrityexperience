import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const mockBookings = [
  { id: '1', name: 'Liam Carter', type: 'Meet & Greet', date: '2025-08-20', status: 'Confirmed' },
  { id: '2', name: 'Maya Rivers', type: 'Video Shoutout', date: '2025-09-04', status: 'Pending' },
];

const Dashboard = () => {
  const { toast } = useToast();
  return (
    <div className="container mx-auto px-4 py-10">
      <SEO title="Dashboard — Celebrity Experience" />
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

      <div className="grid gap-4">
        {mockBookings.map(b => (
          <Card key={b.id}>
            <CardHeader><CardTitle>{b.name}</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4 justify-between">
              <div className="text-sm text-muted-foreground">{b.type} · {b.date} · {b.status}</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={()=> toast({ title: 'Edit booking', description: 'UI only' })}>Edit</Button>
                <Button variant="destructive" onClick={()=> toast({ title: 'Booking canceled', description: 'UI only' })}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 id="how" className="text-2xl font-bold mt-12 mb-4">How It Works</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="pt-6">1. Browse and select a celebrity.</CardContent></Card>
        <Card><CardContent className="pt-6">2. Submit your booking details.</CardContent></Card>
        <Card><CardContent className="pt-6">3. Submit payment info — we confirm by email.</CardContent></Card>
      </div>

      <h2 id="pricing" className="text-2xl font-bold mt-12 mb-4">Pricing</h2>
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">
          Pricing varies by celebrity and request. Request a quote during booking.
        </CardContent>
      </Card>

      <div className="mt-12 grid gap-3 max-w-md">
        <Label>Invite a friend</Label>
        <div className="flex gap-2"><Input placeholder="Friend email" /><Button>Send invite</Button></div>
      </div>
    </div>
  );
};

export default Dashboard;

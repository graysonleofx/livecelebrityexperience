import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import supabase from "@/lib/supabaseClient";


const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
      .from('celebrities')
      .select('*');

      if (error) {
        toast({ title: 'Error fetching data', description: error.message });
      } else {
        setItems(data);
      }
    };
    fetchData();
  }, []);

  const handleSignInAdmin = () => {
    setAuthed(true);
    toast({ title: 'Signed in as admin', description: 'You now have access to the admin panel.' });
  }

  if (!authed) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <SEO title="Admin — Celebrity Experience" />
        <Card>
          <CardHeader><CardTitle>Admin Sign In</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={(e)=>{e.preventDefault(); handleSignInAdmin()}}>
              <div className="grid gap-2"><Label>Email</Label><Input type="email" required /></div>
              <div className="grid gap-2"><Label>Password</Label><Input type="password" required /></div>
              <Button type="submit">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <SEO title="Admin Dashboard — Celebrity Experience" />
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Card className="mb-6">
        <CardHeader><CardTitle>Add Celebrity</CardTitle></CardHeader>
        <CardContent>
          <form
            className="grid gap-3"
            onSubmit={(e)=>{
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const name = String(data.get('name') || '');
              const category = String(data.get('category') || '');
              setItems(prev=> [...prev, { id: Math.random().toString(36).slice(2), name, category }]);
              form.reset();
              toast({ title: 'Celebrity added', description: 'UI only' });
            }}
          >
            <div className="grid md:grid-cols-2 gap-3">
              <div className="grid gap-2"><Label>Name</Label><Input name="name" required /></div>
              <div className="grid gap-2"><Label>Select Category</Label>
                <Select name="category" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectItem value="actor">Actor</SelectItem>
                    <SelectItem value="singer">Singer</SelectItem>
                    <SelectItem value="athlete">Athlete</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label>Photo Link</Label>
                <Input type="text" name="photo" placeholder="Enter photo link" required />
                <p className="text-sm text-muted-foreground">Please provide a link to the celebrity's photo.</p>
              </div>
              <div className="grid gap-2 md:col-span-2"><Label>Description</Label><Textarea rows={3} /></div>
              <div className="grid gap-2"><Label>Price</Label><Input type="number" name="price" required /></div>
              <div className="grid gap-2"><Label>Rating</Label><Input type="number" name="rating" required /></div>

            </div>
            <Button className="mt-2">Add Celebrity</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All Celebrities</CardTitle></CardHeader>
        <CardContent className="grid gap-2">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">No celebrities added yet.</p>
          ) : (
            items.map(item => (
              <Card key={item.id} className="flex justify-between items-center p-4">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-10 mb-4">Bookings & Payments</h2>
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">All user submissions would appear here (UI only).</CardContent>
      </Card>
    </div>
  );
};

export default Admin;

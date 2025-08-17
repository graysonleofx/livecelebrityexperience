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

const CATEGORY_OPTIONS = [
  { value: 'actor', label: 'Actor' },
  { value: 'actress', label: 'Actress' },
  { value: 'singer', label: 'Singer' },
  { value: 'dancer', label: 'Dancer' },
  { value: 'comedian', label: 'Comedian' },
  { value: 'writer', label: 'Writer' },
  { value: 'influencer', label: 'Influencer' },
  { value: 'model', label: 'Model' },
  { value: 'musician', label: 'Musician' },
  { value: 'athlete', label: 'Athlete' },
  { value: 'other', label: 'Other' },
];

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState([]);
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

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
    if (email !== 'admin@admin.com' || password !== 'admin04') {
      setAuthed(false);
      toast({ title: 'Invalid credentials', description: 'Please check your email and password.', variant: 'destructive' });
      return;
    }
    setAuthed(true);
    toast({ title: 'Signed in as admin', description: 'You now have access to the admin panel.' });
  }

  const handleAddCelebrity = async(name, category, photo, description, price, rating, availability) => {
    const {data, error} = await supabase
      .from('celebrities')
      .insert([{ name, category, photo, description, price, rating, availability }])
      .select();

    if (error || !data || data.length === 0) {
      toast({ title: 'Error adding celebrity', description: error?.message || 'No data returned', variant: 'destructive' });
      console.error(data, error);
      return;
    } else {
      setItems(prev => [...prev, { id: data[0].id, name, category, photo, description, price, rating, availability }]);
      toast({ title: 'Celebrity added', description: 'Celebrity added successfully.' });
    }
  };

  const handleCelebrityEdit = async (id, updatedData) => {
    const { data, error } = await supabase
      .from('celebrities')
      .update(updatedData)
      .eq('id', id)
      .select();

    if (error || !data || data.length === 0) {
      toast({ title: 'Error updating celebrity', description: error?.message || 'No data returned', variant: 'destructive' });
      console.error(data, error);
      return;
    } else {
      setItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
      toast({ title: 'Celebrity updated', description: 'Celebrity updated successfully.' });
    }
  };

  if (!authed) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <SEO title="Admin — Celebrity Experience" />
        <Card>
          <CardHeader><CardTitle>Admin Sign In</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={(e)=>{e.preventDefault(); handleSignInAdmin()}}>
              <div className="grid gap-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div className="grid gap-2"><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
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
              const formData = new FormData(e.target);
              const name = String(formData.get('name') || '');
              const category = String(formData.get('category') || '');
              const photo = String(formData.get('photo') || '');
              const description = String(formData.get('description') || '');
              const price = Number(formData.get('price') || 0);
              const rating = Number(formData.get('rating') || 0);
              const availability = true;

              if (editingItem) {
                handleCelebrityEdit(editingItem, { name, category, photo, description, price, rating, availability });
                setEditingItem(null);
              } else {
                handleAddCelebrity(name, category, photo, description, price, rating, availability);
              }
              setName('');
              setCategory('');
              setPhoto('');
              setDescription('');
              setPrice('');
              setRating('');
              setAvailability(true);
            }}
          >
            <div className="grid md:grid-cols-2 gap-3">
              <div className="grid gap-2"><Label>Name</Label><Input name="name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
              <div className="grid gap-2"><Label>Select Category</Label>
                <Select name="category" defaultValue={CATEGORY_OPTIONS[0].value} onValueChange={value => setCategory(value)} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label>Celebrity Photo Link</Label>
                <Input type="text" name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Enter photo link" required />
                <p className="text-sm text-muted-foreground">Please provide a link to the celebrity's photo.</p>
              </div>
              <div className="grid gap-2 md:col-span-2"><Label>Description</Label><Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></div>
              <div className="grid gap-2"><Label>Price</Label><Input type="number" name="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required /></div>
              <div className="grid gap-2"><Label>Rating</Label><Input type="number" name="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} required /></div>

            </div>
            <Button className="mt-2" type="submit">{editingItem ? 'Update Celebrity' : 'Add Celebrity'}</Button>
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
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingItem(item.id);
                    setName(item.name);
                    setCategory(item.category);
                    setPhoto(item.photo);
                    setDescription(item.description);
                    setPrice(item.price);
                    setRating(item.rating);
                  }}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={async () => {
                    const { error } = await supabase.from('celebrities').delete().eq('id', item.id);
                    if (error) {
                      toast({ title: 'Error deleting celebrity', description: error.message, variant: 'destructive' });
                    } else {
                      setItems(prev => prev.filter(i => i.id !== item.id));
                      toast({ title: 'Celebrity deleted', description: 'Celebrity deleted successfully.' });
                    }
                  }}>Delete</Button>
                </div>
              </Card>
            ))
          )}
        </CardContent>
      </Card>

      {/* <h2 className="text-2xl font-bold mt-10 mb-4">Bookings & Payments</h2>
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground">All user submissions would appear here (UI only).</CardContent>
      </Card> */}
    </div>
  );
};

export default Admin;

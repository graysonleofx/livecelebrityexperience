import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Item { id: string; name: string; category: string }

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const { toast } = useToast();

  if (!authed) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <SEO title="Admin — Celebrity Experience" />
        <Card>
          <CardHeader><CardTitle>Admin Sign In</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={(e)=>{e.preventDefault(); setAuthed(true)}}>
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
              const form = e.currentTarget as HTMLFormElement;
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
              <div className="grid gap-2"><Label>Category</Label><Input name="category" required /></div>
              <div className="grid gap-2 md:col-span-2"><Label>Photo</Label><Input type="file" /></div>
              <div className="grid gap-2 md:col-span-2"><Label>Description</Label><Textarea rows={3} /></div>
            </div>
            <Button className="mt-2">Add Celebrity</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All Celebrities</CardTitle></CardHeader>
        <CardContent className="grid gap-2">
          {items.length === 0 && <p className="text-sm text-muted-foreground">No items yet.</p>}
          {items.map(i => (
            <div key={i.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="text-sm">{i.name} · {i.category}</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={()=> toast({ title: 'Edit', description: 'UI only' })}>Edit</Button>
                <Button variant="destructive" onClick={()=> setItems(items.filter(x=>x.id!==i.id))}>Delete</Button>
              </div>
            </div>
          ))}
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

import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import supabase from "@/lib/supabaseClient";

const CelebrityCard = ({ celeb, onBook, onDonate }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(celeb.rating));
  return (
    <Card className="overflow-hidden rounded-2xl">
      <img src={celeb.photo} alt={`${celeb.name} portrait`} loading="lazy" className="h-56 w-full object-cover" />
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{celeb.name}</h3>
            <p className="text-sm text-muted-foreground">{celeb.category}</p>
          </div>
          <div className="flex items-center gap-0.5" aria-label={`Rating ${celeb.rating} out of 5`}>
            {stars.map((s, idx) => (
              <Star key={idx} className={`h-4 w-4 ${s ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
            ))}
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="flex-1" onClick={() => onBook(celeb)}>Book Now</Button>
          <Button variant="outline" className="flex-1" onClick={() => onDonate(celeb)}>
            <Heart className="mr-2 h-4 w-4" /> Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CelebrityCard;

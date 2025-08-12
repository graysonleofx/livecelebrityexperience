
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Props {
  query: string; onQuery: (v: string) => void;
  category: string; onCategory: (v: string) => void;
  rating: string; onRating: (v: string) => void;
  available: boolean; onAvailable: (v: boolean) => void;
}

const SearchAndFilters = ({ query, onQuery, category, onCategory, rating, onRating, available, onAvailable }: Props) => {
  const handleCategoryChange = (value: string) => {
    onCategory(value === "all" ? "" : value);
  };

  const handleRatingChange = (value: string) => {
    onRating(value === "any" ? "" : value);
  };

  // Convert empty strings to "all"/"any" for display
  const displayCategory = category === "" ? "all" : category;
  const displayRating = rating === "" ? "any" : rating;

  return (
    <div className="grid gap-4 rounded-xl border p-4 bg-card">
      <div className="grid gap-2">
        <Label htmlFor="search">Search</Label>
        <Input id="search" placeholder="Search celebrities by name" value={query} onChange={(e)=>onQuery(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label>Category</Label>
          <Select value={displayCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Actor">Actor</SelectItem>
              <SelectItem value="Artist">Artist</SelectItem>
              <SelectItem value="Musician">Musician</SelectItem>
              <SelectItem value="Athlete">Athlete</SelectItem>
              <SelectItem value="Comedian">Comedian</SelectItem>
              <SelectItem value="Influencer">Influencer</SelectItem>
              <SelectItem value="Speaker">Speaker</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Rating</Label>
          <Select value={displayRating} onValueChange={handleRatingChange}>
            <SelectTrigger><SelectValue placeholder=">= Any" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Availability</Label>
          <div className="flex items-center gap-3"><Switch checked={available} onCheckedChange={onAvailable} /><span className="text-sm text-muted-foreground">Only show available</span></div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;

import SEO from "@/components/SEO";
import SearchAndFilters from "@/components/SearchAndFilters";
import CelebrityCard from "@/components/CelebrityCard.jsx";
import { celebrities as allCelebs } from "@/data/celebrities";
import BookingModal from "@/components/BookingModal";
import DonationModal from "@/components/DonationModal";
import { useMemo, useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import SeedCelebrities from "@/data/SeedCelebrities";
import { useNavigate } from "react-router-dom";

const Browse = () => {

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [available, setAvailable] = useState(false);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [selected, setSelected] = useState();

  const [celebrities, setCelebrities] = useState([]);

  
  useEffect(() => {
    const fetchCelebrities = async ( ) => {
      const { data, error } = await supabase
        .from("celebrities")
        .select("*");

      if (error) {
        console.error("Error fetching celebrities:", error.message);
      } else {
        setCelebrities(data);
      }
    };
    fetchCelebrities();
  }, []);


  // SeedCelebrities();

  const filtered = useMemo(() => {
    return celebrities.filter((c) => {
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category ? c.category === category : true;
      const matchesRating = rating ? c.rating >= rating : true;
      const matchesAvailability = available ? c.available : true;

      return matchesQuery && matchesCategory && matchesRating && matchesAvailability;
    });
  }, [celebrities, query, category, rating, available]);

  const openBook = (c) => { setSelected(c); setBookingOpen(true); };
  const openDonate = (c) => { setSelected(c); setDonateOpen(true); };

  return (
    <div className="container mx-auto px-4 py-10">
      <SEO title="Browse Celebrities — Celebrity Experience" description="Search and filter celebrities by category, rating and availability." />
      <h1 className="text-3xl font-bold mb-4">Browse All Celebrities</h1>
      <SearchAndFilters
        query={query} onQuery={setQuery}
        category={category} onCategory={setCategory}
        rating={rating} onRating={setRating}
        available={available} onAvailable={setAvailable}
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CelebrityCard key={c.id} celeb={c} onBook={openBook} onDonate={openDonate} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No celebrities found matching your criteria.
          </div>
        )}
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} celeb={selected} />
      <DonationModal open={donateOpen} onOpenChange={setDonateOpen} celeb={selected} />
    </div>
  );
};

export default Browse;

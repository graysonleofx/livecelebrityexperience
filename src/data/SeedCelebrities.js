// Insert multiple dummy celebrities into Supabase table with fields: id, name, photo, description, category, price using Supabase JS client.
import supabase from "@/lib/supabaseClient"; // Ensure you have the Supabase client set up
import { useEffect } from "react";

export default function SeedCelebrities() {
  // This effect will run once when the component mounts
  useEffect(() => {
    const insertCelebrities = async () => {
      const { data, error } = await supabase
        .from("celebrities")
        .insert([
          {
            name: "John Doe",
            photo: "https://via.placeholder.com/150",
            description: "An amazing celebrity known for his incredible talent.",
            category: "Actor",
            price: 1000,
          },
          {
            name: "Jane Smith",
            photo: "https://via.placeholder.com/150",
            description: "A renowned singer with a powerful voice.",
            category: "Singer",
            price: 1500,
          },
          {
            name: "Mike Johnson",
            photo: "https://via.placeholder.com/150",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
          },
        ]);

      if (error) {
        console.error("Error inserting celebrities:", error);
      } else {
        console.log("Celebrities inserted successfully:", data);
      }
    };
    insertCelebrities();
    }, []);

};
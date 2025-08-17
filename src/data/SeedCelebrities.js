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
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "An amazing celebrity known for his incredible talent.",
            category: "Actor",
            price: 1000,
            rating: 4.5,
            availability: true
          },
          {
            name: "Hamdan bin Mohammed Al Maktoum",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/licensed-image.webp",
            description: "A renowned singer with a powerful voice.",
            category: "Singer",
            price: 1500,
            rating: 4.8,
            availability: true
          },
          {
            name: "Jessica Marie",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/download-1.jpeg",
            description: "A talented actress with numerous awards.",
            category: "Actress",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jelly Roll",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/07/GettyImages-1494691112-3eab9f5906f84b67b4f800b5c73bea8a-1024x774.jpg",
            description: "A talented singer and songwriter known for his unique style.",
            category: "Singer",
            price: 1800,
            rating: 4.5,
            availability: true
          },
          {
            name: "Terrence Dashon Howard",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/03/download-2.webp",
            description: "A talented actor known for his powerful performances.",
            category: "Actor",
            price: 2000,
            rating: 4.8,
            availability: true
          },
          {
            name: "Gal Gadot ",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/03/Gal-Gadot-8dec17-GettyImages-888041954-683x1024-1.webp",
            description: "A talented actress known for her powerful performances.",
            category: "Actress",
            price: 2000,
            rating: 4.7,
            availability: true
          },
          {
            name: "De Rock",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/03/rok.jpg",
            description: "A talented actor known for his powerful performances.",
            category: "Actor",
            price: 2000,
            rating: 4.8,
            availability: true
          },
          {
            name: "Jennifer Joanna",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/IMG_0532.webp",
            description: "A talented actress known for her powerful performances.",
            category: "Actress",
            price: 2000,
            rating: 4.8,
            availability: true
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
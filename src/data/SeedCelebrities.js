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
            category: "",
            price: 1500,
            rating: 4.8,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
            availability: true
          },
          {
            name: "Jessica Marie Alba",
            photo: "https://web.bookastarlive.online/wp-content/uploads/2025/08/OIP.webp",
            description: "A popular influencer with millions of followers.",
            category: "Influencer",
            price: 2000,
            rating: 4.2,
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
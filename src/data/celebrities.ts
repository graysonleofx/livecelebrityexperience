import celeb1 from "@/assets/celebs/celeb1.jpg";
import celeb2 from "@/assets/celebs/celeb2.jpg";
import celeb3 from "@/assets/celebs/celeb3.jpg";
import celeb4 from "@/assets/celebs/celeb4.jpg";
import celeb5 from "@/assets/celebs/celeb5.jpg";
import celeb6 from "@/assets/celebs/celeb6.jpg";
import celeb7 from "@/assets/celebs/celeb7.jpg";
import celeb8 from "@/assets/celebs/celeb8.jpg";

export type Category =
  | "Actor"
  | "Musician"
  | "Athlete"
  | "Comedian"
  | "Influencer"
  | "Artist"
  | "Speaker";

export interface Celebrity {
  id: string;
  name: string;
  category: Category;
  rating: number; // 1-5
  available: boolean;
  photo: string;
}

export const celebrities: Celebrity[] = [
  { id: "1", name: "Liam Carter", category: "Actor", rating: 4.8, available: true, photo: celeb1 },
  { id: "2", name: "Ava Monroe", category: "Artist", rating: 4.7, available: true, photo: celeb2 },
  { id: "3", name: "Noah Reyes", category: "Actor", rating: 4.5, available: false, photo: celeb3 },
  { id: "4", name: "Maya Rivers", category: "Musician", rating: 4.9, available: true, photo: celeb4 },
  { id: "5", name: "Kai Thompson", category: "Athlete", rating: 4.6, available: true, photo: celeb5 },
  { id: "6", name: "Zoe Bennett", category: "Comedian", rating: 4.3, available: true, photo: celeb6 },
  { id: "7", name: "Riley Stone", category: "Influencer", rating: 4.1, available: false, photo: celeb7 },
  { id: "8", name: "Sofia Park", category: "Speaker", rating: 4.8, available: true, photo: celeb8 },
];

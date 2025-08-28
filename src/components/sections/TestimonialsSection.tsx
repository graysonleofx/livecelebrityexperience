import React from "react";
import Cl1 from '@/assets/celebs/testimony1.jpg'
import Cl2 from '@/assets/celebs/testimony2.jpg'
import Cl3 from '@/assets/celebs/testimony3.jpg'

const TestimonialsSection = () => {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="container mx-auto px-4 py-16">
      <h2 id="testimonials-title" className="text-2xl md:text-3xl font-bold mb-6 text-center">What People Say About Us</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <figure className="rounded-xl border bg-card p-5">
          <img src={Cl1} alt={'Bernice W.'} loading="lazy" className="h-[300px] w-full object-cover rounded-lg" />
          <blockquote className="text-base mt-3">“Absolutely magical! The video shoutout brought my sister to tears.”</blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">— Bernice W.</figcaption>
        </figure>
        <figure className="rounded-xl border bg-card p-5">
          <img src={Cl2} alt={'Clifford D.'} loading="lazy" className="h-[300px] w-full object-cover  rounded-lg" />
          <blockquote className="text-base mt-3">“Professional and effortless from start to finish. Highly recommended.”</blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">— Clifford D.</figcaption>
        </figure>
        <figure className="rounded-xl border bg-card p-5">
          <img src={Cl3} alt={'Daniel M.'} loading="lazy" className="h-[300px] w-full object-cover  rounded-lg" />
          <blockquote className="text-base mt-3">“The meet & greet exceeded expectations. Truly unforgettable.”</blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">— Daniel M.</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default TestimonialsSection;

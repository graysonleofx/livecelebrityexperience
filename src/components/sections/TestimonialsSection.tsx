import React from "react";
import clImg from '@/assets/celebs/celeb1.jpg'

const TestimonialsSection = () => {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="container mx-auto px-4 py-16">
      <h2 id="testimonials-title" className="text-2xl md:text-3xl font-bold mb-6 text-center">What People Say About Us</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <figure className="rounded-xl border bg-card p-5">
          <img src={clImg} alt={'Cl1'} loading="lazy" className="h-56 w-full object-cover" />
          <blockquote className="text-base mt-3">“Absolutely magical! The video shoutout brought my sister to tears.”</blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">— Jamie R.</figcaption>
        </figure>
        <figure className="rounded-xl border bg-card p-5">
          <img src={clImg} alt={'Cl1'} loading="lazy" className="h-56 w-full object-cover" />
          <blockquote className="text-base mt-3">“Professional and effortless from start to finish. Highly recommended.”</blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">— Priya K.</figcaption>
        </figure>
        <figure className="rounded-xl border bg-card p-5">
          <img src={clImg} alt={'Cl1'} loading="lazy" className="h-56 w-full object-cover" />
          <blockquote className="text-base mt-3">“The meet & greet exceeded expectations. Truly unforgettable.”</blockquote>
          <figcaption className="mt-3 text-sm text-muted-foreground">— Daniel M.</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default TestimonialsSection;

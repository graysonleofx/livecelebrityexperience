import React from "react";

const AboutSection = () => {
  return (
    <section id="about" aria-labelledby="about-title" className="container mx-auto px-4 py-16 bg-background text-center">
      <h2 id="about-title" className="text-2xl md:text-3xl font-bold mb-4">About the Celebrity Experience</h2>
      <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
        Get closer to the stars you love. Choose from personal video shoutouts, intimate meet & greets, or premium
        appearances tailored to your event. Every booking is handled with care, privacy, and professionalism so you
        can focus on creating unforgettable memories. Whether it’s a birthday, anniversary, or corporate event,
        our platform connects you with verified celebrities who are ready to make your occasion truly special.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
        <a
          href="/Browse"
          className="inline-flex items-center px-6 py-3 bg-gradient-brand text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Book Now
        </a>
        <a
          href="/Browse"
          className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors bg-background"
        >
          View Celebrities
        </a>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-xl border bg-card p-4">
          
          <h3 className="font-semibold mb-1">Personalized Moments</h3>
          <p className="text-sm text-muted-foreground">Make birthdays, anniversaries, and milestones truly special.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold mb-1">Seamless Booking</h3>
          <p className="text-sm text-muted-foreground">Select your tier, pick a time, and we’ll handle the rest.</p>
        </article>
        <article className="rounded-xl border bg-card p-4">
          <h3 className="font-semibold mb-1">Trusted Talent</h3>
          <p className="text-sm text-muted-foreground">Verified celebrities with proven track records of delighting fans.</p>
        </article>
      </div>
    </section>
  );
};

export default AboutSection;

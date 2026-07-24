import Image from "next/image";
import heroBanner from "~/assets/hero-banner.jpg";

export function HeroBanner() {
  return (
    <section className="max-w-8xl mx-auto w-full px-6 py-8">
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
        <Image
          src={heroBanner}
          alt="Banner Eletrostruct"
          className="h-auto w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-103"
        />
      </div>
    </section>
  );
}

import Image from 'next/image';
import Right from '../icons/Right';

export default function Hero() {
  return (
    <>
      <section className="hero md:mt-20">
        <div className="py-8 md:py-12">
          <h1 className="text-4xl font-semibold">
            Order Your Favorite <span className="text-primary">Food</span>
          </h1>
          <p className="mt-1 mb-6 text-gray-500 text-sm">
            Let us serve you with the most scrumptious delight that can be imagined!!<br/>
            All from the comfort of your home!!
          </p>
          <div className="flex gap-4 text-sm">
            <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
              Order now
              <Right />
            </button>
            <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
              Learn more
              <Right />
            </button>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
        </div>
      </section>
    </>
  );
}

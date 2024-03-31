import Hero from './components/layout/Hero';
import HomeMenu from './components/layout/HomeMenu';
import SectionHeaders from './components/layout/SectionHeaders';
import Header from './components/layout/header';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About Us'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>
      <section className='text-center my-8' id="contact">
        <SectionHeaders
          subHeader={"Don't Hesitate To"}
          mainHeader={'Contact Us At:'}
        />
        <div className='mt-4'>
        <a className="text-4xl text-gray-500" href="tel:+(91) 123 456 789">
          <h1>+(91) 123 456 789</h1>
        </a></div>
      </section>
    </>
  );
}

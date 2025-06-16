import Link from "next/link";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
  return (
    <div>
    <section className="bg-[url('/images/blue-banner-bubbles.jpg')] bg-cover bg-center bg-no-repeat h-[1000px] sm:h-[88rem] lg:h-[800px] flex items-center overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/70 before:to-black/50 before:z-0">
      <div className="Container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between">
          <div className="relative">
            <h5 className="font-Inter text-lg text-PrimaryColor-0 font-medium pl-9 relative before:absolute before:top-1/2 before:left-0 before:w-6 before:h-3 before:bg-[url(/images/cleaning-shapes2.png)] before:bg-no-repeat before:bg-[inherit] before:-translate-y-1/2">
              BEST CLEANING SERVICES
            </h5>
            <h1 className="font-Inter font-extrabold text-white text-[26px] leading-[44px] sm:text-5xl sm:leading-[68px] lg:text-[42px] lg:leading-[56px] xl:leading-[68px] 2xl:text-[60px] 2xl:leading-[70px] mt-6 mb-5">
              Bringing <span className="text-PrimaryColor-0">Professional</span>
              <br />
              Cleanliness To You.
            </h1>
            <p className="font-Poppins text-white opacity-65 border-b border-SecondaryColor-0 inline-block pb-[46px] relative before:absolute before:-bottom-[1px] before:left-0 before:bg-PrimaryColor-0 before:h-[1px] before:w-24 before:animate-dance7 mb-12">
              Need Clean of your home or office Just Feel Free contact us based{" "}
              <br className="lg:hidden xl:block" />
              web services We try to Help you as soon as possible clean.
            </p>
            <Link href="/book-appointment">
              <button className="primary-btn2 mt-1">
                Get Started Now
                <FaArrowRightLong size={20} />
              </button>
            </Link>
            <div className="absolute right-0 -top-24 animate-zoomInOut">
              <Image
                src="/images/hero-shape2.png"
                alt="Banner Shape 1"
                width={58}
                height={58}
                className="animate-zoomInOut"
              />
            </div>
            <div className="absolute right-0 bottom-0 animate-rotational">
              <Image
                src="/images/hero-shape4.png"
                alt="Banner Shape 2"
                width={58}
                height={58}
                className="animate-rotational"
              />
            </div>
          </div>
          <div>
            <Image
              src="/images/hero-thumb2.png"
              alt="Banner Thumbnail"
              width={515}
              height={600}
              className="relative top-[5rem] sm:top-[7rem] md:top-[7.5rem] lg:top-[4rem] 2xl:top-5"
            />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Banner;

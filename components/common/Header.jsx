/* eslint-disable no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaArrowRightLong,
  FaBars,
  FaFacebookF,
  FaLinkedinIn,
  FaPhone,
  FaPinterestP,
  FaRegClock,
  FaXTwitter,
  FaUser,
} from "react-icons/fa6";
import { BiChevronDown } from "react-icons/bi";
import Logo from "@/public/images/png-svg-header.png";
import { useState, useEffect } from "react";
import { IoMdCall, IoMdClose } from "react-icons/io";
import { TfiLocationPin } from "react-icons/tfi";
import { useSession, signOut } from "next-auth/react";
import { verifyUser } from "@/utils/api/common";
import { useRouter } from "next/router";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Add effect to handle expired session
  useEffect(() => {
    if (pathname === "/account/sign-in" && router.query.isSessionExpired === "expired") {
      signOut({ redirect: false });
    }
  }, [pathname, router.query.isSessionExpired]);

  //sticky
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 250
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Don't render mobile menu until after hydration
  const mobileMenu = isMounted ? (
    <ul
      className={`${
        isOpen ? "block" : "hidden"
      } text-right lg:w-fit ease-in-out flex-1 lg:flex space-y-2 lg:space-y-0 space-x-0  flex flex-col lg:flex-row capitalize text-base lg:bg-transparent py-3 lg:py-0 font-Poppins font-medium text-white transition-all duration-500
      `}
    >
      <Link
        href="/"
        className={`${
          pathname === "/" ? "active" : ""
        } text-HeadingColor-0 hover:text-PrimaryColor-0 text-left lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300`}
      >
        <span>Home</span>
      </Link>
      <Link
        className={`${
          pathname === "/about" ? "active" : ""
        } text-HeadingColor-0 hover:text-PrimaryColor-0 text-left lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300`}
        href="/about"
      >
        <span>About</span>
      </Link>
      <Link
        className={`${
          pathname === "/our-services" ? "active" : ""
        } text-HeadingColor-0 hover:text-PrimaryColor-0 text-left lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300 group relative`}
        href="/our-services"
      >
        <span className="flex items-center">
          Service
          <BiChevronDown className="ml-1" />
        </span>
        <div className="absolute pt-5 lg:pt-8 z-20">
          <ul className="shadow-lg hidden group-hover:block rounded-sm text-white w-[220px] text-left transition-all duration-500 text-sm py-4 bg-HeadingColor-0">
            <div className="px-5 group hover:bg-SecondaryColor-0">
              <li className="hover:ml-3 duration-300">
                <Link href="/service-details/house-cleaning" className="py-2 block">
                  House Cleaning
                </Link>
              </li>
            </div>
            <div className="px-5 group hover:bg-SecondaryColor-0">
              <li className="hover:ml-3 duration-300">
                <Link href="/service-details/deep-cleaning" className="py-2 block">
                  Deep Cleaning
                </Link>
              </li>
            </div>
            <div className="px-5 group hover:bg-SecondaryColor-0">
              <li className="hover:ml-3 duration-300">
                <Link href="/service-details/airbnb-cleaning" className="py-2 block">
                  Airbnb Cleaning
                </Link>
              </li>
            </div>
            <div className="px-5 group hover:bg-SecondaryColor-0">
              <li className="hover:ml-3 duration-300">
                <Link href="/service-details/office-cleaning" className="py-2 block">
                  Office Cleaning
                </Link>
              </li>
            </div>
            <div className="px-5 group hover:bg-SecondaryColor-0">
              <li className="hover:ml-3 duration-300">
                <Link href="/service-details/retail-space-cleaning" className="py-2 block">
                  Retail Space Cleaning
                </Link>
              </li>
            </div>
            <div className="px-5 group hover:bg-SecondaryColor-0">
              <li className="hover:ml-3 duration-300">
                <Link href="/service-details/event-cleaning" className="py-2 block">
                  Event Cleaning
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </Link>
      <Link
        className={`${
          pathname === "/book-appointment" ? "active" : ""
        } text-HeadingColor-0 hover:text-PrimaryColor-0 text-left lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300 whitespace-nowrap`}
        href="/book-appointment"
      >
        Book Appointment
      </Link>
      
      <Link
        className={`${
          pathname === "/pricing" ? "active" : ""
        } text-HeadingColor-0 hover:text-PrimaryColor-0 text-left lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300 whitespace-nowrap`}
        href="/pricing"
      >
        Pricing
      </Link>
      
      <Link
        className={`${
          pathname === "/contact" ? "active" : ""
        } text-HeadingColor-0 hover:text-PrimaryColor-0 text-left lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300 whitespace-nowrap`}
        href="/contact"
      >
        Contact
      </Link>
    </ul>
  ) : null;

  const UserMenu = () => {
    if (status === "loading") {
      return (
        <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
      );
    }

    // Check if we're on the sign-in page with expired session
    const isExpiredSession = pathname === "/account/sign-in" && router.query.isSessionExpired === "expired";

    if (status === "authenticated" && !isExpiredSession) {
      return (
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 text-HeadingColor-0 hover:text-PrimaryColor-0 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-SecondaryColor-0 flex items-center justify-center text-white">
              {session.user?.name?.[0] || session.user?.email?.[0] || <FaUser />}
            </div>
            <span className="hidden lg:block">{session.user?.name || session.user?.email}</span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <Link
                href="/account/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/account/my-booking"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Bookings
              </Link>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        href="/account/sign-in"
        className="inline-flex items-center gap-2 bg-SecondaryColor-0 text-white px-4 py-2 rounded-lg hover:bg-SecondaryColor-1 transition-colors"
      >
        <FaUser />
        <span>Sign In</span>
      </Link>
    );
  };

  return (
    <nav
      className={`w-full transition-all duration-300 bg-transparent relativee text-[#7d7f8c] z-[9999]`}
    >
      {/* top Navbar */}
      <header className="bg-SecondaryColor-0 overflow-hidden md:block relative z-10">
        <div className="Container flex items-center justify-between">
          <div className="flex items-center gap-10">
            <p className="font-Poppins text-[15px] text-white sm:flex items-center gap-2 relative before:absolute before:top-1/2 before:right-0 before:w-[1px] before:h-5 before:bg-BorderColor-0 before-:translate-1/2 hidden">
              <TfiLocationPin className="text-xl relative bottom-[2px]" />
              Kent Building
            </p>
          </div>
          <div className="flex items-center gap-6">
            <ul className="flex items-center border border-BorderColor3-0 rounded-lg gap-5 my-[5px] px-6 py-3">
              <li>
                <Link
                  href={"/"}
                  className="text-sm transition-all duration-500 text-white hover:text-PrimaryColor-0"
                >
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-sm transition-all duration-500 text-white hover:text-PrimaryColor-0"
                >
                  <FaXTwitter />
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-sm transition-all duration-500 text-white hover:text-PrimaryColor-0"
                >
                  <FaLinkedinIn />
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="text-sm transition-all duration-500 text-white hover:text-PrimaryColor-0"
                >
                  <FaPinterestP />
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:flex items-center gap-2 hidden">
            <h6 className="flex items-center gap-2 text-sm text-white font-Poppins font-light">
              <IoMdCall className="w-[14px] h-[14px] rounded-sm bg-white text-xs text-SecondaryColor-0" />
              Call :
            </h6>
            <Link
              href={"/"}
              className="font-Poppins font-medium text-sm text-white"
            >
              {" "}
              +44 7506 123456
            </Link>
          </div>
        </div>
      </header>
      {/* top Navbar */}
      <header
        className="header-section"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <div className="Container">
          {/* main Navbar */}
          <div className="flex flex-col lg:flex-row items-center justify-between lg:h-[100px] bg-white">
            {/* website Logo */}
            <div>
              <Link href="/">
                <Image
                  src={Logo}
                  className="hidden lg:block w-full h-auto object-contain"
                  alt="website_logo"
                  width={250}
                  height={70}
                  priority
                />
              </Link>
            </div>
            {/* small screen size */}
            <div className="px-3 w-full lg:hidden flex justify-between bg-khaki h-[70px] items-center p-3">
              <div className="w-64">
                <Link href="/">
                  <Image
                    src={Logo}
                    className="block lg:hidden w-full h-auto object-contain"
                    alt="constre_website_logo"
                    width={280}
                    height={90}
                    priority
                  />
                </Link>
              </div>
              {/* toggle bar mode. */}
              <button
                className="lg:hidden block focus:outline-none "
                onClick={toggleNavbar}
              >
                {/* modal open and close */}
                {isOpen ? (
                  <IoMdClose className="w-6 h-6 text-HeadingColor-0" />
                ) : (
                  <FaBars className="w-5 h-5 text-HeadingColor-0" />
                )}
              </button>
            </div>
            {/* All navLink are hear with active */}
            <div className="flex gap-6 items-center">
              {mobileMenu}
              <div className="hidden lg:flex items-center gap-4">
                <UserMenu />
              </div>
            </div>
            {/* large device visible button and search icon */}
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Header;

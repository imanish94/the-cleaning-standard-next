import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/images/blue-icon-brand.png" />
        
        {/* Primary Meta Tags */}
        <meta name="title" content="The Cleaning Standard - Professional Cleaning Services" />
        <meta name="description" content="Professional cleaning services for homes, offices, Airbnb properties, and commercial spaces. Deep cleaning, regular maintenance, and specialized cleaning solutions." />
        <meta name="keywords" content="cleaning services, house cleaning, office cleaning, Airbnb cleaning, deep cleaning, commercial cleaning, professional cleaners, cleaning company" />
        <meta name="author" content="The Cleaning Standard" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thecleaningstandard.com/" />
        <meta property="og:title" content="The Cleaning Standard - Professional Cleaning Services" />
        <meta property="og:description" content="Professional cleaning services for homes, offices, Airbnb properties, and commercial spaces. Deep cleaning, regular maintenance, and specialized cleaning solutions." />
        <meta property="og:image" content="/images/blue-icon-brand.png" />
        <meta property="og:site_name" content="The Cleaning Standard" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://thecleaningstandard.com/" />
        <meta property="twitter:title" content="The Cleaning Standard - Professional Cleaning Services" />
        <meta property="twitter:description" content="Professional cleaning services for homes, offices, Airbnb properties, and commercial spaces. Deep cleaning, regular maintenance, and specialized cleaning solutions." />
        <meta property="twitter:image" content="/images/blue-icon-brand.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0066cc" />
        <meta name="msapplication-TileColor" content="#0066cc" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="The Cleaning Standard" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://thecleaningstandard.com/" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

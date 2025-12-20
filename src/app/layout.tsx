import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// SEO Metadata
export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "OUNUU Health Alliance | Serving Communities, Saving Lives",
    template: "%s | OUNUU Health Alliance",
  },
  description:
    "OUNUU Health Alliance is a community-driven nonprofit transforming lives through accessible healthcare, emergency relief, and unwavering support for underserved communities in Nigeria. Join us in making a difference.",
  keywords: [
    "OUNUU Health Alliance",
    "Obiumunna Na Umuada United",
    "healthcare Nigeria",
    "community health",
    "nonprofit organization",
    "emergency relief",
    "healthcare outreach",
    "Abakaliki health",
    "Ebonyi State healthcare",
    "medical outreach",
    "community support",
    "volunteer Nigeria",
    "donate healthcare",
    "indigenous healthcare",
    "health optimization",
    "mental health Nigeria",
    "food relief",
    "emergency response",
    "CSR partnership",
    "healthcare nonprofit",
  ],
  authors: [{ name: "OUNUU Health Alliance" }],
  creator: "OUNUU Health Alliance",
  publisher: "OUNUU Health Alliance",

  // Application Name
  applicationName: "OUNUU Health Alliance",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://ounuu-health-alliance.vercel.app/",
    siteName: "OUNUU Health Alliance",
    title: "OUNUU Health Alliance | Serving Communities, Saving Lives",
    description:
      "Community-driven nonprofit transforming lives through accessible healthcare and support for underserved communities in Nigeria.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "OUNUU Health Alliance - Serving Communities and Saving Lives",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@OBiUMUNNAHEALTH",
    creator: "@OBiUMUNNAHEALTH",
    title: "OUNUU Health Alliance | Serving Communities, Saving Lives",
    description:
      "Community-driven nonprofit transforming lives through accessible healthcare and support for underserved communities in Nigeria.",
    images: ["/twitter-image.jpg"], // You'll need to create this image (1200x600px)
  },

  // Verification (Add when you have them)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Alternate Languages (if you add translations later)
  alternates: {
    canonical: "https://ounuu-health-alliance.vercel.app/",
  },

  // Category
  category: "nonprofit organization",

  // Manifest
  manifest: "./manifest.json", // You'll need to create this

  // Icons
  icons: {
    icon: [
      { url: "./favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "./apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#16a34a", // Green-600
      },
    ],
  },

  // Theme Color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
    { media: "(prefers-color-scheme: dark)", color: "#15803d" },
  ],

  // Other
  metadataBase: new URL("https://ounuu-health-alliance.vercel.app/"),
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "OUNUU Health Alliance",
    alternateName: "Obiumunna Na Umuada United Health Alliance",
    url: "https://ounuu-health-alliance.vercel.app/",
    logo: "https://ounuu-health-alliance.vercel.app/logo.svg",
    description:
      "OUNUU Health Alliance is a community-driven nonprofit transforming lives through accessible healthcare and support for underserved communities in Nigeria.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Plot 19/20 Mile 50 Layout between NEPA Junction & Ebonyi Voice Junction, Opposite MTN Branch office",
      addressLocality: "Abakaliki",
      addressRegion: "Ebonyi State",
      addressCountry: "Nigeria",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+234-806-328-9585",
        contactType: "customer service",
        email: "obiumunnanaumuadahealthallianc@gmail.com",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/share/1ZVnPZEPLe/",
      "https://www.instagram.com/obiumunnanaumuadahealth",
      "https://x.com/OBiUMUNNAHEALTH",
      "https://www.tiktok.com/@obiumunnanaumuada",
      "https://youtube.com/@obiumunnanaumuadahealthallianc",
    ],
    founder: {
      "@type": "Person",
      name: "Obiumunna Na Umuada United",
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    knowsAbout: [
      "Healthcare",
      "Community Support",
      "Emergency Relief",
      "Medical Outreach",
      "Mental Health",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OUNUU Health Alliance",
    url: "https://ounuu-health-alliance.vercel.app/",
    description:
      "Community-driven nonprofit transforming lives through accessible healthcare and support for underserved communities in Nigeria.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://ounuu-health-alliance.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Additional meta tags */}
        <meta name="geo.region" content="NG-EB" />
        <meta name="geo.placename" content="Abakaliki" />
        <meta name="geo.position" content="6.3241;8.1137" />
        <meta name="ICBM" content="6.3241, 8.1137" />

        {/* Mobile App Capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="OUNUU Health" />
      </head>
      <body
        className={`${inter.variable} ${dancingScript.variable} antialiased`}
      >
        <Navbar />
        <main id="main-content">{children}</main>
        <Analytics />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Footer />
      </body>
    </html>
  );
}

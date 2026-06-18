import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./styles/globals.scss";
import { AppProvider } from "./AppContext";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next"
import Footer from "@/components/UI/Footer";

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-sans",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://sporenkijker.be"),
    title: "Sporenkijker | WebGPU Live Digital Twin of Flanders Train Stations",
    description: "EN: Real-time WebGPU digital twin of Flanders train stations with live NMBS data. NL: Live 3D digitale tweeling van Vlaamse treinstations met realtime NMBS data. FR: Jumeau numérique 3D en direct des gares de Flandre avec données SNCB en temps réel.",
    keywords: [
        "trains", "railway", "NMBS", "SNCB", "digital twin", "3D", "WebGPU", "Flanders", "Belgium", "Haedin", "Antwerp", "real-time data",
        "treinen", "spoorwegen", "digitale tweeling", "Vlaanderen", "België", "Antwerpen", "live data", "treinuren",
        "trains", "chemins de fer", "jumeau numérique", "Flandre", "Belgique", "Anvers", "données en temps réel"
    ],
    authors: [{ name: "Haedin", url: "https://haedin.com" }],
    openGraph: {
        title: "Sporenkijker | Live Digital Twin of Flanders Train Stations",
        description: "Explore the top 10 train stations of Flanders in a live 3D WebGPU environment with real-time data. Built by Haedin.",
        url: "https://sporenkijker.be",
        siteName: "Sporenkijker",
        locale: "en_BE",
        type: "website",
        images: [
            {
                url: "/img/open-graph.webp",
                width: 1200,
                height: 630,
                alt: "Sporenkijker | WebGPU Live Digital Twin",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sporenkijker | WebGPU Live Digital Twin",
        description: "Real-time 3D visualization of Flanders train stations with live data.",
        images: ["/img/open-graph.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
    manifest: "/manifest.json",
    alternates: {
        canonical: "https://sporenkijker.be",
    }
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const { device } = userAgent({ headers: headersList });
    const isMobile = device.type === "mobile";

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "Sporenkijker",
                            "description": "A real-time WebGPU digital twin showcasing the top 10 train stations in Flanders with live NMBS/SNCB data.",
                            "url": "https://sporenkijker.be",
                            "image": "https://sporenkijker.be/img/open-graph.webp",
                            "applicationCategory": "Visualization",
                            "operatingSystem": "Any",
                            "author": {
                                "@type": "Organization",
                                "name": "Haedin",
                                "description": "A digital solutions & media company based in Antwerp, Belgium.",
                                "url": "https://haedin.com",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Antwerp",
                                    "addressCountry": "BE"
                                }
                            }
                        }),
                    }}
                />
            </head>
            <body className={`${notoSans.variable} antialiased`}>
                <AppProvider isMobile={isMobile}>{children}</AppProvider>
                <Analytics/>
                <Footer/>
            </body>
        </html>
    );
}

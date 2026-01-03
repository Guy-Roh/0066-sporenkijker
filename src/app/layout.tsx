import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.scss";
import { AppProvider } from "./AppContext";
import { userAgent } from "next/server";
import { headers } from "next/headers";

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-sans",
});

export const metadata: Metadata = {
    title: "Sporenkijker",
    description: "3D Digital Twin for Trainspotters",
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
            <body className={`${notoSans.variable} antialiased`}>
                <AppProvider isMobile={isMobile}>{children}</AppProvider>
            </body>
        </html>
    );
}

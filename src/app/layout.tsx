import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.scss";
import { AppProvider } from "./AppContext";

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-sans",
});

export const metadata: Metadata = {
    title: "Treinspotter",
    description: "3D Digital Twin for Trainspotters",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${notoSans.variable} antialiased`}>
                <AppProvider>
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "EstateIQ — Smart Real Estate, Trusted Results",
    template: "%s | EstateIQ",
  },
  description:
    "India's smartest real estate platform. Search 250,000+ verified listings, connect with top agents, and find your dream home with AI-powered tools.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Landing pages have their own navbar/footer, no shared app chrome
  return <>{children}</>;
}

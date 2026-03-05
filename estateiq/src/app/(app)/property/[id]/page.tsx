"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  Bed,
  Bath,
  Maximize,
  Calendar,
  MapPin,
  Shield,
  Camera,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Car,
  PawPrint,
  Building2,
  TrendingUp,
  Footprints,
  GraduationCap,
  Train,
  Bike,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/property-card";
import { MOCK_AGENTS, formatPrice, formatPricePerSqft } from "@/data/mock";
import { useSavedHomesStore } from "@/stores";
import { createClient } from "@/lib/supabase/client";
import { mapDbProperty } from "@/lib/map-property";
import { Loader2 } from "lucide-react";
import type { Property } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MiniMortgageCalc({ price }: { price: number }) {
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [down, setDown] = useState(20);

  const loanAmount = price * (1 - down / 100);
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const emi =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
      : loanAmount / months;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Building2 className="h-4 w-4 text-blue" />
          Mortgage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[11px] text-gray-mid">Rate (%)</label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="h-9 text-sm"
              step={0.1}
            />
          </div>
          <div>
            <label className="text-[11px] text-gray-mid">Years</label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="h-9 text-sm"
            />
          </div>
          <div>
            <label className="text-[11px] text-gray-mid">Down (%)</label>
            <Input
              type="number"
              value={down}
              onChange={(e) => setDown(Number(e.target.value))}
              className="h-9 text-sm"
            />
          </div>
        </div>
        <Separator />
        <div className="text-center">
          <p className="text-xs text-gray-mid">Estimated Monthly EMI</p>
          <p className="text-2xl font-bold text-blue">
            {formatPrice(Math.round(emi))}
            <span className="text-sm font-normal text-gray-mid">/mo</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const { isSaved, toggle } = useSavedHomesStore();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProperty(mapDbProperty(data));
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-light">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue mx-auto mb-4" />
          <p className="text-gray-mid font-medium">Fetching property intelligence...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-2">
            Property Not Found
          </h1>
          <p className="text-gray-mid mb-4">
            The listing you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild className="bg-blue hover:bg-blue/90 text-white">
            <Link href="/buy">Browse Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  const agent = MOCK_AGENTS.find((a) => a.id === property.agentId);
  const saved = isSaved(property.id);

  const similarProperties: Property[] = []; // Empty for now, can be fetched if needed

  const priceData = (property.priceHistory || []).map((ph: any) => ({
    date: ph.date,
    price: ph.price / 100000,
  }));

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-light">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-mid">
            <Link href="/" className="hover:text-blue">
              Home
            </Link>
            <span>/</span>
            <Link href="/buy" className="hover:text-blue">
              Buy
            </Link>
            <span>/</span>
            <Link
              href={`/buy?q=${property.city}`}
              className="hover:text-blue"
            >
              {property.city}
            </Link>
            <span>/</span>
            <span className="text-navy font-medium truncate max-w-[200px]">
              {property.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative rounded-2xl overflow-hidden bg-white shadow-card"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={property.images[currentImageIdx]}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Nav arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIdx(
                          (currentImageIdx - 1 + property.images.length) %
                          property.images.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white transition"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIdx(
                          (currentImageIdx + 1) % property.images.length
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white transition"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Virtual Tour Badge */}
                {property.hasVirtualTour && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-teal/90 backdrop-blur-sm px-3 py-1.5 text-white cursor-pointer hover:bg-teal transition">
                    <Camera className="h-4 w-4" />
                    <span className="text-sm font-medium">Virtual Tour</span>
                  </div>
                )}

                {/* Image counter */}
                <div className="absolute bottom-3 right-3 rounded-md bg-black/50 backdrop-blur-sm px-2 py-1 text-white text-xs">
                  {currentImageIdx + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-1 p-2 overflow-x-auto">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIdx(i)}
                      className={`relative h-16 w-24 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${i === currentImageIdx
                        ? "border-blue"
                        : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                    >
                      <Image
                        src={img}
                        alt={`View ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Title & Price */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {property.isVerified && (
                        <Badge className="bg-green-light text-green border-green text-[10px]">
                          <Shield className="h-3 w-3 mr-0.5" /> RERA Verified
                        </Badge>
                      )}
                      {property.isFeatured && (
                        <Badge className="bg-navy text-white text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-navy">
                      {property.title}
                    </h1>
                    <p className="flex items-center gap-1 text-sm text-gray-mid mt-1">
                      <MapPin className="h-4 w-4" />
                      {property.locality}, {property.city}, {property.state}{" "}
                      {property.pincode}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl md:text-3xl font-bold text-blue">
                      {formatPrice(property.price)}
                    </p>
                    <p className="text-sm text-gray-mid">
                      {formatPricePerSqft(property.pricePerSqft)}
                    </p>
                    {property.isPriceDropped && (
                      <Badge className="bg-blue-light text-blue mt-1 text-xs">
                        <TrendingUp className="h-3 w-3 mr-0.5 rotate-180" />
                        {property.priceDropPercent}% Price Drop
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Key Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                        <Bed className="h-5 w-5 text-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy">
                          {property.beds} Beds
                        </p>
                        <p className="text-xs text-gray-mid">Bedrooms</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                      <Bath className="h-5 w-5 text-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        {property.baths} Baths
                      </p>
                      <p className="text-xs text-gray-mid">Bathrooms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                      <Maximize className="h-5 w-5 text-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        {property.sqft.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-mid">sq.ft</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                      <Calendar className="h-5 w-5 text-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">
                        {property.yearBuilt}
                      </p>
                      <p className="text-xs text-gray-mid">Year Built</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggle(property.id)}
                    className={
                      saved ? "text-red-500 border-red-500" : "text-gray-mid"
                    }
                  >
                    <Heart
                      className={`h-4 w-4 mr-1 ${saved ? "fill-red-500" : ""
                        }`}
                    />
                    {saved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-mid">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-mid">
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tabs: Description, Details, Neighbourhood */}
            <Card>
              <Tabs defaultValue="description">
                <TabsList className="w-full justify-start border-b rounded-none bg-transparent px-6 pt-4">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-blue rounded-none"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-blue rounded-none"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="neighbourhood"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-blue rounded-none"
                  >
                    Neighbourhood
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-6">
                  <p className="text-sm text-gray-dark leading-relaxed">
                    {property.description}
                  </p>

                  {/* Amenities */}
                  <h3 className="text-base font-semibold text-navy mt-6 mb-3">
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <Badge
                        key={a}
                        variant="outline"
                        className="capitalize text-sm py-1 px-3"
                      >
                        {a.replace("-", " ")}
                      </Badge>
                    ))}
                    {property.petFriendly && (
                      <Badge
                        variant="outline"
                        className="text-sm py-1 px-3"
                      >
                        <PawPrint className="h-3.5 w-3.5 mr-1" />
                        Pet Friendly
                      </Badge>
                    )}
                    {property.parking > 0 && (
                      <Badge
                        variant="outline"
                        className="text-sm py-1 px-3"
                      >
                        <Car className="h-3.5 w-3.5 mr-1" />
                        {property.parking} Parking
                      </Badge>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="details" className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-mid">Property Type</span>
                      <span className="font-medium capitalize text-navy">
                        {property.propertyType}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-mid">Furnishing</span>
                      <span className="font-medium capitalize text-navy">
                        {property.furnished}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-mid">Posted By</span>
                      <span className="font-medium capitalize text-navy">
                        {property.postedBy}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-mid">Status</span>
                      <span className="font-medium capitalize text-navy">
                        {property.status}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-mid">Listed</span>
                      <span className="font-medium text-navy">
                        {property.daysListed} days ago
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-mid">Pincode</span>
                      <span className="font-medium text-navy">
                        {property.pincode}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="neighbourhood" className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-xl bg-blue-light">
                      <Footprints className="h-6 w-6 text-blue mx-auto mb-1" />
                      <p className="text-xl font-bold text-navy">85</p>
                      <p className="text-xs text-gray-mid">Walk Score</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-green-light">
                      <GraduationCap className="h-6 w-6 text-green mx-auto mb-1" />
                      <p className="text-xl font-bold text-navy">8.5</p>
                      <p className="text-xs text-gray-mid">School Rating</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-teal-light">
                      <Train className="h-6 w-6 text-teal mx-auto mb-1" />
                      <p className="text-xl font-bold text-navy">78</p>
                      <p className="text-xs text-gray-mid">Transit Score</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-blue-light">
                      <Bike className="h-6 w-6 text-blue mx-auto mb-1" />
                      <p className="text-xl font-bold text-navy">62</p>
                      <p className="text-xs text-gray-mid">Bike Score</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Price History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue" />
                  Price History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: "#5C5C5C" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#5C5C5C" }}
                        tickFormatter={(v: number) => `₹${v}L`}
                      />
                      <Tooltip
                        formatter={(value: string | number | undefined) => [
                          `₹${value}L`,
                          "Price",
                        ]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#1565C0"
                        strokeWidth={2.5}
                        dot={{ fill: "#1565C0", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-navy mb-4">
                  Similar Properties Nearby
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {similarProperties.map((p, i) => (
                    <PropertyCard key={p.id} property={p} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            {agent && (
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Contact Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden">
                      <Image
                        src={agent.photo}
                        alt={agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/agents/${agent.id}`}
                        className="text-sm font-semibold text-navy hover:text-blue"
                      >
                        {agent.name}
                      </Link>
                      <p className="text-xs text-gray-mid">
                        {agent.brokerage}
                      </p>
                      <p className="text-xs text-gray-mid">
                        ⭐ {agent.rating} · {agent.dealsClosed} deals
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-blue hover:bg-blue/90 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Agent
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green text-green hover:bg-green-light"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue text-blue hover:bg-blue-light"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-teal text-teal hover:bg-teal-light"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mortgage Calculator */}
            <MiniMortgageCalc price={property.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

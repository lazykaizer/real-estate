"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Search,
  TrendingUp,
  School,
  Shield,
  TreePine,
  Train,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MOCK_NEIGHBOURHOODS, formatPrice } from "@/data/mock";
import { Neighbourhood } from "@/types";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CITY_TABS = ["All", "Mumbai", "Delhi", "Bangalore", "Hyderabad"];

function getScoreColor(score: number): string {
  if (score >= 80) return "bg-green text-white";
  if (score >= 60) return "bg-blue text-white";
  if (score >= 40) return "bg-yellow-500 text-white";
  return "bg-red-500 text-white";
}

function ScoreBar({
  label,
  score,
  icon: Icon,
}: {
  label: string;
  score: number;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-gray-mid shrink-0" />
      <span className="text-sm w-24 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-blue rounded-full transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-semibold w-8 text-right">{Math.round(score)}</span>
    </div>
  );
}

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const filtered = MOCK_NEIGHBOURHOODS.filter((n) => {
    const matchesCity =
      selectedCity === "All" || n.city === selectedCity;
    const matchesQuery =
      !query ||
      n.name.toLowerCase().includes(query.toLowerCase()) ||
      n.city.toLowerCase().includes(query.toLowerCase());
    return matchesCity && matchesQuery;
  });

  const chartData = MOCK_NEIGHBOURHOODS.map((n) => ({
    name: n.name.split(",")[0],
    price: n.avgPrice / 100000,
    walk: n.walkScore,
    school: n.schoolRating * 10,
  }));

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-light">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal to-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-7 w-7" />
              <h1 className="text-2xl md:text-3xl font-bold">
                Neighbourhood Explorer
              </h1>
            </div>
            <p className="text-white/70 max-w-xl mb-6">
              Discover the best neighbourhoods across India. Compare
              walkability, schools, safety, and property prices.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-mid" />
              <Input
                placeholder="Search neighbourhoods or cities..."
                className="pl-10 bg-white text-gray-dark"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* City filter tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {CITY_TABS.map((city) => (
            <Button
              key={city}
              variant={selectedCity === city ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCity(city)}
              className={
                selectedCity === city
                  ? "bg-navy text-white"
                  : ""
              }
            >
              {city}
            </Button>
          ))}
        </div>

        {/* Comparison Chart */}
        {chartData.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-base">
                Neighbourhood Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar
                      dataKey="price"
                      name="Avg Price (L)"
                      fill="#1565C0"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="walk"
                      name="Walk Score"
                      fill="#2E7D32"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="school"
                      name="School (x10)"
                      fill="#00695C"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Neighbourhood Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {filtered.map((n, idx) => (
            <NeighbourhoodCard key={n.id} neighbourhood={n} idx={idx} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-16 text-gray-mid">
              No neighbourhoods found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NeighbourhoodCard({
  neighbourhood: n,
  idx,
}: {
  neighbourhood: Neighbourhood;
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-card-hover transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-navy">{n.name}</h3>
              <p className="text-sm text-gray-mid">{n.city}</p>
            </div>
            <Badge className={getScoreColor(n.walkScore)}>
              {n.walkScore}/100
            </Badge>
          </div>
          <Separator className="mb-4" />
          <div className="space-y-2.5">
            <ScoreBar label="Walk Score" score={n.walkScore} icon={MapPin} />
            <ScoreBar
              label="Schools"
              score={n.schoolRating * 10}
              icon={School}
            />
            <ScoreBar
              label="Safety"
              score={Math.min(100, Math.round(n.walkScore * 0.9 + 10))}
              icon={Shield}
            />
            <ScoreBar
              label="Green Space"
              score={Math.min(100, Math.round(n.schoolRating * 11))}
              icon={TreePine}
            />
            <ScoreBar
              label="Transit"
              score={Math.min(100, Math.round(n.walkScore * 0.8 + 20))}
              icon={Train}
            />
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-mid">Avg Property Price</p>
              <p className="text-lg font-bold text-blue">
                {formatPrice(n.avgPrice)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-green text-sm">
              <TrendingUp className="h-3.5 w-3.5" />
              {n.priceGrowth}% YoY
            </div>
          </div>
          <Button
            asChild
            className="w-full mt-4 bg-navy hover:bg-navy/90 text-white"
            size="sm"
          >
            <Link href={`/buy?q=${encodeURIComponent(n.name)}`}>
              View Properties
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

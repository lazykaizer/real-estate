/* ─── EstateIQ Type Definitions ─── */

export type PropertyStatus = "active" | "sold" | "rented";
export type PropertyType = "apartment" | "villa" | "plot" | "commercial" | "pg";
export type FurnishingType = "furnished" | "semi" | "unfurnished";
export type PostedBy = "builder" | "owner" | "agent";
export type UserRole = "buyer" | "seller" | "agent" | "admin";
export type SubscriptionTier = "free" | "basic" | "premium";
export type SortOption = "newest" | "price-low" | "price-high" | "relevant" | "price-drop";
export type SearchTab = "buy" | "rent" | "sold";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  pricePerSqft: number;
  propertyType: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  status: PropertyStatus;
  furnished: FurnishingType;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  coordinates: Coordinates;
  agentId: string;
  images: string[];
  isFeatured: boolean;
  isVerified: boolean;
  hasVirtualTour: boolean;
  isPriceDropped: boolean;
  priceDropPercent?: number;
  daysListed: number;
  amenities: string[];
  postedBy: PostedBy;
  parking: number;
  petFriendly: boolean;
  priceHistory: PricePoint[];
  createdAt: string;
  updatedAt: string;
}

export interface PricePoint {
  date: string;
  price: number;
}

export interface Agent {
  id: string;
  name: string;
  photo: string;
  brokerage: string;
  licenseNumber: string;
  yearsExperience: number;
  specialisations: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  dealsClosed: number;
  bio: string;
  phone: string;
  email: string;
  activeListings: number;
  serviceAreas: string[];
  subscriptionTier: SubscriptionTier;
  responseTime: string;
}

export interface Review {
  id: string;
  agentId: string;
  userName: string;
  userPhoto: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedBuyer: boolean;
}

export interface Neighbourhood {
  id: string;
  name: string;
  city: string;
  description: string;
  avgPrice: number;
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  schoolRating: number;
  crimeIndex: number;
  coordinates: Coordinates;
  image: string;
  priceHistory: PricePoint[];
  population: number;
  medianIncome: number;
  priceGrowth: number;
}

export interface SearchFilters {
  tab: SearchTab;
  query: string;
  minPrice: number;
  maxPrice: number;
  beds: number[];
  baths: number[];
  propertyType: PropertyType[];
  furnishing: FurnishingType | "any";
  postedBy: PostedBy[];
  minArea: number;
  maxArea: number;
  amenities: string[];
  sort: SortOption;
  special: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  photo: string;
  rating: number;
  comment: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  authorImage: string;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
}

export interface MortgageInput {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  downPayment: number;
}

export interface MortgageResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: AmortizationPoint[];
}

export interface AmortizationPoint {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

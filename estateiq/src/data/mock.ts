import type {
  Property,
  Agent,
  Review,
  Neighbourhood,
  Testimonial,
  BlogPost,
} from "@/types";

/* ─── Unsplash images – free-to-use placeholder imagery ─── */
const IMG = {
  houses: [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  ],
  interiors: [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  ],
  agents: [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  ],
  neighbourhoods: [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800&q=80",
    "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
  ],
};

/* ─── Empty Mock Lists ─── */
export const MOCK_PROPERTIES: Property[] = [];
export const MOCK_AGENTS: Agent[] = [];
export const MOCK_REVIEWS: Review[] = [];
export const MOCK_NEIGHBOURHOODS: Neighbourhood[] = [];
export const MOCK_TESTIMONIALS: Testimonial[] = [];
export const MOCK_BLOG_POSTS: BlogPost[] = [];

/* ─── Helpers ─── */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPricePerSqft = (price: number) => {
  return `${formatPrice(price)}/sq.ft`;
};

import { asHTML, asText } from "@prismicio/helpers";

export type Post = {
  uid: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  image: string;
  imageAlt: string;
  html: string;
};

export const demoPosts: Post[] = [
  {
    uid: "make-room-for-thinking",
    title: "Make room for better thinking",
    excerpt: "A practical case for leaving a little more space in your work, your calendar, and your interface.",
    date: "2026-08-22", category: "Work", author: "Maya Chen",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Person working beside a window",
    html: "<p>The work that lasts rarely begins with urgency. It begins with enough room to notice what deserves attention.</p><h2>Leave a margin</h2><p>Margin is not empty time. It is the space that lets a good idea become clear before it becomes busy.</p>"
  },
  {
    uid: "a-lighter-digital-life",
    title: "A lighter digital life",
    excerpt: "Small, kind rules for making technology feel more useful and less demanding.",
    date: "2026-08-11", category: "Life", author: "Maya Chen",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Quiet sunlit workspace",
    html: "<p>Tools should support your attention, not compete for it. Start by choosing a few moments of deliberate disconnection.</p><h2>Design your defaults</h2><p>The easiest decision is the one your environment has already made for you.</p>"
  },
  {
    uid: "the-joy-of-a-slow-project",
    title: "The joy of a slow project",
    excerpt: "Why the things we return to, season after season, often teach us the most.",
    date: "2026-07-29", category: "Creativity", author: "Maya Chen",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Notebook and pen on a wooden desk",
    html: "<p>A slow project does not ask to be finished this week. It simply asks that you meet it again.</p><h2>Practice returning</h2><p>Consistency gives a project its own quiet momentum.</p>"
  }
];

export function toPost(doc: any): Post {
  const data = doc.data;
  const content = data.content || data.body || [];
  const plainContent = asText(content) || "";
  return {
    uid: doc.uid,
    title: asText(data.title) || "Untitled post",
    excerpt: asText(data.excerpt) || `${plainContent.slice(0, 150)}${plainContent.length > 150 ? "…" : ""}`,
    date: data.date || data.published_date || doc.first_publication_date,
    category: data.category || "Journal",
    author: asText(data.author) || "Studio Notes",
    image: data.image?.url || data.cover_image?.url || demoPosts[0].image,
    imageAlt: data.image?.alt || data.cover_image?.alt || "",
    html: asHTML(content) || "",
  };
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));
}

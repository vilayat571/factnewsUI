export interface News {
  _id: string;
  title: string;
  body: string;
  date: string;
  category: string;
  author: string;
  description:string
}

export interface ApiResponse {
  status: string;
  total: number;
  news: News[];
}

export const CATEGORIES = [
  { name: "İdman", value: "sport" },
  { name: "Dünya", value: "world" },
  { name: "Texnalogiya", value: "technology" },
  { name: "Şərq", value: "east" },
  { name: "Siyasət", value: "politic" },
];

 export const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Advertise", path: "/ads" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];
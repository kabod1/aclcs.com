import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PHONE = "+357 96 186 440";
export const PHONE_LINK = "tel:+35796186440";
export const EMAIL = "admin@aclcs.com";
export const EMAIL_LINK = "mailto:admin@aclcs.com";
export const WHATSAPP_LINK = "https://wa.me/35796186440";
export const ADDRESS = "Office 301, 3rd Floor, Jacovides Tower, 10 Griva Digeni Avenue, Nicosia 1066, Cyprus";
export const MAPS_LINK = "https://maps.google.com/?q=Nicosia+Cyprus";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/aclcs",
  instagram: "https://www.instagram.com/aclcs",
  twitter: "https://twitter.com/aclcs",
  linkedin: "https://www.linkedin.com/company/aclcs",
  tiktok: "https://www.tiktok.com/@aclcs",
};

export const NAV_ITEMS = [
  {
    label: "Company Setup",
    href: "/services",
    children: [
      { label: "Cyprus", href: "/services#cyprus", description: "Local incorporation, EU access" },
      { label: "Europe", href: "/services#europe", description: "EU-wide operations, full compliance" },
      { label: "Outside Europe", href: "/services#outside-europe", description: "International structures, tax-efficient" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "License Management", href: "/services#licenses", description: "Renewal, modification, compliance" },
      { label: "Residency & Permits", href: "/services#residency", description: "Permanent residency, work permits" },
      { label: "Finance & Banking", href: "/services#banking", description: "Account opening, tax advisory" },
      { label: "Office Spaces", href: "/services#offices", description: "Registered offices & co-working" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const CYPRUS_CITIES = [
  "Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta", "Paralimni",
];

export const EU_JURISDICTIONS = [
  "Malta", "Ireland", "Netherlands", "Luxembourg", "Estonia",
  "Bulgaria", "Lithuania", "Latvia", "Portugal", "Greece",
];

export const NATIONALITIES = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentine",
  "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahraini", "Bangladeshi",
  "Belgian", "Brazilian", "British", "Bulgarian", "Cameroonian", "Canadian", "Chilean",
  "Chinese", "Colombian", "Croatian", "Cypriot", "Czech", "Danish", "Dutch", "Egyptian",
  "Ethiopian", "Filipino", "Finnish", "French", "Georgian", "German", "Ghanaian",
  "Greek", "Hungarian", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli",
  "Italian", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Korean", "Kuwaiti",
  "Lebanese", "Libyan", "Malaysian", "Mexican", "Moroccan", "Nepalese", "New Zealander",
  "Nigerian", "Norwegian", "Pakistani", "Palestinian", "Peruvian", "Polish",
  "Portuguese", "Romanian", "Russian", "Saudi", "Serbian", "Singaporean",
  "Somali", "South African", "Spanish", "Sri Lankan", "Sudanese", "Swedish", "Swiss",
  "Syrian", "Taiwanese", "Thai", "Tunisian", "Turkish", "Ukrainian", "Uzbek",
  "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean",
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-EU", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(amount);
}

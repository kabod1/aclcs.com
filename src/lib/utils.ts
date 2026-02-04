import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PHONE = "+971 4 438 3838";
export const PHONE_LINK = "tel:+97144383838";
export const EMAIL = "info@decisivezone.ae";
export const EMAIL_LINK = "mailto:info@decisivezone.ae";
export const WHATSAPP_LINK = "https://wa.me/97144383838";
export const ADDRESS = "Office: 105 - 108, Building 3, Bay Square, Business Bay, Dubai, UAE";
export const MAPS_LINK = "https://maps.google.com/?q=Bay+Square+Business+Bay+Dubai";

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/decisivezone",
  instagram: "https://www.instagram.com/decisivezone",
  twitter: "https://twitter.com/decisivezone",
  linkedin: "https://www.linkedin.com/company/decisivezone",
  tiktok: "https://www.tiktok.com/@decisivezone",
};

export const NAV_ITEMS = [
  {
    label: "Company Setup",
    href: "/services",
    children: [
      { label: "Free Zone", href: "/services#freezone", description: "50+ free zones, full ownership" },
      { label: "Mainland", href: "/services#mainland", description: "Operate nationwide, no limits" },
      { label: "Offshore", href: "/services#offshore", description: "Corporate banking, tax-free" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "License Management", href: "/services#licenses", description: "Renewal, modification, cancellation" },
      { label: "Visa Services", href: "/services#visas", description: "Residence, Golden, Remote Work visas" },
      { label: "Finance & Banking", href: "/services#banking", description: "Account opening, tax guidance" },
      { label: "Office Spaces", href: "/services#offices", description: "Flexible workspace solutions" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FREE_ZONES = [
  "IFZA", "RAKEZ", "SPC", "SHAMS", "DMCC",
  "ADGM", "DAFZA", "MFZ", "JAFZA", "KIZAD",
  "DSOA", "FFZA", "MCFZ",
];

export const NATIONALITIES = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentine",
  "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahraini", "Bangladeshi",
  "Belgian", "Brazilian", "British", "Bulgarian", "Cameroonian", "Canadian", "Chilean",
  "Chinese", "Colombian", "Croatian", "Czech", "Danish", "Dutch", "Egyptian", "Emirati",
  "Ethiopian", "Filipino", "Finnish", "French", "Georgian", "German", "Ghanaian",
  "Greek", "Hungarian", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli",
  "Italian", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Korean", "Kuwaiti",
  "Lebanese", "Libyan", "Malaysian", "Mexican", "Moroccan", "Nepalese", "New Zealander",
  "Nigerian", "Norwegian", "Omani", "Pakistani", "Palestinian", "Peruvian", "Polish",
  "Portuguese", "Qatari", "Romanian", "Russian", "Saudi", "Serbian", "Singaporean",
  "Somali", "South African", "Spanish", "Sri Lankan", "Sudanese", "Swedish", "Swiss",
  "Syrian", "Taiwanese", "Thai", "Tunisian", "Turkish", "Ukrainian", "Uzbek",
  "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean",
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(amount);
}

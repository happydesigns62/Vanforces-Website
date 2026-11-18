/**
 * Homepage testimonials. PLACEHOLDER CONTENT: the people and quotes below are invented to show the design and have not been given by
 * the companies named. Replace them with approved customer quotes (and get each company's agreement) before this goes live.
 * Each quote describes something Vanforces does today and states no figures.
 */
export type Quote = { name: string; role: string; company: LogoName; text: string };
export type LogoName = "AGC Car Accessories" | "Chefouse" | "KAKU" | "Maximus" | "Punathil Egg Traders";

/** The large quotes on the left, one at a time. */
export const featured: Quote[] = [
  { name: "Omar Al-Harbi", role: "Sales Manager", company: "AGC Car Accessories", text: "Our teams start the day with their routes ready, and they take orders at the shop without re-typing anything in the evening." },
  { name: "Priya Nair", role: "Operations Lead", company: "Chefouse", text: "Warehouse and van stock is clear at the end of every day, so we stopped calling around to ask what is left." },
  { name: "Khalid Al-Mansoori", role: "Finance Manager", company: "KAKU", text: "Collections are recorded against each invoice, so finance sees the day's payments the same evening." },
  { name: "Aisha Khan", role: "General Manager", company: "Maximus", text: "The dashboard gives me the whole day in one place, without waiting for someone to prepare a report." },
  { name: "Arjun Menon", role: "Logistics Lead", company: "Punathil Egg Traders", text: "Drivers confirm each delivery on the spot, and we see it in the office straight away." },
];

/** The short cards that scroll on the right. */
export const cards: Quote[] = [
  { name: "Noura Al-Qahtani", role: "Operations Manager", company: "AGC Car Accessories", text: "The Arabic screens helped the whole team start with confidence." },
  { name: "Rohan Iyer", role: "IT Manager", company: "Chefouse", text: "Setup felt guided. Our people were running the day quickly." },
  { name: "Imran Sheikh", role: "Area Sales Manager", company: "KAKU", text: "I can see which routes are covered and which still need a visit." },
  { name: "Fatima Al-Zahrani", role: "Finance Executive", company: "Maximus", text: "Receipts and settlements are in one place. Month-end is calmer now." },
  { name: "Vikram Pillai", role: "Warehouse Supervisor", company: "Punathil Egg Traders", text: "Loading the vans against a plan means fewer surprises at the gate." },
  { name: "Hassan Al-Dosari", role: "Delivery Coordinator", company: "AGC Car Accessories", text: "No more paper lists. Each driver sees the day's deliveries on the phone." },
  { name: "Deepa Krishnan", role: "Accounts Lead", company: "Chefouse", text: "Outstanding amounts are clear for every customer, so follow-ups are easier." },
  { name: "Yusuf Al-Rashid", role: "Branch Manager", company: "KAKU", text: "My team keeps selling when the signal drops. Orders sync when they are back." },
  { name: "Meera Nambiar", role: "Field Supervisor", company: "Maximus", text: "Visits and orders are recorded as they happen, which makes coaching simple." },
  { name: "Faisal Al-Otaibi", role: "Operations Head", company: "Punathil Egg Traders", text: "One system for orders, deliveries and collections. That is what we wanted." },
  { name: "Sanjay Kumar", role: "Field Salesman", company: "AGC Car Accessories", text: "I take the order at the shop and it is done. Easy to use all day." },
  { name: "Layla Hassan", role: "Store Coordinator", company: "Chefouse", text: "Stock requests reach the warehouse faster than they did by phone." },
];
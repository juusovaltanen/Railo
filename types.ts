
export interface ServiceCard {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  tags: string[];
  imageBefore: string;
  imageAfter: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  description: string;
  phone: string;
  email: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

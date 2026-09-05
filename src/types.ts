export interface KeynoteTopic {
  id: string;
  topic: string;
  targetAudience: string;
  deliverable: string;
  duration?: string;
  format?: string;
  takeaways?: string[];
}

export interface PressReleaseData {
  status: string;
  date: string;
  headline: string;
  subheadline: string;
  city: string;
  paragraphs: string[];
  pullquote: string;
  aboutCompany: string;
  mediaContact: {
    name: string;
    title: string;
    email: string;
    organization: string;
    website: string;
  };
}

export interface MediaAsset {
  id: string;
  title: string;
  description: string;
  category: 'headshot' | 'brand' | 'document' | 'stage';
  fileType: string;
  fileSize: string;
  previewUrl?: string;
  downloadUrl?: string;
  isSvg?: boolean;
}

export interface ApprovedQuote {
  id: string;
  quote: string;
  context: string;
  topic: string;
}

export interface FastFact {
  label: string;
  value: string;
  detail: string;
}

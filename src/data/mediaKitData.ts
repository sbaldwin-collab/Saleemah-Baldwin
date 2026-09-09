import { KeynoteTopic, PressReleaseData, MediaAsset, ApprovedQuote, FastFact } from '../types';

export const EXECUTIVE_INFO = {
  name: 'Saleemah Baldwin',
  title: 'Co-Founder & CEO, XNORB Technology Inc. | Enterprise Tech Strategist',
  company: 'XNORB Technology Inc.',
  location: 'San Francisco, CA & Global',
  badge: 'FEATURED IN INFLUENTIAL WOMEN MAGAZINE',
  pressEmail: 'press@xnorbtechnology.com',
  directEmail: 'sbaldwin@xnorbtechnology.com',
  website: 'https://xnorbtechnology.com',
  heroQuote: 'The future of enterprise technology isn\'t more AI—it\'s better integration. Connected solutions matter more than technology alone.',
  executiveProfile: `Saleemah Baldwin is a visionary technology executive and the Co-Founder & CEO of XNORB Technology Inc. Recognized for her transformational approach to enterprise architecture, Baldwin advocates for seamless integration, long-term ROI, and human-centered innovation over short-term technology trends.`,
  shortBio: `Saleemah Baldwin is the Co-Founder and CEO of XNORB Technology Inc., an enterprise architecture and interoperability firm. A recognized voice in enterprise tech strategy and featured in Influential Women Magazine, Baldwin advises Fortune 500 leadership on turning fragmented tech stacks into resilient, unified ecosystems.`,
  mediumBio: `Saleemah Baldwin is a seasoned technology executive, keynote speaker, and Co-Founder & CEO of XNORB Technology Inc. With over fifteen years orchestrating digital transformations for global enterprises, she champions sustainable enterprise architectures that prioritize data interoperability and human-centric adoption. Featured as a top industry leader in Influential Women Magazine, Baldwin regularly counsels C-suite executives and board directors on navigating AI integration without incurring crippling technical debt.`,
  longBio: `Saleemah Baldwin is a visionary technology executive and the Co-Founder & CEO of XNORB Technology Inc., where she leads the company's mission to unify fragmented enterprise ecosystems. Recognized across the industry for her pragmatic yet forward-looking approach to enterprise architecture, Baldwin advocates for seamless software interoperability, sustainable long-term ROI, and human-centered innovation over ephemeral tech trends.

Recently featured in the annual leadership edition of Influential Women Magazine, Baldwin has spent over a decade and a half driving systems transformation across complex organizational structures. Under her stewardship, XNORB Technology Inc. has become a trusted partner for enterprise leaders seeking to modernize legacy workflows and deploy responsible artificial intelligence frameworks that yield measurable operational value.

Beyond her executive leadership, Baldwin is a sought-after international keynote speaker who has addressed audiences at premier tech forums including Enterprise Modernization Summit, Global CIO Forum, and Women in Tech Leadership Congress. She serves on multiple technical advisory councils and actively mentors emerging underrepresented founders in enterprise software.`,
};

export const FAST_FACTS: FastFact[] = [
  { label: 'Role & Organization', value: 'Co-Founder & CEO', detail: 'XNORB Technology Inc.' },
  { label: 'Core Expertise', value: 'Enterprise Tech & AI Strategy', detail: 'Interoperability, Data Frameworks, ROI' },
  { label: 'Featured Recognition', value: 'Influential Women Magazine', detail: 'Annual Executive Leadership Feature' },
  { label: 'Speaking Formats', value: 'Keynotes, Panels & Firesides', detail: 'In-person & Virtual Worldwide' },
  { label: 'Media Inquiries', value: 'press@xnorbtechnology.com', detail: 'Fast 24-hr Press Response Time' },
];

export const SPEAKING_TOPICS: KeynoteTopic[] = [
  {
    id: 'beyond-ai-hype',
    topic: 'Beyond the AI Hype',
    targetAudience: 'CTOs, CIOs, Enterprise Leaders',
    deliverable: 'Frameworks for integrating AI into legacy infrastructure without blowing budgets.',
    duration: '45–60 mins',
    format: 'Keynote, Executive Briefing, or Masterclass',
    takeaways: [
      'De-risking AI deployments by auditing data readiness and API pipelines before purchasing costly model subscriptions.',
      'A repeatable 4-step governance blueprint for legacy system integration.',
      'Practical benchmarks for evaluating ROI beyond surface-level productivity metrics.'
    ]
  },
  {
    id: 'sustainable-leadership',
    topic: 'Sustainable Tech Leadership',
    targetAudience: 'Founders, Executive Boards',
    deliverable: 'Balancing rapid tech adoption with organizational resilience and community impact.',
    duration: '30–50 mins',
    format: 'Keynote or Fireside Conversation',
    takeaways: [
      'Mitigating engineering burnout while executing high-stakes digital transformations.',
      'Building inclusive and resilient technical architectures that scale across distributed teams.',
      'Aligning technological velocity with company ESG and societal responsibilities.'
    ]
  },
  {
    id: 'connected-enterprise',
    topic: 'The Connected Enterprise',
    targetAudience: 'IT Managers, Operations Execs',
    deliverable: 'How interoperability and unified data ecosystems drive real ROI across enterprise units.',
    duration: '45 mins',
    format: 'Keynote or Technical Deep Dive',
    takeaways: [
      'Eliminating departmental data silos through unified schema standardization.',
      'Strategies to overcome legacy resistance and streamline cross-functional software adoption.',
      'Actionable case studies on slashing cross-departmental latency by over 40%.'
    ]
  }
];

export const OFFICIAL_PRESS_RELEASE: PressReleaseData = {
  status: 'FOR IMMEDIATE RELEASE',
  date: 'September 2026',
  city: 'SAN FRANCISCO, CA',
  headline: 'Tech CEO Saleemah Baldwin Featured in Annual Edition of Influential Women Magazine',
  subheadline: 'XNORB Technology Inc. Chief Executive outlines unified data frameworks and practical architectural strategies for the modern enterprise.',
  pullquote: 'The future of enterprise technology isn\'t more AI—it\'s better integration. Connected solutions matter more than technology alone.',
  paragraphs: [
    'Saleemah Baldwin, Co-Founder and Chief Executive Officer of XNORB Technology Inc., has been featured as a key contributor in the acclaimed annual edition of Influential Women Magazine. Her article explores how modern organizations can navigate complex software ecosystems by prioritizing systemic value and unified data frameworks over standalone software adoptions.',
    'In her featured editorial, Baldwin addresses the rampant issue of enterprise "tool fatigue" and fragmented software stacks. She argues that while artificial intelligence and automation capture headlines, their true enterprise value can only be unlocked when integrated across resilient, standardized backbones that foster cross-departmental collaboration.',
    'Baldwin provides senior decision-makers with actionable methodologies to audit existing tech stacks, sunset redundant SaaS applications, and establish durable data bridges between legacy enterprise resource planning systems and emerging cloud-native tooling.',
    'Under Baldwin\'s leadership, XNORB Technology Inc. continues to pioneer enterprise interoperability architectures, enabling mid-market and global enterprises to unlock higher returns on their technology investments while maintaining strict data governance.'
  ],
  aboutCompany: 'XNORB Technology Inc. is an enterprise architecture and technological infrastructure consulting firm dedicated to building connected, interoperable software ecosystems. By focusing on deep systems integration, automated workflows, and human-centric software deployment, XNORB enables modern enterprises to scale sustainably without accumulating crippling architectural debt.',
  mediaContact: {
    name: 'Media Relations Team',
    title: 'Director of Communications',
    email: 'press@xnorbtechnology.com',
    organization: 'XNORB Technology Inc.',
    website: 'https://xnorbtechnology.com'
  }
};

export const APPROVED_QUOTES: ApprovedQuote[] = [
  {
    id: 'quote-1',
    quote: 'The future of enterprise technology isn\'t more AI—it\'s better integration. Connected solutions matter more than technology alone.',
    context: 'Influential Women Magazine Feature (2026)',
    topic: 'Enterprise Architecture & AI'
  },
  {
    id: 'quote-2',
    quote: 'If your systems cannot speak seamlessly to one another, adding generative intelligence will merely accelerate the chaos.',
    context: 'Keynote at Global CIO Forum',
    topic: 'Digital Transformation'
  },
  {
    id: 'quote-3',
    quote: 'Sustainable innovation is not about being the first to adopt every trend; it is about building architectures that your team can maintain five years from now.',
    context: 'Executive Tech Strategist Briefing',
    topic: 'Sustainable Tech Leadership'
  }
];

export const BRAND_COLORS = [
  { name: 'Sky Accent', hex: '#38bdf8', rgb: 'rgb(56, 189, 248)', usage: 'Primary brand accent & interactive highlights' },
  { name: 'Deep Slate BG', hex: '#0f172a', rgb: 'rgb(15, 23, 42)', usage: 'Dark canvas background' },
  { name: 'Card Slate', hex: '#1e293b', rgb: 'rgb(30, 41, 59)', usage: 'Component surface & container background' },
  { name: 'Slate Border', hex: '#334155', rgb: 'rgb(51, 65, 85)', usage: 'Dividers, borders & container outlines' },
  { name: 'Text Pure', hex: '#f8fafc', rgb: 'rgb(248, 250, 252)', usage: 'Primary header and high-contrast typography' },
  { name: 'Text Muted', hex: '#94a3b8', rgb: 'rgb(148, 163, 184)', usage: 'Subtitles, captions & metadata text' }
];

export const MEDIA_ASSETS_LIST: MediaAsset[] = [
  {
    id: 'asset-headshot-navy',
    title: 'Saleemah Baldwin Executive Headshot — Navy',
    description: 'Official high-resolution executive portrait for editorial, conference, and media use.',
    category: 'headshot',
    fileType: 'PNG Headshot',
    fileSize: '513 KB',
    previewUrl: '/Saleemah-Baldwin/assets/headshots/saleemah-baldwin-executive-headshot-navy.png',
    downloadUrl: '/Saleemah-Baldwin/assets/headshots/saleemah-baldwin-executive-headshot-navy.png'
  },
  {
    id: 'asset-headshot-black',
    title: 'Saleemah Baldwin Executive Headshot — Black',
    description: 'Official high-resolution executive portrait with a neutral dark background for press use.',
    category: 'headshot',
    fileType: 'PNG Headshot',
    fileSize: '327 KB',
    previewUrl: '/Saleemah-Baldwin/assets/headshots/saleemah-baldwin-executive-headshot-black.png',
    downloadUrl: '/Saleemah-Baldwin/assets/headshots/saleemah-baldwin-executive-headshot-black.png'
  },
  {
    id: 'asset-logo-dark',
    title: 'XNORB Technology Vector Logo (Dark & Light)',
    description: 'Scalable vector mark and typography logo for dark and light backgrounds.',
    category: 'brand',
    fileType: 'SVG / PNG Package',
    fileSize: '1.2 MB',
    isSvg: true
  },
  {
    id: 'asset-bio-pdf',
    title: 'Official Executive Bio & Speaker Sheet',
    description: 'Full printable one-sheet containing formal biographies, verified credentials, and speaking topics.',
    category: 'document',
    fileType: 'PDF / Markdown One-Sheet',
    fileSize: '240 KB'
  }
];

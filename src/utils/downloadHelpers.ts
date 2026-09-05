import { EXECUTIVE_INFO, SPEAKING_TOPICS, FAST_FACTS, APPROVED_QUOTES } from '../data/mediaKitData';

export function downloadTextFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadExecutiveBioDocument() {
  const markdown = `# SALEEMAH BALDWIN - PRESS & MEDIA KIT ONE-SHEET
Co-Founder & CEO, XNORB Technology Inc. | Enterprise Tech Strategist
Featured in Influential Women Magazine
Contact: press@xnorbtechnology.com | https://xnorbtechnology.com

================================================================================
EXECUTIVE PROFILE & SUMMARY
================================================================================
${EXECUTIVE_INFO.executiveProfile}

"The future of enterprise technology isn't more AI—it's better integration. Connected solutions matter more than technology alone."

================================================================================
BIOGRAPHY OPTIONS FOR EDITORIAL USE
================================================================================

[50-WORD SHORT BIO]
${EXECUTIVE_INFO.shortBio}

[100-WORD MEDIUM BIO]
${EXECUTIVE_INFO.mediumBio}

[FULL EXECUTIVE BIOGRAPHY]
${EXECUTIVE_INFO.longBio}

================================================================================
KEYNOTE & SPEAKING TOPICS
================================================================================
${SPEAKING_TOPICS.map((topic, i) => `
${i + 1}. ${topic.topic.toUpperCase()}
   - Target Audience: ${topic.targetAudience}
   - Core Value Deliverable: ${topic.deliverable}
   - Ideal Format: ${topic.format} (${topic.duration})
   - Key Takeaways:
${topic.takeaways?.map(t => `     * ${t}`).join('\n')}
`).join('\n')}

================================================================================
APPROVED SOUNDBITES & PULL-QUOTES
================================================================================
${APPROVED_QUOTES.map(q => `* "${q.quote}"\n  — Context: ${q.context}`).join('\n\n')}

================================================================================
FAST FACTS
================================================================================
${FAST_FACTS.map(f => `* ${f.label}: ${f.value} (${f.detail})`).join('\n')}

================================================================================
MEDIA & INTERVIEW INQUIRIES
================================================================================
Direct all press requests, podcast invitations, and speaking booking inquiries to:
press@xnorbtechnology.com
Official Website: https://xnorbtechnology.com
`;

  downloadTextFile('Saleemah-Baldwin-Executive-Bio-Press-Kit.txt', markdown);
}

export function downloadXnorbLogoSvg(mode: 'dark' | 'light' = 'dark') {
  const isDark = mode === 'dark';
  const bgColor = isDark ? '#0f172a' : '#ffffff';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const accentColor = '#38bdf8';
  const subColor = isDark ? '#94a3b8' : '#64748b';

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 160" width="600" height="160">
  <rect width="600" height="160" rx="16" fill="${bgColor}" />
  <g transform="translate(40, 36)">
    <!-- XNORB Modern Geometric Icon -->
    <rect x="0" y="0" width="88" height="88" rx="20" fill="none" stroke="${accentColor}" stroke-width="6" />
    <path d="M22 22 L66 66 M66 22 L22 66" stroke="${textColor}" stroke-width="6" stroke-linecap="round" />
    <circle cx="44" cy="44" r="9" fill="${accentColor}" />
    <circle cx="22" cy="44" r="4" fill="${accentColor}" />
    <circle cx="66" cy="44" r="4" fill="${accentColor}" />
    
    <!-- Wordmark -->
    <text x="110" y="52" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="42" font-weight="800" letter-spacing="2" fill="${textColor}">XNORB</text>
    <text x="110" y="78" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="600" letter-spacing="4" fill="${subColor}">TECHNOLOGY INC.</text>
  </g>
</svg>`;

  downloadTextFile(`xnorb-logo-${mode}.svg`, svgContent, 'image/svg+xml');
}

export function downloadImageFromUrl(imageUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

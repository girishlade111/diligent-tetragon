export interface LegalSection {
  id: string;
  number: string;
  heading: string;
  paragraphs?: string[];
  bullets?: { lead?: string; text: string }[];
  trailingParagraph?: string;
}

export const PRIVACY_UPDATED = 'Last updated 30 September 2026';

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'who-i-am',
    number: '01',
    heading: 'Who I am',
    paragraphs: [
      'This website is the portfolio of Mara Voss, an independent product designer and developer based in Berlin. I am responsible for the personal data collected through this site, and you can reach me at any time at the email address at the end of this page.',
    ],
  },
  {
    id: 'what-i-collect',
    number: '02',
    heading: 'What I collect',
    paragraphs: [
      'I only collect what I need to answer you and to keep the site running well.',
    ],
    bullets: [
      {
        lead: 'Contact form:',
        text: 'your name, email address, company, website, budget, timeline and your message. Only your name, email and message are required.',
      },
      {
        lead: 'Email:',
        text: 'if you write to me directly, I keep your address and our conversation.',
      },
      {
        lead: 'Usage data:',
        text: 'anonymous statistics about page views, referring sites, device type and country, collected by a privacy-friendly analytics tool that does not use cookies or follow you across other sites.',
      },
    ],
  },
  {
    id: 'why-i-use-it',
    number: '03',
    heading: 'Why I use it',
    bullets: [
      {
        text: 'To reply to your enquiry and, if we decide to work together, to prepare a proposal and a contract.',
      },
      {
        text: 'To see which pages are useful, so I can improve the site.',
      },
      {
        text: 'To meet legal duties such as bookkeeping and tax records.',
      },
    ],
    trailingParagraph:
      'The legal bases are your consent, steps taken at your request before a contract, and my legitimate interest in running a secure and useful website.',
  },
  {
    id: 'cookies',
    number: '04',
    heading: 'Cookies',
    paragraphs: [
      'This site only uses cookies that are strictly needed for it to work, for example to remember that you closed a notice. There are no advertising cookies and no third-party tracking pixels. If an embedded video or booking tool wants to set its own cookies, it will ask for your permission first.',
    ],
  },
  {
    id: 'who-i-share-it-with',
    number: '05',
    heading: 'Who I share it with',
    paragraphs: [
      'I never sell your data or share it for marketing. A few trusted services process it on my behalf: the website host, the form and email provider and the analytics tool. Each one is bound by a data processing agreement and may only use your data to provide its service. When a provider is based outside the European Economic Area, the transfer is protected by standard contractual clauses.',
    ],
  },
  {
    id: 'how-long-i-keep-it',
    number: '06',
    heading: 'How long I keep it',
    bullets: [
      {
        text: 'Enquiries that do not become a project: deleted after 12 months.',
      },
      {
        text: 'Client correspondence and invoices: kept as long as the law requires, which in Germany can be up to 10 years.',
      },
      {
        text: 'Analytics: kept in aggregated form only, never linked to you.',
      },
    ],
  },
  {
    id: 'your-rights',
    number: '07',
    heading: 'Your rights',
    paragraphs: [
      'You can ask me at any time to show you the personal data I hold about you, to correct it, to delete it, to restrict or object to how I use it, or to send you a copy in a portable format. Where I rely on your consent, you can withdraw it whenever you like. You also have the right to complain to your local data protection authority.',
    ],
  },
  {
    id: 'security',
    number: '08',
    heading: 'Security',
    paragraphs: [
      'The site is served over HTTPS, my inbox and tools are protected with two-factor authentication, and I keep the data I hold to the minimum I need.',
    ],
  },
  {
    id: 'changes-to-this-policy',
    number: '09',
    heading: 'Changes to this policy',
    paragraphs: [
      'If I change how I handle your data, I will update this page and the date at the top. Important changes stay highlighted here for at least 30 days.',
    ],
  },
];

export const TERMS_UPDATED = 'Last updated 30 September 2026';

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: 'about-these-terms',
    number: '01',
    heading: 'About these terms',
    paragraphs: [
      'These terms apply to your use of this website, the online portfolio of Mara Voss, an independent product designer and developer based in Berlin. By browsing the site you agree to them. If you do not agree, please do not use the site.',
    ],
  },
  {
    id: 'project-work',
    number: '02',
    heading: 'Project work',
    paragraphs: [
      'Nothing on this website is an offer to enter into a contract. Every design or development project is agreed in a separate written proposal and contract that sets out the scope, timeline, price, payment terms, intellectual property and confidentiality. If those documents and these terms ever disagree, the project contract wins.',
    ],
  },
  {
    id: 'enquiries-and-availability',
    number: '03',
    heading: 'Enquiries and availability',
    paragraphs: [
      'Sending a message through the contact form does not create any obligation for either of us. Availability, start dates and prices mentioned on the site are a guide only and are confirmed in writing in each proposal.',
    ],
  },
  {
    id: 'portfolio-work',
    number: '04',
    heading: 'Portfolio work',
    paragraphs: [
      'The projects shown here are real work, published with the permission of the clients involved. Some details, names and numbers have been changed or left out to protect confidential information. Client names, logos and trademarks belong to their owners and appear only to describe the work; showing them does not mean the client endorses this site. Results and figures describe past projects and are not a promise of future results.',
    ],
  },
  {
    id: 'using-this-site',
    number: '05',
    heading: 'Using this site',
    paragraphs: [
      'You are welcome to browse, share links and quote short passages with credit. Please do not:',
    ],
    bullets: [
      { text: 'copy, republish or sell the designs, case studies, images or text as your own;' },
      { text: 'use the site in a way that could damage it or interrupt its availability;' },
      { text: 'try to reach parts of the site or its systems that are not meant to be public;' },
      { text: 'use automated tools to scrape its content in bulk.' },
    ],
  },
  {
    id: 'intellectual-property',
    number: '06',
    heading: 'Intellectual property',
    paragraphs: [
      'Unless stated otherwise, the text, design, code, graphics and photographs on this website belong to Mara Voss or are used under licence. Articles and lab experiments may carry their own licence, noted on the page, and short code snippets in articles may be used freely in your own projects. Client work shown here remains subject to the rights agreed with each client.',
    ],
  },
  {
    id: 'links-to-other-sites',
    number: '07',
    heading: 'Links to other sites',
    paragraphs: [
      'The site links to other websites, such as social profiles, client products and tools. I am not responsible for their content or their privacy practices, and a link is not an endorsement.',
    ],
  },
  {
    id: 'liability',
    number: '08',
    heading: 'Liability',
    paragraphs: [
      'I take care to keep this website accurate and available, but it is provided as it is, without a guarantee that it is always complete, current or free of errors. As far as the law allows, I am not liable for any loss that comes from using the site or relying on its content. Nothing in these terms limits liability that cannot be limited by law, such as for intent or gross negligence.',
    ],
  },
  {
    id: 'changes',
    number: '09',
    heading: 'Changes',
    paragraphs: [
      'I may update these terms from time to time. The date at the top shows the latest version, and using the site after a change means you accept the updated terms.',
    ],
  },
  {
    id: 'governing-law',
    number: '10',
    heading: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of Germany. The courts of Berlin have jurisdiction, as far as the law allows.',
    ],
  },
];

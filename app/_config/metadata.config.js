const description =
  'Mohamed Za3balawy is a chemistry teacher known for turning scientific concepts into ideas that feel simple, logical and enjoyable. IGCSE Chemistry taught with clarity, structure and genuine curiosity.';

/** @type {import('next').Metadata} */
export const rootMetadata = {
  metadataBase: new URL('https://za3balawy-chemistry.vercel.app/'),
  title: {
    template: '%s | Dr. Za3balawy',
    default: 'Dr. Za3balawy • IGCSE Chemistry Teacher',
  },
  description,
  generator: 'Dr. Za3balawy',
  applicationName: 'Dr. Za3balawy Chemistry',
  referrer: 'origin-when-cross-origin',
  keywords: ['Chemistry', 'IGCSE', 'Tutoring', 'Science', 'Za3balawy'],
  authors: [{ name: 'Mohamed Za3balawy' }],
  creator: 'Mohamed Za3balawy',
  publisher: 'Mohamed Za3balawy',
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Za3balawy',
    description,
    images: {
      url: '/za3balawy-hero.jpg',
      alt: 'Dr. Za3balawy holding a conical flask',
    },
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

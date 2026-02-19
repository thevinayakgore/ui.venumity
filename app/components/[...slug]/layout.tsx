// app/components/[...slug]/layout.tsx
import { Metadata } from 'next';
import { COMPONENTS } from '@/registry/components';
import { toKebabCase } from '@/utils/slug-kebab';
import { website } from '@/lib/brand';

interface LayoutProps {
  params: Promise<{
    slug: string[];
  }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const parts = slugPath.split('/').filter(Boolean);
  
  let title = 'UI Component';
  let description = 'A beautiful UI component from Venumity UI';
  let category = '';
  let subcategory = '';
  let component = '';

  if (parts.length >= 3) {
    category = parts[0];
    subcategory = parts[1];
    component = parts.slice(2).join('/');

    // Find component details from registry
    for (const cat of COMPONENTS) {
      if (toKebabCase(cat.name) === category) {
        for (const sub of cat.subcategories) {
          if (toKebabCase(sub.name) === subcategory) {
            for (const item of sub.items) {
              if (toKebabCase(item.itemName) === component) {
                title = item.itemName;
                description = item.description || `${item.itemName} component for your next project`;
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }
  }

  const baseUrl = website || 'http://localhost:3000/';
  
  // OG image URL with parameters - uses component name for image
  const ogImageUrl = new URL('/api/og', baseUrl);
  ogImageUrl.searchParams.set('component', component);
  ogImageUrl.searchParams.set('category', category);
  ogImageUrl.searchParams.set('subcategory', subcategory);

  return {
    title: `${title} - Venumity UI`,
    description: description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/components/${slugPath}`,
      siteName: 'Venumity UI',
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImageUrl.toString()],
      creator: '@thevinayakgore',
      site: '@venumityui',
    },
  };
}

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
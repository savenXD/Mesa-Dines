import { MetadataRoute } from 'next'
import { posts } from './blog/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = posts.map((post) => ({
    url: `https://mesadines.com/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://mesadines.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://mesadines.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogRoutes,
  ]
}

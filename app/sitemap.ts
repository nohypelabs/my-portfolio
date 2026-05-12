import { MetadataRoute } from 'next'
import { projects } from '@/lib/data/projects'
import { ongoingProjects } from '@/lib/data/ongoingProjects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://abdulgofur.vercel.app'

  // Static pages
  const routes = ['', '/projects', '/cv', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Ongoing project pages
  const ongoingPages = ongoingProjects.map((project) => ({
    url: `${baseUrl}/ongoing/${project.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...projectPages, ...ongoingPages]
}

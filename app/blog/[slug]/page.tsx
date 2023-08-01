import HelloWorld from '../../../posts/hello.mdx'

import MDXRemote from '../../../components/MDXRemote'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'


const postsPath = join(process.cwd(), '/posts')

export async function generateStaticParams() {
  return await fs.readdir(postsPath)
}

export async function generateMetadata({ params }) {
  const { blogData } = await getPost(params)

  return {
    title: `${blogData.title} | HyperUI`,
    description: blogData.description,
    openGraph: {
      title: `${blogData.title} | HyperUI`,
      description: blogData.description,
      url: 'https://www.hyperui.dev/',
      siteName: 'HyperUI',
      type: 'website',
      images: [ 'https://www.hyperui.dev/og.jpg' ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blogData.title} | HyperUI`,
      description: blogData.description,
    },
  }
}

async function getPost(params) {
  const postPath = join(postsPath, `${params.slug}.mdx`)
  const postItem = await fs.readFile(postPath, 'utf-8')

  const { content, data: frontmatter } = matter(postItem)

  return {
    blogData: frontmatter,
    blogContent: content,
  }
}

export default async function Page({ params }) {
  const { blogData, blogContent } = await getPost(params)

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${blogData.title}`,
    image: 'https://www.aleks.tech/logo.svg',
    datePublished: `${blogData.date}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <article className="prose prose-img:rounded-lg mx-auto">
        <header>
          <time className="text-sm text-gray-700">{blogData.date.toISOString()}</time>

          <h1 className="mt-1">{blogData.title}</h1>
        </header>

        <MDXRemote
          markdown={blogContent}
        />
      </article>
    </>
  )
}
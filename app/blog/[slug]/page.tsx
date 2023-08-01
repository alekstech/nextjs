import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

const postsPath = join(process.cwd(), '/posts')

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return (await fs.readdir(postsPath)).map(slug => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: { params: Params }): Promise<Metadata> {
  const { data } = await getPost(slug);

  return {
    title: `${data.title}`,
    description: data.description,
    openGraph: {
      title: `${data.title}`,
      description: data.description,
      url: 'https://www.aleks.tech/',
      siteName: 'aleks.tech',
      type: 'website',
      images: [ 'https://aleks.tech/logo.svg' ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title}`,
      description: data.description,
    },
  }
}

async function getPost(slug: string) {
  const postPath = join(postsPath, `${slug}.mdx`)
  const postItem = await fs.readFile(postPath, 'utf-8')

  const { content, data } = matter(postItem)

  return {
    data,
    content,
  }
}

const JsonLd = ({ data }) => {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${data.title}`,
    image: 'https://www.aleks.tech/logo.svg',
    datePublished: `${data.date}`,
  }

  return <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
  />
}

export default async function Page({ params: { slug } }: { params: Params }) {
  const { data, content } = await getPost(slug)

  return (
    <>
      <JsonLd data={data} />

      <article className="prose prose-img:rounded-lg mx-auto">
        <header>
          <time className="text-sm text-gray-700">{data.date.toISOString()}</time>

          <h1 className="mt-1">{data.title}</h1>
        </header>

        <MDXRemote
          source={content}
        />
      </article>
    </>
  )
}
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";

import matter from "gray-matter";
import { promises as fs } from "fs";
import { join } from "path";

const postsPath = join(process.cwd(), "/posts");

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const paths = await fs.readdir(postsPath);
  const slugs = paths.map((slug) => ({ slug: slug }));
  return slugs;
}

export async function generateMetadata({
  params: { slug },
}: {
  params: Params;
}): Promise<Metadata> {
  const { data } = await getPost(slug);

  return {
    title: `${data.title}`,
    description: data.description,
    openGraph: {
      title: `${data.title}`,
      description: data.description,
      url: "https://www.aleks.tech/",
      siteName: "aleks.tech",
      type: "website",
      images: ["https://aleks.tech/logo.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title}`,
      description: data.description,
    },
  };
}

async function getPost(slug: string) {
  const fileName = slug.endsWith(".mdx") ? slug : `${slug}.mdx`;
  const postPath = join(postsPath, fileName);
  const postItem = await fs.readFile(postPath, "utf-8");

  const { content, data } = matter(postItem);

  return {
    data,
    content,
  };
}

type SchemaData = {
  title?: string;
  date?: Date;
};

const JsonLd = ({ data }: { data: SchemaData }) => {
  const schemaData = {
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    image: "https://www.aleks.tech/logo.svg",
    ...(data.title ? { headline: data.title } : {}),
    ...(data.date ? { datePublished: data.date } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default async function Page({ params: { slug } }: { params: Params }) {
  const { data, content } = await getPost(slug);

  return (
    <>
      <JsonLd data={data} />

      <article className="prose prose-img:rounded-lg mx-auto">
        <header>
          <time>{data.date.toLocaleDateString()}</time>
        </header>

        <MDXRemote source={content} />
      </article>
    </>
  );
}

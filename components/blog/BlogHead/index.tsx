/*
  Render the head element for a blog page
  using data parsed from the top of the markdown file
*/
import Head from "next/head";

export type FrontMatterData = {
  title: string;
  description: string;
  summary: string;
  image: string;
  imageAlt: string;
};

export const BlogHead = ({ frontMatter }: { frontMatter: FrontMatterData }) => {
  return (
    <Head>
      <title>{frontMatter.title}</title>
      <meta name="subject" content={frontMatter.summary} />
      <meta name="description" content={frontMatter.description} />

      <meta property="og:title" content={frontMatter.title} />
      <meta property="og:description" content={frontMatter.description} />
      <meta property="og:image" content={frontMatter.image} />
      <meta property="og:image:alt" content={frontMatter.imageAlt} />

      <meta name="twitter:title" content={frontMatter.title} />
      <meta name="twitter:description" content={frontMatter.description} />
      <meta name="twitter:card" content={frontMatter.summary} />
      <meta name="twitter:image" content={frontMatter.image} />
      <meta name="twitter:image:alt" content={frontMatter.imageAlt} />
    </Head>
  );
};

export default BlogHead;

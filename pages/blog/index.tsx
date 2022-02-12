import { getSource, getFrontMatter, getMarkdownFiles } from './[slug]';
import Link from 'next/link';
import { BlogHead } from '../../components/blog/BlogHead';
import Layout from '../../markdown/Layout';

export const getStaticProps = async () => {
  const pages = [];

  const markdownFiles = getMarkdownFiles();
  for (const file of markdownFiles) {
    const { slug } = file;
    const source = getSource(file.slug);
    const { data } = getFrontMatter(source);
    const { title } = data;
    pages.push({ slug, title });
  }
  console.log("pages", pages);
  return {
    props: {
      pages
    }
  };
};

type File = {
  slug: string;
  title: string;
}
type Props = {
  pages: File[];
}

const frontMatter = {
  title: "Blog",
  description: "List of contents",
  summary: "List of blog posts",
  image: "",
  imageAlt: "",
};

export const Page = ({ pages }: Props) => {
  return (
    <>
      <BlogHead frontMatter={frontMatter} />
      <Layout>
        <main>
          {pages.map(({ slug, title }) => {
            return (
              <Link href={`/blog/${slug}`} key={slug}>
                {title}
              </Link>
            );
          })}
        </main>
      </Layout>
    </>
  );
};

export default Page;

import Link from 'next/link';
import { BlogHead } from '../../components/blog/BlogHead';
import Layout from '../../markdown/Layout';

const frontMatter = {
  title: "Blog",
  description: "List of contents",
  summary: "List of blog posts",
  image: "",
  imageAlt: "",
};

export const Page = () => {
  return (
    <>
      <BlogHead frontMatter={frontMatter} />
      <Layout>
        <main>
          <Link href={`/blog/portfolio`}>
            Portfolio
          </Link>
        </main>
      </Layout>
    </>
  );
};

export default Page;

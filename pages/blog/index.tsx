import PrefetchedLink from '../../components/PrefetchedLink';
import { BlogHead } from '../../components/blog/BlogHead';
import Layout from '../../components/blog/BlogLayout';

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
          <PrefetchedLink href={`/blog/portfolio`}>
            Portfolio
          </PrefetchedLink>
        </main>
      </Layout>
    </>
  );
};

export default Page;

import matter from "gray-matter";
import { promises as fs } from "fs";
import { join } from "path";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Blog | aleks.tech",
  description: "",
  openGraph: {
    title: "Blog | aleks.tech",
    description: "",
    url: "https://aleks.tech",
    siteName: "aleks.tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | aleks.tech",
    description: "",
  },
};

const postsPath = join(process.cwd(), "/posts");

async function getPosts() {
  const blogSlugs = await fs.readdir(postsPath);

  const blogPosts = await Promise.all(
    blogSlugs.map(async (blogSlug) => {
      const postPath = join(postsPath, blogSlug);
      const blogItem = await fs.readFile(postPath, "utf-8");

      const { data: blogData } = matter(blogItem);

      return {
        title: blogData.title,
        slug: blogSlug.replace(".mdx", ""),
        date: blogData.date,
      };
    }),
  );

  return blogPosts;
}

export default async function Page() {
  const blogPosts = await getPosts();

  return (
    <ul className={styles.ul}>
      {blogPosts.map(({ title, slug }) => (
        <li key={slug} className={styles.li}>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

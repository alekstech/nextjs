/*
  This route generates blog pages at build time.
  It calls getStaticPaths to get a list of md and mdx files in the content folder. It then turns each markdown file into an HTML page.
*/

import { GetStaticPaths } from 'next';
import fs from 'fs';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import matter from 'gray-matter';
import { BlogHead, FrontMatterData } from '../../components/blog/BlogHead';
import path from 'path';
import Layout from '../../markdown/Layout';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Path to folder where markdown files are stored
const MARKDOWN_FOLDER = path.join(process.cwd(), 'content');
const SUPPORTED_EXTENSIONS = ["md"];

export const getMarkdownFiles = () => {
  // TODO: Set this up to loop through sub-folders as well
  const extensionGroup = SUPPORTED_EXTENSIONS.join("|");
  const pattern = `^(.{1,})\\.(${extensionGroup})$`;
  const paths = [];
  // The source of markdown could be a remote database (CMS) instead
  const files = fs.readdirSync(MARKDOWN_FOLDER);
  
  for (const file of files) {
    // reinit RegExp in loop or it matches only on first iteration ¯\_(ツ)_/¯
    const regex = new RegExp(pattern, "g"); 
    const match = regex.exec(file);
    if (match) {
      const slug = match[1];
      const extension = match[2];
      paths.push({ slug, extension, file });
    }
  }

  return paths;
};

// Could cache paths in filesystem instead of guessing: https://github.com/vercel/next.js/issues/10933#issuecomment-1019131275
export const getSource = (slug: string) => {
  console.log("getSource", slug);
  let source;
  const fileName = MARKDOWN_FOLDER + "/" + slug;
  for (const extension of SUPPORTED_EXTENSIONS) {
    try {
      source = fs.readFileSync(fileName + "." + extension);
    } catch {
      // Wrong extension
    }
  }
  return source as Buffer;
};

export const getFrontMatter = (source: Buffer) => {
  console.log('getFrontMatter', typeof source);
  const {
    content, // metadata for head
    data, // body content
  } = matter(source);
  return {
    content,
    data,
  };
};

// Get list of files to pre-render, at build time
export const getStaticPaths: GetStaticPaths = async () => {
  const files = getMarkdownFiles();
  const paths = files.map(({ slug }) => {
    const params = { slug };
    return { params };
  });

  return {
    paths,
    fallback: false, // not found route is shown when "false"
  };
};

type GetStaticPropsParams = {
  params: {
    slug: string;
  }
}
// This will run for each file provided by getStaticPaths
export const getStaticProps = async ({ params }: GetStaticPropsParams ) => {
  const { slug } = params;

  const source = getSource(slug);

  const { content, data } = getFrontMatter(source);

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype) // turn MD (MDAST) to HTML (HAST)
    .use(rehypeSlug) // add id attributes to headings
    .use(rehypeAutolinkHeadings) // insert links into headings
    .use(rehypeSanitize) // sanitize HTML
    .use(rehypeStringify); // serialize syntax tree to HTML

  // Run the markdown string through the processor pipeline
  // The output is a VFile, a metadata object for a file
  const processed =  await processor.process(content);

  return {
    props: {
      source: String(processed),
      frontMatter: data,
    },
  };
};

type Props = {
  source: string;
  frontMatter: FrontMatterData;
}

export default function Page({ source, frontMatter }: Props) {
  return (
    <>
      <BlogHead frontMatter={frontMatter} />
      <Layout>
        <main>
          <div
            dangerouslySetInnerHTML={{ __html: source }}
          />
        </main>
      </Layout>
    </>
  );
}

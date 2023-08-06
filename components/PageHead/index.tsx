import Head from "next/head";
import { GetStaticPropsContext } from "next";

export interface Props {
  author?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  locale?: string;
  siteName?: string;
  summary?: string;
  title?: string;
  type?: string;
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  return JSON.stringify(ctx);
}

const Meta = ({
  author = "Aleks Sobieraj",
  description = "",
  image = "",
  imageAlt = "", // max 420 characters for Twitter
  locale = "en_CA",
  siteName = "aleks.tech",
  summary = "",
  title = "aleks.tech",
  type = "article",
}: Props) => {
  let href = "";
  if (process.browser) {
    href = window.location.href;
  }

  return (
    <Head>
      <title>{title}</title>

      {summary && <meta name="subject" content={summary} />}
      {description && <meta name="description" content={description} />}

      {href && <meta property="og:url" content={href} />}
      {type && <meta property="og:type" content={type} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {locale && <meta property="og:locale" content={locale} />}
      {author && <meta property="article:author" content={author} />}

      {href && <meta name="twitter:url" content={href} />}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {summary && <meta name="twitter:card" content={summary} />}
      {image && <meta name="twitter:image" content={image} />}
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      {/* <meta name="twitter:site" content="@site_account" /> */}
      {/* <meta name="twitter:creator" content="@individual_account" /> */}
    </Head>
  );
};

export default Meta;

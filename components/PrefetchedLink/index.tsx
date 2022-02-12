import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
}

export const PrefetchedLink = ({ href, children }: Props) => {
  return (
    // next/link pre-fetches pages when the anchor element intersects with viewport
    <Link href={href}>
      <a>
        {children}
      </a>
    </Link>
  );
};

export default PrefetchedLink;

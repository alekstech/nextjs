import { FC } from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const PrefetchedLink: FC<Props> = ({ href, children, className }: Props) => {
  return (
    // next/link pre-fetches pages when the anchor element intersects with viewport
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default PrefetchedLink;

import Link from 'next/link';
import styles from './styles.module.css';

type Props = {
  href: string;
  children: React.ReactNode;
  block?: boolean;
}

export const PrefetchedLink = ({ href, children, block }: Props) => {
  let classes = '';
  if (block) {
    classes = styles.block;
  }

  return (
    // next/link pre-fetches pages when the anchor element intersects with viewport
    <Link href={href}>
      <a className={classes}>
        {children}
      </a>
    </Link>
  );
};

export default PrefetchedLink;

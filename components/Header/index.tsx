import React, { FC } from 'react';
import PrefetchedLink from '../PrefetchedLink';
import Link from 'next/link';
import Cluster from '../Layout/cluster';
import ALogo from './ALogo';
import { useAuthState } from "../../contexts/authentication";
import { cva } from "cva";
import styles from './styles.module.css';

const classes = cva(
  [
    // base classes
    styles.header
  ],
  {
    variants: {
      size: {
        viewportLg: [
          // no change from base classes
        ],
        viewportSm: [
          // TODO: customize for viewportSm
        ],
      },
    },
    defaultVariants: {
      size: "viewportLg",
    },
  }
);

interface HeaderProps {
  className?: string;
  size?: "viewportLg" | "viewportSm";
}

const Header: FC<HeaderProps> = ({ className, size = "viewportLg" }): JSX.Element => {
  const { user } = useAuthState();

  return (
    <header className={classes({ size, className })}>
      <nav>
        <ul className={styles.wrapper}>
          <div className={styles.left}>
            <li>
              <PrefetchedLink href='/' className={styles.link}>
                <span className='visually-hidden'>Home</span>
                <ALogo ariaHidden={true} />
              </PrefetchedLink>
            </li>
          </div>

          <div className={styles.right}>
            <li>
              <PrefetchedLink href='/notes' className={styles.link}>
                Notes
              </PrefetchedLink>
            </li>
            <li>
              <PrefetchedLink href='/posts' className={styles.link}>
                Posts
              </PrefetchedLink>
            </li>
            {!user && <li>
              <Link href="/auth/login" className={styles.link}>
                Log in
              </Link>
            </li>}
            {user && <li>
              <PrefetchedLink href="/auth/logout" className={styles.link}>
                Log out
              </PrefetchedLink>
            </li>}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

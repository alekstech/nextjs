import React from 'react';
import Link from 'next/link';
import Cluster from '../Layout/cluster';
import ALogo from './ALogo';

const Header: React.SFC = (): JSX.Element => {
  return (
    <header>
      <nav>
        <ul>
          <Cluster justify="space-between">
            <Cluster>
              <li>
                <Link href='/'>
                  <a className="button" title="aleks.tech" aria-label="Home">
                    <ALogo />
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/skills'>
                  <a className="button">Skills</a>
                </Link>
              </li>
              <li>
                <Link href='/notes'>
                  <a className="button">Notes</a>
                </Link>
              </li>
              <li>
                <Link href='/journal'>
                  <a className="button">Journal</a>
                </Link>
              </li>
            </Cluster>
            <Cluster>
              <li>
                <Link href='/settings'>
                  <a className="button">Settings</a>
                </Link>
              </li>
              <li>
                <Link href='/auth/account'>
                  <a className="button">Account</a>
                </Link>
              </li>
              <li>
                <Link href='/auth/logout'>
                  <a className="button">Log out</a>
                </Link>
              </li>
            </Cluster>
          </Cluster>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

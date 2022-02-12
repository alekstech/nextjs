import React from 'react';
import PrefetchedLink from '../PrefetchedLink';
import Cluster from '../Layout/cluster';
import ALogo from './ALogo';

const Header: React.FC = (): JSX.Element => {
  return (
    <header>
      <nav>
        <ul>
          <Cluster justify="space-between">
            <Cluster>
              <li>
                <PrefetchedLink href='/'>
                  <>
                    <span className='visually-hidden'>Home</span>
                    <ALogo ariaHidden={true} />
                  </>
                </PrefetchedLink>
              </li>
            </Cluster>
            <Cluster>
              <li>
                <PrefetchedLink href='/auth/account'>
                  Account
                </PrefetchedLink>
              </li>
              <li>
                <PrefetchedLink href='/auth/logout'>
                  Log out
                </PrefetchedLink>
              </li>
            </Cluster>
          </Cluster>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

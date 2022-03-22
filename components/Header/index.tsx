import React from 'react';
import PrefetchedLink from '../PrefetchedLink';
import Cluster from '../Layout/cluster';
import ALogo from './ALogo';
import UnstyledList from '../UnstyledList';

const Header: React.FC = (): JSX.Element => {
  return (
    <header>
      <nav>
        <UnstyledList>
          <Cluster justify="space-between">
            <Cluster>
              <li>
                <PrefetchedLink href='/' block>
                  <>
                    <span className='visually-hidden'>Home</span>
                    <ALogo ariaHidden={true} />
                  </>
                </PrefetchedLink>
              </li>
            </Cluster>
            <Cluster>
              <li>
                <PrefetchedLink href='/notes'>
                  Notes
                </PrefetchedLink>
              </li>
            </Cluster>
          </Cluster>
        </UnstyledList>
      </nav>
    </header>
  );
};

export default Header;

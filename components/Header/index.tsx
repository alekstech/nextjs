import React from 'react';
import PrefetchedLink from '../PrefetchedLink';
import Cluster from '../Layout/cluster';
import ALogo from './ALogo';
import UnstyledList from '../UnstyledList';
import { useAuthState } from "../../contexts/authentication";
import { Auth } from 'aws-amplify';

const Header = ({ className } : { className?: string }): JSX.Element => {
  const { user } = useAuthState();

  return (
    <header className={className}>
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
              <li>
                <PrefetchedLink href='/posts'>
                  Posts
                </PrefetchedLink>
              </li>
              {!user && <li>
                <a href="#" onClick={() => Auth.federatedSignIn()}>
                  Log in
                </a>
              </li>}
              {user && <li>
                <a href="/auth/logout">
                  Log out
                </a>
              </li>}
            </Cluster>
          </Cluster>
        </UnstyledList>
      </nav>
    </header>
  );
};

export default Header;

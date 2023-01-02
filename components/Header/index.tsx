import React from 'react';
import PrefetchedLink from '../PrefetchedLink';
import Cluster from '../Layout/cluster';
import ALogo from './ALogo';
import UnstyledList from '../UnstyledList';
import { useAuthState } from "../../contexts/authentication";
import { Auth } from 'aws-amplify';

const Header: React.FC = (): JSX.Element => {
  const { user } = useAuthState();

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
              {!user && <li>
                <a onClick={() => Auth.federatedSignIn()}>
                  Log in
                </a>
              </li>}
              {user && <li>
                <a onClick={() => Auth.signOut()}>
                  Log out
                </a>
              </li>}
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

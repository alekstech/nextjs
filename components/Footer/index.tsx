import React from 'react';
import Center from '../Layout/center';
import Cluster from '../Layout/cluster';
import Link from 'next/link';

function Footer () {
  return (
    
    <footer className="mt1">
      <Center intrinsic>
        <Cluster space="var(--s0)">
          <a className="button" href="https://www.linkedin.com/in/aleksander-sobieraj/">LinkedIn</a>
          <Link href="/email">
            <a className="button">
              Email
            </a>
          </Link>
        </Cluster>
      </Center>
    </footer>
  );
}

export default Footer;

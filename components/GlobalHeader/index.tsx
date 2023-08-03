'use client'
import React from 'react';
import ALogo from './ALogo';
import { useAuthState } from "../../contexts/authentication";
import { Auth } from 'aws-amplify';
import { Menu } from '@headlessui/react'
import Link from 'next/link';

const GlobalHeader = ({ className } : { className?: string }): JSX.Element => {
  return (
    <Menu>
      <Menu.Button>A</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <Link
              className={`${active && 'bg-blue-500'}`}
              href="/"
            >
              Home
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              className={`${active && 'bg-blue-500'}`}
              href="/blog"
            >
              Blog
            </Link>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span>Log in</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default GlobalHeader;

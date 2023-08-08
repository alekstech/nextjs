"use client";
import React, { useId } from "react";
import ALogo from "./ALogo";
import { useAuthState } from "../../contexts/authentication";
import { Auth } from "aws-amplify";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import styles from "./styles.module.css";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const GlobalHeader = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className="visually-hidden">Home</span>
        <ALogo />
      </Link>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button aria-label="Navigation menu">
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.DropdownMenuContent}
            sideOffset={5}
          >
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <Link href="/blog" className={styles.link}>
                Blog
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <Link href="/login" className={styles.link}>
                Log in
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
};

export default GlobalHeader;

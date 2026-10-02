'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/data';

import { scale, slideOut } from './variants';

export function OffcanvasLinks() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState(pathname);

  const items = navItems.map(({ href, title }, index) => {
    const id = index;
    return (
      <motion.li
        key={id}
        className='relative my-3 flex items-center sm:my-4'
        variants={slideOut}
        custom={id}
        initial='initial'
        animate='enter'
        exit='exit'
        onPointerEnter={() => setActiveLink(href)}
      >
        <motion.div
          className='absolute -left-9 max-sm:hidden sm:-left-11'
          variants={scale}
          animate={activeLink === href ? 'open' : 'closed'}
        >
          <Dot size={36} />
        </motion.div>
        <Link href={href} className='text-4xl capitalize sm:text-6xl'>
          {title}
        </Link>
      </motion.li>
    );
  });

  return (
    <div className='mt-10 flex flex-col gap-3 sm:mt-20'>
      <div className='mb-6 border-b border-solid sm:mb-10'>
        <h5 className='text-xs uppercase text-secondary-foreground'>
          Navigation
        </h5>
      </div>
      <ul onPointerLeave={() => setActiveLink(pathname)}>{items}</ul>
    </div>
  );
}

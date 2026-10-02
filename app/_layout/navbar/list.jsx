'use client';

import { Dot } from 'lucide-react';
import Link from 'next/link';

import { Center, MagneticButton } from '@/components';
import { navItems } from '@/data';
import { randomId } from '@/utils';

export function NavbarList() {
  const items = navItems.slice(1).map(({ href, title }) => {
    const id = randomId();
    return (
      <li key={id} className='group px-1.5 py-4 sm:px-2 lg:px-4'>
        <Link href={href} passHref>
          <MagneticButton>
            <span className='whitespace-nowrap text-xs capitalize sm:text-sm lg:text-base'>
              {title}
            </span>
            <Center>
              <Dot className='scale-0 transition-transform duration-200 ease-in-expo group-hover:scale-100' />
            </Center>
          </MagneticButton>
        </Link>
      </li>
    );
  });

  return <ul className='-me-2 flex items-center lg:me-0'>{items}</ul>;
}

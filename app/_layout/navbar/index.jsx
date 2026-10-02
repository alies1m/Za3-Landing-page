'use client';

import { cn } from '@/utils';

import { NavbarBrand } from './brand';
import { NavbarList } from './list';

/** @param {{ className?: string }} props */
export function Navbar({ className }) {
  return (
    <nav className='absolute inset-x-0 top-0 z-10'>
      <div
        className={cn(
          'flex items-center justify-between gap-2 px-4 py-4 text-background sm:gap-4 sm:px-5 lg:px-8',
          className,
        )}
      >
        <NavbarBrand />
        <NavbarList />
      </div>
    </nav>
  );
}

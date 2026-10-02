'use client';

import { FlaskConical } from 'lucide-react';
import Link from 'next/link';

export function NavbarBrand() {
  return (
    <Link href='/' passHref>
      <div className='group flex cursor-pointer items-center pb-5'>
        <div className='shrink-0 transition-transform duration-500 ease-in-expo group-hover:rotate-[360deg]'>
          <FlaskConical size={20} className='sm:size-6' />
        </div>

        <div className='relative ms-2 h-6 overflow-hidden whitespace-nowrap'>
          <h5 className='text-sm leading-6 transition-transform duration-500 ease-in-expo group-hover:-translate-y-full sm:text-base'>
            Dr. Za3balawy
          </h5>
          <h5 className='absolute left-0 top-full text-sm leading-6 transition-transform duration-500 ease-in-expo group-hover:-translate-y-full sm:text-base'>
            Chemistry Class
          </h5>
        </div>
      </div>
    </Link>
  );
}

'use client';

import { motion } from 'framer-motion';

import { FixedOverlay } from '@/components';

import { OffcanvasBackdrop } from './back-drop';
import { OffcanvasFooter } from './footer';
import { OffcanvasLinks } from './links';
import { slideLeft } from './variants';

const MotionComponent = motion(FixedOverlay);

export function OffcanvasBody() {
  return (
    <MotionComponent
      className='z-40'
      variants={slideLeft}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <OffcanvasBackdrop />

      <div className='absolute right-0 top-0 h-screen w-full bg-foreground text-background sm:w-[600px]'>
        <div className='flex h-full flex-col justify-between gap-10 overflow-y-auto p-10 sm:p-24'>
          <OffcanvasLinks />
          <OffcanvasFooter />
        </div>
      </div>
    </MotionComponent>
  );
}

'use client';

import { motion } from 'framer-motion';
import { MoveDownRight } from 'lucide-react';
import Image from 'next/image';

import { ParallaxSlider } from '@/components';

import { slideUp } from './variants';

export function Header() {
  return (
    <motion.header
      className='relative h-screen overflow-hidden bg-foreground text-background'
      variants={slideUp}
      initial='initial'
      animate='enter'
    >
      <Image
        src='/za3balawy-hero.jpg'
        className='object-cover object-top md:scale-110 md:object-center'
        fill={true}
        sizes='100vw'
        quality={100}
        priority={true}
        alt='Mohamed Za3balawy, chemistry teacher, holding a conical flask'
      />

      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-foreground via-foreground/75 to-transparent' />

      <div className='relative flex h-full flex-col justify-end gap-2 md:flex-col-reverse md:justify-normal'>
        <div className='select-none'>
          <h1 className='text-[max(9em,15vw)]'>
            <ParallaxSlider repeat={4} baseVelocity={2}>
              <span className='pe-12'>
                Dr. Za3balawy
                <span className='spacer'>—</span>
              </span>
            </ParallaxSlider>
          </h1>
        </div>

        <div className='md:ml-auto'>
          <div className='mx-10 max-md:my-12 md:mx-36'>
            <div className='mb-4 md:mb-20'>
              <MoveDownRight size={28} strokeWidth={1.25} />
            </div>

            <h4 className='text-[clamp(1.55em,2.5vw,2.75em)]'>
              <span className='block'>Chemistry Teacher</span>
              <span className='block'>IGCSE &amp; Beyond</span>
            </h4>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

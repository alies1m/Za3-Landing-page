'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { slideUp, stagger, stepItem } from './variants';

/**
 * @param {import('react').PropsWithChildren<{
 *   eyebrow: string;
 *   title: string;
 *   lead: string;
 *   aside: import('react').ReactNode;
 * }>} props
 */
export function AuthShell({ eyebrow, title, lead, aside, children }) {
  return (
    <motion.div
      className='auth-theme grid min-h-screen bg-background text-foreground lg:grid-cols-2'
      variants={slideUp}
      initial='initial'
      animate='enter'
    >
      <aside className='relative overflow-hidden bg-foreground text-background max-lg:hidden'>
        <Image
          src='/za3balawy-hero.jpg'
          className='object-cover object-top opacity-30 mix-blend-luminosity'
          fill={true}
          sizes='(min-width: 1024px) 50vw, 100vw'
          priority={true}
          alt='Dr. Za3balawy holding a conical flask'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30' />

        <div className='relative flex h-full flex-col justify-between gap-16 p-10 lg:sticky lg:top-0 lg:h-screen lg:p-16'>
          <Link href='/' passHref>
            <div className='group inline-flex cursor-pointer items-center gap-3'>
              <FlaskConical
                size={22}
                className='transition-transform duration-500 ease-in-expo group-hover:rotate-[360deg]'
              />
              <h5 className='text-base'>Dr. Za3balawy</h5>
            </div>
          </Link>

          <div className='max-w-lg'>{aside}</div>

          <Link href='/' passHref>
            <span className='inline-flex items-center gap-2 text-sm text-background/70 transition-colors duration-300 ease-in-expo hover:text-background'>
              <ArrowLeft size={16} strokeWidth={1.5} /> Back to home
            </span>
          </Link>
        </div>
      </aside>

      <section className='flex items-center justify-center px-6 py-14 sm:px-8 lg:p-20'>
        <motion.div
          className='w-full max-w-xl'
          variants={stagger}
          initial='initial'
          animate='enter'
        >
          <motion.div variants={stepItem} className='mb-10 lg:hidden'>
            <Link href='/' passHref>
              <div className='group inline-flex cursor-pointer items-center gap-3'>
                <FlaskConical
                  size={20}
                  className='transition-transform duration-500 ease-in-expo group-hover:rotate-[360deg]'
                />
                <h5 className='text-base'>Dr. Za3balawy</h5>
              </div>
            </Link>
          </motion.div>

          <motion.h5
            variants={stepItem}
            className='text-xs uppercase tracking-[0.3em] text-secondary-foreground'
          >
            {eyebrow}
          </motion.h5>

          <motion.h1
            variants={stepItem}
            className='mt-6 text-[clamp(2.5em,5vw,4em)] leading-[1.05]'
          >
            {title}
          </motion.h1>

          <motion.p
            variants={stepItem}
            className='mt-6 text-base text-muted-foreground lg:text-lg'
          >
            {lead}
          </motion.p>

          <motion.div variants={stepItem} className='mt-14'>
            {children}
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}

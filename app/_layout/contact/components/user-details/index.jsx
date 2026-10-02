'use client';

import { motion } from 'framer-motion';
import { ArrowDownLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { MagneticButton } from '@/components';

import { Container, ImageWrapper, MainTitle, Row } from './index.styled';

/**
 * @param {Object} props
 * @param {import('framer-motion').MotionValue<number>} props.transformX
 */
export function UserDetails({ transformX }) {
  return (
    <Container>
      <Row>
        <div className='flex items-center gap-8'>
          <ImageWrapper>
            <Image
              src='/za3balawy-hero.jpg'
              className='rounded-full object-cover'
              fill={true}
              sizes='200px'
              alt='Dr. Za3balawy profile picture'
            />
          </ImageWrapper>
          <MainTitle>Let’s learn</MainTitle>
        </div>
        <div className='flex items-center justify-between'>
          <MainTitle>chemistry</MainTitle>
          <div>
            <ArrowDownLeft size={28} strokeWidth={1.25} />
          </div>
        </div>
      </Row>

      <Row>
        <div className='relative w-full'>
          <div className='h-[1px] bg-muted-foreground' />
          <div className='absolute right-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2'>
            <motion.div style={{ x: transformX }}>
              <Link href='/signup' passHref>
                <MagneticButton variant='primary' size='lg'>
                  Join the class
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </Row>

      <Row>
        <div className='flex w-full flex-col gap-4 lg:flex-row'>
          <div>
            <a href='mailto:hello@za3balawy.com'>
              <MagneticButton
                variant='outline'
                size='md'
                className='w-full border-muted-foreground'
              >
                hello@za3balawy.com
              </MagneticButton>
            </a>
          </div>
          <div>
            <Link href='/signin' passHref>
              <MagneticButton
                variant='outline'
                size='md'
                className='w-full border-muted-foreground'
              >
                Already a student? Sign in
              </MagneticButton>
            </Link>
          </div>
        </div>
      </Row>
    </Container>
  );
}

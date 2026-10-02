import Image from 'next/image';
import Link from 'next/link';

import { MagneticButton } from '@/components';
import { Contact, Navbar, Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'About',
  description:
    'Mohamed Za3balawy is a chemistry teacher known for his rare ability to transform scientific concepts into ideas that feel simple, logical and enjoyable.',
};

const facts = [
  { label: 'Subject', value: 'Chemistry' },
  { label: 'Curriculum', value: 'IGCSE & beyond' },
  { label: 'Approach', value: 'Fundamentals first' },
  { label: 'Focus', value: 'Clarity & confidence' },
];

export default function About() {
  return (
    <Transition>
      <Navbar />

      <header className='relative flex min-h-[85vh] items-end overflow-hidden bg-foreground text-background'>
        <Image
          src='/za3balawy-hero.jpg'
          className='object-cover object-top opacity-40 mix-blend-luminosity'
          fill={true}
          sizes='100vw'
          priority={true}
          alt='Mohamed Za3balawy holding a conical flask'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/20' />

        <div className='container relative pb-24 pt-40'>
          <h5 className='text-xs uppercase tracking-[0.3em] text-background/70'>
            About
          </h5>
          <h1 className='mt-8 text-[clamp(2.75em,8vw,7em)] leading-[1.02]'>
            Meet Dr. Za3balawy
          </h1>
          <p className='mt-8 max-w-2xl text-base text-background/80 lg:text-xl'>
            Mohamed Za3balawy is a chemistry teacher known for his rare ability
            to transform scientific concepts into ideas that feel simple,
            logical, and enjoyable.
          </p>
        </div>
      </header>

      <main>
        <article className='container'>
          <div className='grid gap-16 py-24 lg:grid-cols-12 lg:py-40'>
            <div className='lg:col-span-4'>
              <dl className='flex flex-col gap-8 lg:sticky lg:top-24'>
                {facts.map(({ label, value }) => (
                  <div
                    key={label}
                    className='border-b border-solid border-border pb-6'
                  >
                    <dt className='text-xs uppercase tracking-[0.2em] text-secondary-foreground'>
                      {label}
                    </dt>
                    <dd className='mt-3 text-xl'>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className='flex flex-col gap-10 lg:col-span-8'>
              <h2 className='text-[clamp(1.5em,2.6vw,2.6em)] leading-[1.35]'>
                His classes are built on a balance of strong academic
                fundamentals and creative teaching techniques, allowing students
                to understand reactions, equations, and theories with genuine
                clarity.
              </h2>

              <p className='text-base text-muted-foreground lg:text-lg'>
                Za3balawy brings energy and personality to every lesson, using
                real-life examples, problem-solving strategies, and a structured
                approach that helps even the most difficult topics feel
                approachable. Whether he is explaining organic chemistry
                mechanisms, demonstrating experiments, or breaking down complex
                calculations, he always maintains a teaching style that is
                patient, disciplined, and focused on student success.
              </p>

              <p className='text-base text-muted-foreground lg:text-lg'>
                His students often describe him as knowledgeable, supportive,
                and motivating — a teacher who not only teaches chemistry, but
                inspires a deeper interest in science itself. With each class,
                he aims to strengthen critical thinking, build confidence, and
                prepare students with the skills they need for exams and for
                life.
              </p>

              <div className='mt-6'>
                <Link href='/signup' passHref>
                  <MagneticButton variant='ghost' size='md'>
                    Join the class
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Contact />
    </Transition>
  );
}

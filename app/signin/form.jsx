'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Field } from '@/components';
import { AuthShell } from '@/layout';

export function SignInForm() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleChange = key => event =>
    setValues(prev => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = event => {
    event.preventDefault();

    if (!values.email.trim() || !values.password) {
      setError('Enter your email and password to continue.');
      return;
    }

    setError('');
    //? The real sign-in request will be wired to the LMS later.
  };

  return (
    <AuthShell
      eyebrow='Welcome back'
      title='Sign in and pick up where you stopped.'
      lead='Your lessons, notes, past-paper drills and progress are waiting exactly where you left them.'
      aside={
        <>
          <h2 className='text-[clamp(2em,3.4vw,3.25em)] leading-[1.1]'>
            Patient. Disciplined. Focused on your result.
          </h2>
          <p className='mt-6 text-base text-background/70'>
            Every lesson is built to strengthen critical thinking, build
            confidence and prepare you for the exam — and for what comes after
            it.
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-10' noValidate>
        <Field
          label='Email'
          name='email'
          type='email'
          autoComplete='email'
          placeholder='you@example.com'
          value={values.email}
          onChange={handleChange('email')}
        />

        <Field
          label='Password'
          name='password'
          type='password'
          autoComplete='current-password'
          placeholder='Your password'
          value={values.password}
          onChange={handleChange('password')}
        />

        <div className='flex flex-wrap items-center justify-between gap-4'>
          <label className='flex cursor-pointer items-center gap-3 text-sm text-muted-foreground'>
            <input
              type='checkbox'
              checked={remember}
              onChange={event => setRemember(event.target.checked)}
              className='size-4 accent-foreground'
            />
            Keep me signed in
          </label>

          <Link
            href='/signin'
            className='text-sm text-muted-foreground transition-colors duration-300 ease-in-expo hover:text-foreground'
          >
            Forgot your password?
          </Link>
        </div>

        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-sm text-destructive'
          >
            {error}
          </motion.p>
        ) : null}

        <motion.button
          type='submit'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='group flex w-full items-center justify-between gap-4 rounded-full bg-foreground px-8 py-6 text-base text-background transition-colors duration-300 ease-in-expo hover:bg-primary'
        >
          Sign in
          <ArrowRight
            size={20}
            strokeWidth={1.5}
            className='transition-transform duration-300 ease-in-expo group-hover:translate-x-1'
          />
        </motion.button>

        <p className='text-sm text-muted-foreground'>
          New here?{' '}
          <Link
            href='/signup'
            className='border-b border-solid border-foreground pb-0.5 text-foreground transition-opacity duration-300 ease-in-expo hover:opacity-60'
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

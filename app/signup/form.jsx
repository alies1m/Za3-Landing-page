'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Field } from '@/components';
import { AuthShell } from '@/layout';

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

export function SignUpForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = key => event =>
    setValues(prev => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = event => {
    event.preventDefault();

    if (!values.fullName.trim() || !values.email.trim()) {
      setError('Please add your name and email so we know who you are.');
      return;
    }

    if (values.password.length < 8) {
      setError('Use at least 8 characters for your password.');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError('The two passwords do not match yet.');
      return;
    }

    if (!accepted) {
      setError('Please accept the class rules to continue.');
      return;
    }

    setError('');
    //? The real account creation will be wired to the LMS later.
    router.push('/onboarding');
  };

  return (
    <AuthShell
      eyebrow='Create your account'
      title='Join the chemistry class.'
      lead='One account gives you the lessons, the problem sets, the past-paper drills and the feedback. Setting it up takes less than a minute.'
      aside={
        <>
          <h2 className='text-[clamp(2em,3.4vw,3.25em)] leading-[1.1]'>
            Chemistry that finally makes sense.
          </h2>
          <p className='mt-6 text-base text-background/70'>
            Reactions, equations and theories explained with real-life examples
            and a structure that makes the hardest topics approachable.
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-10' noValidate>
        <Field
          label='Full name'
          name='fullName'
          autoComplete='name'
          placeholder='Nour Hassan'
          value={values.fullName}
          onChange={handleChange('fullName')}
        />

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
          label='Phone (optional)'
          name='phone'
          type='tel'
          autoComplete='tel'
          placeholder='+20 10 0000 0000'
          value={values.phone}
          onChange={handleChange('phone')}
        />

        <div className='grid gap-10 sm:grid-cols-2'>
          <Field
            label='Password'
            name='password'
            type='password'
            autoComplete='new-password'
            placeholder='At least 8 characters'
            value={values.password}
            onChange={handleChange('password')}
          />

          <Field
            label='Confirm password'
            name='confirmPassword'
            type='password'
            autoComplete='new-password'
            placeholder='Repeat it once more'
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
        </div>

        <label className='flex cursor-pointer items-start gap-3 text-sm text-muted-foreground'>
          <input
            type='checkbox'
            checked={accepted}
            onChange={event => setAccepted(event.target.checked)}
            className='mt-1 size-4 accent-foreground'
          />
          <span>
            I agree to attend with my camera and notebook ready, and I accept
            the class rules and privacy policy.
          </span>
        </label>

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
          Create my account
          <ArrowRight
            size={20}
            strokeWidth={1.5}
            className='transition-transform duration-300 ease-in-expo group-hover:translate-x-1'
          />
        </motion.button>

        <p className='text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link
            href='/signin'
            className='border-b border-solid border-foreground pb-0.5 text-foreground transition-opacity duration-300 ease-in-expo hover:opacity-60'
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

import { Transition } from '@/layout';

import { SignInForm } from './form';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Sign in',
  description:
    'Sign in to Dr. Za3balawy’s IGCSE Chemistry class and pick up your lessons, notes and past-paper drills where you left them.',
};

export default function SignIn() {
  return (
    <Transition>
      <SignInForm />
    </Transition>
  );
}

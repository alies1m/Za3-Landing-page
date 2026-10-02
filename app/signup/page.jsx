import { Transition } from '@/layout';

import { SignUpForm } from './form';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Sign up',
  description:
    'Create your account and join Dr. Za3balawy’s IGCSE Chemistry class — lessons, problem sets, past-paper drills and feedback in one place.',
};

export default function SignUp() {
  return (
    <Transition>
      <SignUpForm />
    </Transition>
  );
}

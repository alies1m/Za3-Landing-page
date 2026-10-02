import { Transition } from '@/layout';

import { OnboardingFlow } from './flow';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Onboarding',
  description:
    'Six quick questions that shape your IGCSE Chemistry plan with Dr. Za3balawy — exam board, target grade, hardest topics and study rhythm.',
};

export default function Onboarding() {
  return (
    <Transition>
      <OnboardingFlow />
    </Transition>
  );
}

import { Header, Navbar, Transition } from '@/layout';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Home | Dr. Za3balawy',
  description:
    'Chemistry made simple, logical and enjoyable. Learn IGCSE Chemistry with Mohamed Za3balawy — strong fundamentals, creative teaching and real clarity on every reaction.',
};

export default function Home() {
  return (
    <Transition>
      <Navbar />
      <Header />
    </Transition>
  );
}

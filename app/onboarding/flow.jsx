'use client';

import { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

import {
  ChipGroup,
  Field,
  ImageUpload,
  OptionCards,
  TextArea,
} from '@/components';
import {
  examBoards,
  examSessions,
  hardTopics,
  languages,
  learningStyles,
  lessonTimes,
  studyLoads,
  studyYears,
  targetGrades,
} from '@/data';
import { AuthShell } from '@/layout';

const initialAnswers = {
  displayName: '',
  school: '',
  avatar: null,
  examBoard: '',
  studyYear: '',
  targetGrade: '',
  examSession: '',
  hardTopics: [],
  learningStyles: [],
  studyLoad: '',
  lessonTime: '',
  language: '',
  notebook: null,
  goals: '',
};

/** @type {import('framer-motion').Variants} */
const panel = {
  initial: { opacity: 0, y: 32 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

export function OnboardingFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = key => value => {
    setError('');
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const steps = useMemo(
    () => [
      {
        id: 'profile',
        heading: 'First, who is joining the class?',
        caption:
          'Your photo is only shown to Dr. Za3balawy and your own study group.',
        validate: ({ displayName }) =>
          displayName.trim() ? '' : 'Please tell us what to call you.',
        render: () => (
          <div className='flex flex-col gap-10'>
            <Field
              label='What should we call you?'
              placeholder='Nour'
              value={answers.displayName}
              onChange={event => set('displayName')(event.target.value)}
            />
            <Field
              label='School or academy (optional)'
              placeholder='Cairo International School'
              value={answers.school}
              onChange={event => set('school')(event.target.value)}
            />
            <ImageUpload
              label='Profile photo'
              hint='JPG or PNG, up to 4 MB.'
              value={answers.avatar?.preview ?? null}
              onChange={set('avatar')}
            />
          </div>
        ),
      },
      {
        id: 'curriculum',
        heading: 'Which chemistry course are you sitting?',
        caption:
          'This decides the syllabus map, the past papers and the mark schemes you get.',
        validate: ({ examBoard, studyYear }) =>
          examBoard && studyYear
            ? ''
            : 'Pick your exam board and your current year.',
        render: () => (
          <div className='flex flex-col gap-12'>
            <OptionCards
              label='Exam board'
              options={examBoards}
              value={answers.examBoard}
              onChange={set('examBoard')}
            />
            <OptionCards
              label='Current year'
              options={studyYears}
              value={answers.studyYear}
              onChange={set('studyYear')}
            />
          </div>
        ),
      },
      {
        id: 'target',
        heading: 'What are you aiming for, and by when?',
        caption:
          'Your target sets the pace of the plan and how hard the practice gets.',
        validate: ({ targetGrade, examSession }) =>
          targetGrade && examSession
            ? ''
            : 'Choose a target grade and an exam session.',
        render: () => (
          <div className='flex flex-col gap-12'>
            <OptionCards
              label='Target grade'
              options={targetGrades}
              value={answers.targetGrade}
              onChange={set('targetGrade')}
            />
            <OptionCards
              label='Exam session'
              options={examSessions}
              value={answers.examSession}
              onChange={set('examSession')}
            />
          </div>
        ),
      },
      {
        id: 'topics',
        heading: 'Which topics give you the most trouble?',
        caption:
          'Be honest — the hardest ones get the extra worked examples first.',
        validate: ({ hardTopics: picked }) =>
          picked.length ? '' : 'Pick at least one topic to start with.',
        render: () => (
          <div className='flex flex-col gap-12'>
            <ChipGroup
              label='Hardest topics'
              hint='Choose as many as you need.'
              options={hardTopics}
              value={answers.hardTopics}
              onChange={set('hardTopics')}
            />
            <ChipGroup
              label='How you learn best'
              hint='This shapes how each lesson is delivered.'
              options={learningStyles}
              value={answers.learningStyles}
              onChange={set('learningStyles')}
            />
          </div>
        ),
      },
      {
        id: 'rhythm',
        heading: 'How much time can you give chemistry?',
        caption: 'A realistic plan beats an ambitious one every single time.',
        validate: ({ studyLoad, lessonTime, language }) =>
          studyLoad && lessonTime && language
            ? ''
            : 'Pick a study load, a lesson time and a language.',
        render: () => (
          <div className='flex flex-col gap-12'>
            <OptionCards
              label='Study time per week'
              options={studyLoads}
              value={answers.studyLoad}
              onChange={set('studyLoad')}
            />
            <OptionCards
              label='Preferred lesson time'
              options={lessonTimes}
              value={answers.lessonTime}
              onChange={set('lessonTime')}
            />
            <OptionCards
              label='Language of explanation'
              options={languages}
              value={answers.language}
              onChange={set('language')}
            />
          </div>
        ),
      },
      {
        id: 'goals',
        heading: 'Anything Dr. Za3balawy should know before day one?',
        caption:
          'Upload a page of your notes or a past paper you struggled with — it helps a lot.',
        validate: () => '',
        render: () => (
          <div className='flex flex-col gap-12'>
            <TextArea
              label='Your goal for this year'
              placeholder='I want to stop losing marks on mole calculations and finish Paper 2 on time.'
              value={answers.goals}
              onChange={event => set('goals')(event.target.value)}
            />
            <ImageUpload
              label='Notes or past paper (optional)'
              hint='A photo of your notebook, a question you got stuck on, or your last report.'
              rounded={false}
              value={answers.notebook?.preview ?? null}
              onChange={set('notebook')}
            />
          </div>
        ),
      },
    ],
    [answers],
  );

  const total = steps.length;
  const step = steps[stepIndex];
  const progress = done ? 100 : Math.round((stepIndex / total) * 100);

  const handleNext = () => {
    const message = step.validate(answers);
    if (message) {
      setError(message);
      return;
    }

    setError('');

    if (stepIndex === total - 1) {
      //? The collected answers will be posted to the LMS later.
      setDone(true);
      return;
    }

    setStepIndex(index => index + 1);
  };

  const handleBack = () => {
    setError('');
    setStepIndex(index => Math.max(0, index - 1));
  };

  return (
    <AuthShell
      eyebrow={
        done ? 'All set' : `Onboarding — step ${stepIndex + 1} of ${total}`
      }
      title={done ? 'You’re in.' : 'Let’s shape the class around you.'}
      lead={
        done
          ? 'Your answers are saved. Dr. Za3balawy will build your study plan around them before the first lesson.'
          : 'Six short questions. They decide your syllabus map, your practice set and the pace of your plan.'
      }
      aside={
        <>
          <h2 className='text-[clamp(2em,3.4vw,3.25em)] leading-[1.1]'>
            Every student gets their own route through the syllabus.
          </h2>
          <p className='mt-6 text-base text-background/70'>
            Tell us where you are and where you want to be, and the course
            rearranges itself around the gap in between.
          </p>

          <div className='mt-12'>
            <div className='flex items-center justify-between text-xs uppercase tracking-[0.2em] text-background/60'>
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className='mt-4 h-[2px] w-full bg-background/20'>
              <motion.div
                className='h-full bg-background'
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              />
            </div>
          </div>
        </>
      }
    >
      <div className='mb-12 lg:hidden'>
        <div className='flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground'>
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className='mt-3 h-[3px] w-full rounded-full bg-secondary'>
          <motion.div
            className='h-full rounded-full bg-primary'
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode='wait'>
        {done ? (
          <motion.div
            key='done'
            variants={panel}
            initial='initial'
            animate='enter'
            exit='exit'
            className='flex flex-col gap-10'
          >
            <div className='flex size-16 items-center justify-center rounded-full bg-foreground text-background'>
              <Check size={26} strokeWidth={1.5} />
            </div>

            <div>
              <h3 className='text-[clamp(1.5em,2.2vw,2.25em)] leading-[1.2]'>
                Welcome to the class, {answers.displayName || 'student'}.
              </h3>
              <p className='mt-4 text-base text-muted-foreground'>
                Your plan is built around{' '}
                {answers.examBoard || 'your exam board'}, aiming for{' '}
                {answers.targetGrade || 'your target grade'} in{' '}
                {answers.examSession || 'your exam session'}.
              </p>
            </div>

            <dl className='grid gap-6 border-t border-solid border-border pt-8 sm:grid-cols-2'>
              <div>
                <dt className='text-xs uppercase tracking-[0.2em] text-secondary-foreground'>
                  Focus topics
                </dt>
                <dd className='mt-3 text-base'>
                  {answers.hardTopics.length
                    ? answers.hardTopics.join(', ')
                    : 'To be decided together'}
                </dd>
              </div>
              <div>
                <dt className='text-xs uppercase tracking-[0.2em] text-secondary-foreground'>
                  Weekly rhythm
                </dt>
                <dd className='mt-3 text-base'>
                  {answers.studyLoad || '—'}, {answers.lessonTime || '—'}
                </dd>
              </div>
            </dl>

            <Link href='/' passHref>
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='group flex w-full items-center justify-between gap-4 rounded-full bg-foreground px-8 py-6 text-base text-background transition-colors duration-300 ease-in-expo hover:bg-primary'
              >
                Go to my dashboard
                <ArrowRight
                  size={20}
                  strokeWidth={1.5}
                  className='transition-transform duration-300 ease-in-expo group-hover:translate-x-1'
                />
              </motion.span>
            </Link>

            <p className='text-xs text-muted-foreground'>
              The dashboard is part of the main app and will be connected to
              this flow later.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={step.id}
            variants={panel}
            initial='initial'
            animate='enter'
            exit='exit'
            className='flex flex-col gap-10'
          >
            <div>
              <h3 className='text-[clamp(1.4em,2vw,2em)] leading-tight'>
                {step.heading}
              </h3>
              <p className='mt-3 text-sm text-muted-foreground'>
                {step.caption}
              </p>
            </div>

            {step.render()}

            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-sm text-destructive'
              >
                {error}
              </motion.p>
            ) : null}

            <div className='flex items-center justify-between gap-4 border-t border-solid border-border pt-8'>
              <button
                type='button'
                onClick={handleBack}
                disabled={stepIndex === 0}
                className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 ease-in-expo hover:text-foreground disabled:pointer-events-none disabled:opacity-30'
              >
                <ArrowLeft size={16} strokeWidth={1.5} /> Back
              </button>

              <motion.button
                type='button'
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='group inline-flex items-center gap-4 rounded-full bg-foreground px-8 py-5 text-base text-background transition-colors duration-300 ease-in-expo hover:bg-primary'
              >
                {stepIndex === total - 1 ? 'Finish setup' : 'Continue'}
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className='transition-transform duration-300 ease-in-expo group-hover:translate-x-1'
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}

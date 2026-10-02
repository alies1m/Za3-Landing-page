'use client';

import { useId, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { Check, ImagePlus, Trash2 } from 'lucide-react';

import { cn } from '@/utils';

const fieldLabel = 'block text-sm font-medium text-foreground';

const fieldControl =
  'mt-2 w-full rounded-md border border-solid border-input bg-muted px-4 py-3 text-base text-foreground shadow-sm outline-none transition-all duration-200 ease-in-expo placeholder:text-muted-foreground hover:border-secondary focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/25';

/** @param {import('react').InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string; wrapperClassName?: string; }} */
export function Field({ label, hint, className, wrapperClassName, ...props }) {
  const id = useId();

  return (
    <div className={cn('w-full', wrapperClassName)}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <input id={id} className={cn(fieldControl, className)} {...props} />
      {hint ? (
        <p className='mt-2 text-xs text-muted-foreground'>{hint}</p>
      ) : null}
    </div>
  );
}

/** @param {import('react').TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; wrapperClassName?: string; }} */
export function TextArea({ label, className, wrapperClassName, ...props }) {
  const id = useId();

  return (
    <div className={cn('w-full', wrapperClassName)}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className={cn(fieldControl, 'resize-none', className)}
        {...props}
      />
    </div>
  );
}

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {{ value: string, caption?: string }[]} props.options
 * @param {string} [props.className]
 */
export function OptionCards({ label, value, onChange, options, className }) {
  const cards = options.map(option => {
    const active = value === option.value;
    return (
      <button
        key={option.value}
        type='button'
        onClick={() => onChange(option.value)}
        className={cn(
          'group flex items-center justify-between gap-4 rounded-md border border-solid border-input bg-muted px-5 py-4 text-left shadow-sm transition-all duration-200 ease-in-expo hover:border-secondary hover:bg-background',
          active &&
            'border-ring bg-ring/[0.07] ring-2 ring-ring/25 hover:border-ring hover:bg-ring/[0.07]',
        )}
      >
        <span>
          <span className='block text-base font-medium'>{option.value}</span>
          {option.caption ? (
            <span className='mt-1 block text-xs text-muted-foreground'>
              {option.caption}
            </span>
          ) : null}
        </span>
        <span
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-solid border-secondary bg-background transition-all duration-200 ease-in-expo',
            active && 'border-ring bg-ring',
          )}
        >
          <Check
            size={12}
            strokeWidth={3}
            className={cn(
              'scale-0 text-background transition-transform duration-200 ease-in-expo',
              active && 'scale-100',
            )}
          />
        </span>
      </button>
    );
  });

  return (
    <fieldset className={cn('w-full', className)}>
      <legend className={fieldLabel}>{label}</legend>
      <div className='mt-5 grid gap-3 sm:grid-cols-2'>{cards}</div>
    </fieldset>
  );
}

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string[]} props.value
 * @param {(value: string[]) => void} props.onChange
 * @param {string[]} props.options
 * @param {string} [props.hint]
 */
export function ChipGroup({ label, value, onChange, options, hint }) {
  const toggle = option =>
    onChange(
      value.includes(option)
        ? value.filter(item => item !== option)
        : [...value, option],
    );

  const chips = options.map(option => {
    const active = value.includes(option);
    return (
      <motion.button
        key={option}
        type='button'
        whileTap={{ scale: 0.95 }}
        onClick={() => toggle(option)}
        className={cn(
          'rounded-md border border-solid border-input bg-muted px-4 py-2.5 text-sm shadow-sm transition-all duration-200 ease-in-expo hover:border-secondary hover:bg-background',
          active &&
            'border-ring bg-ring/[0.07] font-medium text-primary ring-2 ring-ring/25',
        )}
      >
        {option}
      </motion.button>
    );
  });

  return (
    <fieldset className='w-full'>
      <legend className={fieldLabel}>{label}</legend>
      {hint ? (
        <p className='mt-2 text-xs text-muted-foreground'>{hint}</p>
      ) : null}
      <div className='mt-5 flex flex-wrap gap-3'>{chips}</div>
    </fieldset>
  );
}

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} [props.hint]
 * @param {string | null} props.value
 * @param {(value: { preview: string, name: string } | null) => void} props.onChange
 * @param {string} [props.name]
 * @param {boolean} [props.rounded]
 */
export function ImageUpload({
  label,
  hint,
  value,
  onChange,
  name,
  rounded = true,
}) {
  /** @type {import('react').MutableRefObject<HTMLInputElement>} */
  const inputRef = useRef(null);
  const [error, setError] = useState('');

  const handleChange = event => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError('That image is larger than 4 MB. Try a smaller one.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setError('');
      onChange({ preview: String(reader.result), name: file.name });
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className='w-full'>
      <span className={fieldLabel}>{label}</span>

      <div className='mt-5 flex items-center gap-6'>
        <button
          type='button'
          onClick={() => inputRef.current?.click()}
          className={cn(
            'group relative h-28 w-28 shrink-0 overflow-hidden border-2 border-dashed border-input bg-muted transition-colors duration-200 ease-in-expo hover:border-ring hover:bg-background',
            rounded ? 'rounded-full' : 'rounded-md',
          )}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt='Selected upload preview'
              className='size-full object-cover'
            />
          ) : (
            <span className='flex size-full items-center justify-center text-muted-foreground transition-colors duration-300 ease-in-expo group-hover:text-foreground'>
              <ImagePlus size={24} strokeWidth={1.25} />
            </span>
          )}
        </button>

        <div className='flex flex-col items-start gap-2'>
          <button
            type='button'
            onClick={() => inputRef.current?.click()}
            className='rounded-md border border-solid border-input bg-muted px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200 ease-in-expo hover:border-secondary hover:bg-background'
          >
            {value ? 'Replace image' : 'Upload an image'}
          </button>

          {value ? (
            <button
              type='button'
              onClick={handleRemove}
              className='flex items-center gap-2 text-xs text-muted-foreground transition-colors duration-300 ease-in-expo hover:text-destructive'
            >
              <Trash2 size={14} strokeWidth={1.5} /> Remove
            </button>
          ) : null}

          {hint ? (
            <p className='text-xs text-muted-foreground'>{hint}</p>
          ) : null}
          {error ? <p className='text-xs text-destructive'>{error}</p> : null}
        </div>
      </div>

      <input
        ref={inputRef}
        type='file'
        name={name}
        accept='image/*'
        className='hidden'
        onChange={handleChange}
      />
    </div>
  );
}

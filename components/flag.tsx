import Link from 'next/link';
import { forwardRef, HTMLAttributes } from 'react';

// No need for keyframes with tailwindcss-animate, but defining types for props
interface FlagProps extends HTMLAttributes<HTMLAnchorElement> {
  scrolled?: boolean;
}

const Flag = forwardRef<HTMLAnchorElement, FlagProps>(
  ({ scrolled, ...props }, ref) => {
    // Tailwind classes for the base styles
    const baseClasses = `
      bg-[url('https://assets.hackclub.com/flag-orpheus-top.svg')]
      bg-no-repeat
      bg-top
      bg-left
      bg-contain
      cursor-pointer
      flex-shrink-0
      w-[112px]
      h-[48px]
      transition-transform
      duration-[0.1875s] /* 3/16s in seconds */
      ease-in-out /* Using a standard ease, adjust if needed */
      transform-origin-top-left
      md:w-[172px]
      md:h-[64px]
      hover:animate-waving-flag /* Custom animation name */
      focus:animate-waving-flag /* Custom animation name */
      motion-reduce:!animation-none /* Disable animation for reduced motion */
      ${scrolled ? 'transform scale-[0.875] h-[56px]' : ''}
    `;

    // Tailwind classes for the scrolled state and its hover/focus animation
    const scrolledClasses = scrolled
      ? `
      hover:animate-waving-flag-scaled /* Custom animation name for scrolled */
      focus:animate-waving-flag-scaled /* Custom animation name for scrolled */
    `
      : '';

    return (
      <Link href="/" passHref>
        <a
          ref={ref}
          href="https://hackclub.com/"
          title="Homepage"
          className={`${baseClasses} ${scrolledClasses}`}
          {...props}
        />
      </Link>
    );
  }
);

Flag.displayName = 'Flag'; // Add a display name for better debugging

export default Flag;
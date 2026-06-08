'use client';

import Image from 'next/image';
import { useLang } from '@/lib/language';
import type { SafeImage } from '@/types/content';

interface Props {
  image: SafeImage;
  className?: string;
}

export default function ImageWithCaption({ image, className = '' }: Props) {
  const { lang } = useLang();
  const alt = lang === 'az' ? image.altAz : image.altEn;
  const caption = lang === 'az' ? image.captionAz : image.captionEn;

  return (
    <figure className={`my-6 ${className}`}>
      {image.src.startsWith('/') ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-alt border border-border">
          <Image
            src={image.src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      ) : (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface-alt border border-border">
          <Image
            src={image.src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            unoptimized
          />
        </div>
      )}
      <figcaption className="mt-2 text-xs text-tech-gray leading-relaxed">
        <span>{caption}</span>
        {' · '}
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {image.sourceOrg}
        </a>
        {' · '}
        <span className="italic">{image.license}</span>
      </figcaption>
    </figure>
  );
}

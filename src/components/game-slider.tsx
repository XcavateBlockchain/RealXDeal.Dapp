'use client';

import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { NextButton, PrevButton, usePrevNextButtons } from './game-slide-button';
import { useCallback } from 'react';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

export default function GameSlider({ slides, options }: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 })
  ]);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="relative mx-auto max-w-[500px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className="ml-4 flex touch-pan-y touch-pinch-zoom"
          style={{
            backfaceVisibility: 'hidden'
          }}
        >
          {slides.map((image, index) => (
            <div
              className="relative min-w-0 flex-[0_0_98%] px-2"
              style={{ transform: 'translate3d(0, 0, 0)' }}
              key={index}
            >
              {/* slide */}
              <div className="h-[337px] w-[432px] rounded-[20px] border border-border bg-black/[0.20] p-4">
                <Image
                  src={image}
                  alt=""
                  width={400}
                  height={305}
                  priority
                  className="size-full rounded-[20px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-2 right-2 top-1/3 z-10 flex items-center justify-between">
        <PrevButton
          onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
          disabled={prevBtnDisabled}
          className={prevBtnDisabled ? 'opacity-55' : 'opacity-100'}
        />
        <NextButton
          onClick={() => onButtonAutoplayClick(onNextButtonClick)}
          disabled={nextBtnDisabled}
          className={nextBtnDisabled ? 'opacity-55' : 'opacity-100'}
        />
      </div>
    </section>
  );
}

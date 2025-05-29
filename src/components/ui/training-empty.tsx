'use client';

import { useRouter } from 'next/navigation';
import Button from './button';
import Image from 'next/image';

export default function TrainingEmpty() {
  const router = useRouter();

  return (
    <div
      className="max-w-[375px] md:max-w-[768px] xl:max-w-[1440px] mx-auto
    pt-[75px] pb-[76px] px-4 md:pt-[140px] md:px-[93px] xl:pt-[193px] xl:px-[269px]
    xl:flex xl:flex-row-reverse xl:gap-10 xl:items-center"
    >
      <Image
        src="/images/blood-mb.png"
        alt="Blood"
        width={144}
        height={166}
        className="block md:hidden mx-auto"
      />
      <Image
        src="/images/blood.png"
        alt="Blood"
        width={203}
        height={230}
        className="hidden md:block mx-auto"
      />
      <div>
        <p className="text-start md:text-xl font-medium mb-4 md:mb-8 ">
          You do not have a single word to learn right now.
        </p>
        <p className="text-start text-sm md:text-base mb-20 md:mb-16">
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-[10px] ">
          <Button
            variant="green"
            type="button"
            className="p-4 md:p-[14px] md:w-[203px]"
            onClick={() => {
              router.push('/dictionary');
            }}
          >
            Add word
          </Button>
          <Button
            variant="transparent-2"
            type="button"
            className="p-4 md:p-[14px] md:w-[203px]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

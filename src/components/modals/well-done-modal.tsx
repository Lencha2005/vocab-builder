import { AnswerResponse } from '@/types';
import React from 'react';
import CustomModal from '../ui/custom-modal';
import Image from 'next/image';

type WellDoneModalProps = {
  results: AnswerResponse[];
  onClose: () => void;
};

export default function WellDoneModal({
  results,
  onClose,
}: WellDoneModalProps) {
  const trueResults = results.filter(item => item.isDone);
  const falseResults = results.filter(item => !item.isDone);

  return (
    <CustomModal isOpen={true} onClose={onClose} showCloseIcon>
      <div className="relative min-h-[350px] md:min-h-[400px] py-12 px-4 md:px-16">
        <h2 className="font-semibold text-2xl md:text-[40px] text-white mb-8 md:mb-7">
          Well done
        </h2>
        <div className="flex gap-8 items-start md:gap-16">
          <ul className="text-left text-white flex flex-col gap-1">
            <li className="text-sm md:text-base mb-1">Correct answers:</li>
            {trueResults.map(item => (
              <li key={item._id} className="font-medium md:text-xl">
                {item.en}
              </li>
            ))}
          </ul>
          <ul className="text-left text-white flex flex-col gap-1">
            <li className="text-sm md:text-base mb-1">Mistakes:</li>
            {falseResults.map(item => (
              <li key={item._id} className="font-medium md:text-xl">
                {item.en}
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="/images/book-mb.png"
          alt="Blood"
          width={152}
          height={121}
          style={{ height: 'auto' }}
          className="block absolute bottom-4 right-3 md:hidden"
        />
        <Image
          src="/images/book.png"
          alt="Blood"
          width={212}
          height={179}
          style={{ height: 'auto' }}
          className="hidden md:block md:absolute md:bottom-3 md:right-4"
        />
      </div>
    </CustomModal>
  );
}

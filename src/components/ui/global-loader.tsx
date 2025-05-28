'use client';

import { useSelector } from 'react-redux';
import { selectDictionaryLoading } from '@/redux/dictionary/selectors';
import { selectUserWordsLoading } from '@/redux/userWords/selectors';
import { BeatLoader } from 'react-spinners';

export default function GlobalLoader() {
  const dictionaryLoading = useSelector(selectDictionaryLoading);
  const userWordsLoading = useSelector(selectUserWordsLoading);

  const isLoading = dictionaryLoading || userWordsLoading;

  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-white/50 backdrop-blur-sm">
      <BeatLoader color="#85aa9f" size={20} />
    </div>
  );
}

// 'use client';

// import { ClimbingBoxLoader } from 'react-spinners';

// export default function Loader() {
//   return (
//     <div className="absolut top-[300px] h-screen">
//       <ClimbingBoxLoader color="#85aa9f" size={20} />
//     </div>
//   );
// }

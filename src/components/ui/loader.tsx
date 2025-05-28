'use client';
import { BeatLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <BeatLoader color="#85aa9f" size={20} />
    </div>
  );
}

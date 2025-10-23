'use client';

import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('@/components/PhaserGame'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-screen h-screen bg-black">
      {/* Container sẽ chiếm toàn bộ màn hình */}
      <div className="w-full h-full">
        <PhaserGame />
      </div>
    </main>
  );
}

import { Suspense } from 'react';
import HomeClient from '@/components/main'

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <HomeClient />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';

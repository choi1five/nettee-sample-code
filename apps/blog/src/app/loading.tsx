import { Spinner } from '@nettee-sample/ui/components/spinner';
import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-grow items-center justify-center">
      <Spinner height={50} width={50} />
    </div>
  );
}

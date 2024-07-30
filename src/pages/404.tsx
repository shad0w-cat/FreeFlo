import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex w-full justify-center items-center flex-col text-white gap-6">
      <h1 className="text-4xl">Oops!</h1>
      <p className="text-xl">
        Sorry, this page doesn't exist 🥶.
        <p className="text-sm text-[rgba(255,255,255,0.3)] text-center">
          (404 Not Found)
        </p>
      </p>
    </div>
  );
}

import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="bg-zinc-900 w-screen h-screen font-sans">
      <nav>
        <div className="flex gap-5 justify-end py-3 px-3">
          <div className="px-5 py-3 rounded-xl bg-sky-300 w-max font-medium">
            <Link to="/">Home</Link>
          </div>
          <div className="px-5 py-3 rounded-xl bg-sky-300 w-max font-medium">
            <Link to="/about">About</Link>
          </div>

          <div className="px-5 py-3 rounded-xl bg-sky-300 w-max font-medium">
            <Link to="/calendar">Calendar</Link>
          </div>
        </div>
      </nav>
      <hr />
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

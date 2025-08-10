// components/FollowJourney.js
'use client';
import { useEffect } from 'react';

export default function FollowJourney() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.curator.io/published/67ce8903-93a1-4bcf-9ac5-1ff00f7bb57d.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="bg-white py-12 px-6 text-center">
      <h2 className="text-3xl font-semibold mb-8">Follow our journey</h2>
      <div id="curator-feed-default-feed-layout" className="mx-auto max-w-screen-xl">
        <a href="https://curator.io" target="_blank" className="crt-logo crt-tag" rel="noopener noreferrer">
          Powered by Curator.io
        </a>
      </div>
    </section>
  );
}

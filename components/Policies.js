'use client';
import React from 'react';

export default function Policies() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8 text-center">Policies</h1>
        <div className="space-y-8 text-lg leading-relaxed text-gray-800">
          <div>
            <h2 className="text-2xl font-bold mb-2">Cancellation Policy</h2>
            <p>
              Please provide at least 24 hours notice for cancellations...
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Late Arrival</h2>
            <p>
              Arrivals more than 15 minutes late may require rescheduling...
            </p>
          </div>
          {/* Add more policy items */}
        </div>
      </div>
    </section>
  );
}

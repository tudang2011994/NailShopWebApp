'use client';
import React from 'react';
import Navbar from "@/components/Navbar";

export default function Policies() {
  return (
    <div>
      <Navbar />
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-semibold mb-8 text-center">Policies</h1>
          <div className="space-y-8 text-lg leading-relaxed text-gray-800">

            <div>
              <h2 className="text-2xl font-bold mb-2">Bee You Nail & Spa – Safety & Service Commitment</h2>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Appointment Policies</h2>
              <p>
                By booking, you acknowledge we cannot guarantee exact minute-by-minute timing. Appointments are prioritized over walk-ins but may be delayed due to:
              </p>
              <ul className="list-disc list-inside ml-5">
                <li>Detailed designs for prior clients</li>
                <li>Last-minute client requests</li>
                <li>Clients arriving late</li>
                <li>Differences in technician speed</li>
              </ul>
              <p className="mt-2">
                Please arrive prepared with color ideas, backup designs, parking plans, and be ready to check in.
              </p>
              <p>
                <strong>Late arrival policy:</strong> Arriving more than <strong>10 minutes late</strong> will move your appointment to the walk-in list, even if you call ahead. If you cannot make your appointment, please call so we may assist other guests.
              </p>
              <p>
                <strong>Changing designs:</strong> If you request a change near or after completion, we may reschedule to be fair to the next guest. We can arrange a return visit to fix or redo services within a reasonable timeframe.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Walk-In Policy</h2>
              <p>
                Walk-ins are accepted on a <strong>first-come, first-served</strong> basis. If you leave the salon after signing in, your spot is not guaranteed when you return due to high no-show rates. Guests who wait in-store are prioritized.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Design Policy</h2>
              <p>
                We will do our best to replicate inspiration images, but exact matches are not guaranteed — each technician has a unique style. Please bring alternative design ideas in case your request is not feasible.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Same-Time Services</h2>
              <p>
                We cannot guarantee same-time services at this time. Services are typically performed sequentially due to staffing. On slower weekdays, we will do our best to accommodate same-time requests when capacity allows.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Pricing</h2>
              <p>
                If you need an updated total during your session, please ask your technician. Our staff is trained to clearly explain costs.
              </p>
              <p>
                <strong>Longer nails:</strong> Longer extensions require additional time, more materials, and extra craftsmanship, which is reflected in pricing.
              </p>
              <p>
                <strong>Outside products:</strong> We do not accept or use products brought from outside the salon. All services are performed with our professional-grade, tested products for safety and consistency.
              </p>
              <p>
                <strong>Payment methods:</strong> A 1$ fee applies to card transactions, including credit/debit cards, Apple Pay, and other digital payment services.
              </p>
            </div>

            {/* <div>
              <h2 className="text-2xl font-bold mb-2">Discount Policy</h2>
              <p>
                To treat all guests fairly, Bee You Nail & Spa does not provide discounts for special groups. Our standard pricing ensures equal value for everyone.
              </p>
            </div> */}

            <div>
              <h2 className="text-2xl font-bold mb-2">Sanitation & Tools</h2>
              <p>
                We follow strict sanitation procedures: sanitizing workstations, chairs, treatment rooms, and tools regularly. Tools are cleaned before placement in sanitizing bags and opened in front of clients for transparency.
              </p>
              <ul className="list-disc list-inside ml-5">
                <li>Paraffin wax is <strong>never reused</strong>.</li>
                <li>Technicians carry at least <strong>5 sterilized clippers</strong> in case one is dropped.</li>
                <li>Pedicure liners, buffers, files, and scrubs are new for each client.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Mask Policy</h2>
              <p>
                Masks are optional. We recommend masks for guests with underlying health concerns or sensitivity to salon odors. We work to minimize odors but cannot guarantee complete removal.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Repairs</h2>
              <p>
                If you have concerns after a service, contact us within <strong>7 days</strong>. We will review your case and suggest a solution. If repairs are requested outside the repair window, standard service charges may apply. Repair service are not provided when the guest cannot return within requested timeframes. No refund for all services.
              </p>
            </div>

            <div className="text-center text-gray-600 mt-8">
              Thank you for choosing <strong>Bee You Nail & Spa</strong>. We value your trust and appreciate your cooperation in helping us maintain a safe, fair, and pleasant experience for all guests.
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

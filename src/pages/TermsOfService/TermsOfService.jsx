import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-base-100 py-16 px-4">
      <title>Terms of Service | TravelEase</title>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">
          Terms of Service
        </h1>
        
        <div className="bg-base-200 rounded-lg p-8 space-y-6">
          <p className="text-sm text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">1. Acceptance of Terms</h2>
            <p className="text-base-content/80">
              By accessing and using TravelEase, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">2. Service Description</h2>
            <p className="text-base-content/80">
              TravelEase is a platform that connects vehicle owners with users seeking to rent 
              vehicles for travel purposes. We facilitate bookings but are not responsible for 
              the actual vehicles or services provided by vehicle owners.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">3. User Responsibilities</h2>
            <p className="text-base-content/80">As a user of TravelEase, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-base-content/80 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the platform only for lawful purposes</li>
              <li>Respect the rights of other users and vehicle owners</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">4. Vehicle Owner Responsibilities</h2>
            <p className="text-base-content/80">Vehicle owners must:</p>
            <ul className="list-disc list-inside space-y-2 text-base-content/80 ml-4">
              <li>Provide accurate vehicle information and photos</li>
              <li>Maintain vehicles in safe, working condition</li>
              <li>Honor confirmed bookings</li>
              <li>Comply with local licensing and insurance requirements</li>
              <li>Treat renters with respect and professionalism</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">5. Booking and Cancellation</h2>
            <p className="text-base-content/80">
              Bookings are subject to availability and confirmation by vehicle owners. 
              Cancellation policies may vary by vehicle owner. Users may cancel bookings 
              through their dashboard, subject to applicable cancellation policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">6. Payment Terms</h2>
            <p className="text-base-content/80">
              Payment processing is handled through secure third-party providers. 
              TravelEase may charge service fees for bookings. All prices are displayed 
              in Bangladeshi Taka (৳) unless otherwise specified.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">7. Limitation of Liability</h2>
            <p className="text-base-content/80">
              TravelEase acts as an intermediary platform. We are not liable for any damages, 
              injuries, or losses that may occur during vehicle rentals. Users and vehicle 
              owners are responsible for their own insurance coverage.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">8. Prohibited Activities</h2>
            <p className="text-base-content/80">Users may not:</p>
            <ul className="list-disc list-inside space-y-2 text-base-content/80 ml-4">
              <li>Use the platform for illegal activities</li>
              <li>Attempt to circumvent our security measures</li>
              <li>Post false or misleading information</li>
              <li>Harass or discriminate against other users</li>
              <li>Violate intellectual property rights</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">9. Account Termination</h2>
            <p className="text-base-content/80">
              We reserve the right to suspend or terminate accounts that violate these terms 
              or engage in harmful activities. Users may also delete their accounts at any time 
              through their profile settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">10. Changes to Terms</h2>
            <p className="text-base-content/80">
              We may update these terms from time to time. Users will be notified of significant 
              changes via email or platform notifications. Continued use of the platform 
              constitutes acceptance of updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">11. Contact Information</h2>
            <p className="text-base-content/80">
              For questions about these Terms of Service, contact us at:
            </p>
            <div className="bg-base-100 p-4 rounded-lg">
              <p className="text-base-content/80">
                Email: legal@travelease.com<br />
                Phone: +880 1234 567890<br />
                Address: 123 Travel Street, Dhaka, Bangladesh
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
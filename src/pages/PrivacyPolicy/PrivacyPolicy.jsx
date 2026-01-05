import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-base-100 py-16 px-4">
      <title>Privacy Policy | TravelEase</title>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">
          Privacy Policy
        </h1>
        
        <div className="bg-base-200 rounded-lg p-8 space-y-6">
          <p className="text-sm text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">1. Information We Collect</h2>
            <p className="text-base-content/80">
              We collect information you provide directly to us, such as when you create an account, 
              book a vehicle, or contact us for support. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base-content/80 ml-4">
              <li>Personal information (name, email address, phone number)</li>
              <li>Account credentials and profile information</li>
              <li>Vehicle booking and trip details</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Communication records with our support team</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">2. How We Use Your Information</h2>
            <p className="text-base-content/80">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base-content/80 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process bookings and manage your account</li>
              <li>Send you confirmations, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Ensure the security and integrity of our platform</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">3. Information Sharing</h2>
            <p className="text-base-content/80">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share your information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base-content/80 ml-4">
              <li>With vehicle owners when you make a booking</li>
              <li>With service providers who assist us in operating our platform</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">4. Data Security</h2>
            <p className="text-base-content/80">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">5. Your Rights</h2>
            <p className="text-base-content/80">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base-content/80 ml-4">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">6. Contact Us</h2>
            <p className="text-base-content/80">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-base-100 p-4 rounded-lg">
              <p className="text-base-content/80">
                Email: privacy@travelease.com<br />
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

export default PrivacyPolicy;
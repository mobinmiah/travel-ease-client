import React, { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaEnvelope, FaPhone, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I book a vehicle?",
      answer: "To book a vehicle, browse our available vehicles, select your preferred option, and click 'Book Now'. You'll need to create an account if you haven't already. Follow the booking process to confirm your reservation."
    },
    {
      id: 2,
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking through your dashboard under 'My Bookings'. Cancellation policies may vary depending on the vehicle owner and timing of cancellation."
    },
    {
      id: 3,
      question: "How do I add my vehicle to the platform?",
      answer: "To list your vehicle, log in to your account, go to your dashboard, and click 'Add Vehicle'. Fill in all required information including photos, pricing, and availability."
    },
    {
      id: 4,
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit/debit cards, mobile banking, and online payment gateways. All payments are processed securely through our trusted payment partners."
    },
    {
      id: 5,
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your consent. Read our Privacy Policy for more details."
    },
    {
      id: 6,
      question: "How do I contact vehicle owners?",
      answer: "Once you make a booking, you'll receive the vehicle owner's contact information. You can also message them through our platform's messaging system."
    },
    {
      id: 7,
      question: "What if there's an issue with my booking?",
      answer: "If you encounter any issues, contact our support team immediately through the contact form below or call our helpline. We're available 24/7 to assist you."
    },
    {
      id: 8,
      question: "How do I update my profile information?",
      answer: "Go to your dashboard and click on 'My Profile'. You can update your personal information, profile picture, and account settings from there."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 px-4">
      <title>Help Center | TravelEase</title>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Help Center
          </h1>
          <p className="text-lg text-base-content/70">
            Find answers to common questions and get the help you need
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="input input-bordered w-full pl-12 py-3 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <FaQuestionCircle className="mr-3" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-base-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-base-300 transition-colors"
                  >
                    <span className="font-semibold text-primary">{faq.question}</span>
                    {openFaq === faq.id ? (
                      <FaChevronUp className="text-primary" />
                    ) : (
                      <FaChevronDown className="text-primary" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-base-content/80">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No FAQs found matching your search.</p>
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="space-y-6">
            <div className="bg-base-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4">
                Still Need Help?
              </h3>
              <p className="text-base-content/70 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-primary" />
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm text-base-content/70">support@travelease.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaPhone className="text-primary" />
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-sm text-base-content/70">+880 1234 567890</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-base-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4">
                Send us a Message
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                  />
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                  />
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>Select a topic</option>
                    <option>Booking Issue</option>
                    <option>Payment Problem</option>
                    <option>Account Help</option>
                    <option>Vehicle Listing</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-24"
                    placeholder="Describe your issue or question..."
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="bg-base-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <a href="/aboutus" className="block text-base-content/70 hover:text-primary transition-colors">
                  About TravelEase
                </a>
                <a href="/privacy" className="block text-base-content/70 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-base-content/70 hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="/dashboard" className="block text-base-content/70 hover:text-primary transition-colors">
                  User Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
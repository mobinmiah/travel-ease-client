import React from "react";
import { toast } from "react-toastify";

const ContactPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast(
      "Your Message Will Not Sent to any One. This form is not Functional yet!"
    );
  };

  return (
    <section className="min-h-screen bg-base-100 py-20 px-5">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto">
          Have questions or feedback? We’d love to hear from you. Fill out the
          form below and our team will get back to you promptly.
        </p>
      </div>

      {/* Form + Info */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-base-200 p-8 rounded-xl shadow-lg space-y-6"
        >
          <div>
            <label className="block font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              className="input input-bordered w-full"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Message</label>
            <textarea
              name="message"
              required
              className="textarea textarea-bordered w-full"
              placeholder="Write your message here..."
              rows={6}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>

        {/* Contact Info Panel */}
        <div className="flex-1 bg-base-200 p-8 rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-primary">
            Our Contact Info
          </h2>
          <p>
            <strong>Email:</strong> support@travelease.com
          </p>
          <p>
            <strong>Phone:</strong> +880 1234 567890
          </p>
          <p>
            <strong>Address:</strong> 123 TravelEase Street, Dhaka, Bangladesh
          </p>
          <p>
            Our support team is available 24/7 to help you with bookings and
            inquiries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

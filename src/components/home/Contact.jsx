import React, { useState } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const Contact = () => {
  useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission to your backend
    console.log("Form submitted:", formData);
    
    // For demonstration, we'll just show a success message
    setFormSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Reset the form status after some time
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 bg-gradient-to-b from-[#471a67]/30 via-[#471a67]/20 to-black"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-[#471a67]/20 blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header with staggered reveal */}
          <div className="text-center mb-16 stagger-reveal">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#471a67] to-[#d3b840] bg-clip-text text-transparent">
                Contact Us
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Have questions about our team? Interested in sponsoring us or requesting a demonstration?
              We'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 mb-16">
            {/* Contact form with modern card styling */}
            <div className="md:col-span-3 reveal">
              <div className="modern-card p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gradient mb-6">Get in Touch</h3>
                
                {formSubmitted ? (
                  <div className="glass-panel border border-[#d3b840]/30 rounded-lg p-6 text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#471a67]/40 to-[#d3b840]/40 rounded-full blur-xl opacity-70 animate-pulse-slow"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#d3b840] relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                    <p className="text-gray-300">Your message has been sent. We'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#471a67]/10 border border-[#d3b840]/20 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3b840]/60 focus:bg-[#471a67]/20 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#471a67]/10 border border-[#d3b840]/20 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3b840]/60 focus:bg-[#471a67]/20 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#471a67]/10 border border-[#d3b840]/20 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3b840]/60 focus:bg-[#471a67]/20 transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full bg-[#471a67]/10 border border-[#d3b840]/20 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#d3b840]/60 focus:bg-[#471a67]/20 transition-colors"
                        placeholder="Tell us about your inquiry..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="btn-modern w-full py-3 px-6 text-white font-semibold"
                    >
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info with modern styling */}
            <div className="md:col-span-2 reveal">
              <div className="modern-card p-6 md:p-8 h-full">
                <h3 className="text-2xl font-bold text-gradient mb-6">Team Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#471a67] to-[#471a67]/70 flex items-center justify-center border border-[#d3b840]/20 shadow-neon mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d3b840]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <h4 className="text-lg font-medium text-white mb-1">Email Us</h4>
                      <a href="mailto:team7598@example.com" className="text-[#d3b840] hover:text-[#e4ce67] transition-colors">
                        team7598@example.com
                      </a>
                      <p className="text-gray-400 text-sm mt-1">
                        We'll respond within 48 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#471a67] to-[#471a67]/70 flex items-center justify-center border border-[#d3b840]/20 shadow-neon mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d3b840]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <h4 className="text-lg font-medium text-white mb-1">Our Location</h4>
                      <p className="text-gray-300">
                        SCA High School<br />
                        123 Space Avenue<br />
                        Wixom, MI 48393
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#471a67] to-[#471a67]/70 flex items-center justify-center border border-[#d3b840]/20 shadow-neon mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#d3b840]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <h4 className="text-lg font-medium text-white mb-1">Meeting Times</h4>
                      <p className="text-gray-300">
                        Monday - Thursday<br />
                        3:30 PM - 6:00 PM
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Additional weekend meetings during build season
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-lg font-medium text-white mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 rounded-full glass-panel border border-[#d3b840]/20 flex items-center justify-center text-[#d3b840] hover:border-[#d3b840]/60 hover:scale-110 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full glass-panel border border-[#d3b840]/20 flex items-center justify-center text-[#d3b840] hover:border-[#d3b840]/60 hover:scale-110 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full glass-panel border border-[#d3b840]/20 flex items-center justify-center text-[#d3b840] hover:border-[#d3b840]/60 hover:scale-110 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full glass-panel border border-[#d3b840]/20 flex items-center justify-center text-[#d3b840] hover:border-[#d3b840]/60 hover:scale-110 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map/location with modern styling */}
          <div className="reveal">
            <div className="modern-card p-0 overflow-hidden rounded-2xl h-80">
              <div className="h-full w-full bg-gradient-to-br from-[#471a67]/50 to-[#471a67]/20 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="mb-4 w-16 h-16 rounded-full bg-[#471a67]/50 border border-[#d3b840]/30 mx-auto flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#d3b840]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-white text-lg mb-4">
                    Interactive map would be displayed here.
                  </p>
                  <p className="text-gray-300">
                    Replace with an actual map embed for your team's location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern decorative elements */}
      <div 
        className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-radial from-[#471a67]/20 to-transparent rounded-full filter blur-3xl animate-pulse-slow" 
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-radial from-[#d3b840]/10 to-transparent rounded-full filter blur-3xl animate-pulse-slow" 
        aria-hidden="true" 
        style={{animationDelay: '2s'}}
      ></div>
    </section>
  );
};

export default Contact;

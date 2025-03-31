import React from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

// Placeholder for outreach event images - replace with actual images
const placeholderImage = "/Logo.png";

const Outreach = () => {
  useScrollReveal();

  const outreachEvents = [
    {
      title: "STEM Workshop Series",
      date: "Monthly",
      description: "Interactive workshops for elementary and middle school students to learn about robotics, coding, and engineering principles.",
      image: placeholderImage,
      impact: "Reached over 200 young students in 2024"
    },
    {
      title: "Robot Demonstrations",
      date: "Quarterly",
      description: "Public demonstrations of our competition robots at local schools, libraries and community events to inspire interest in STEM.",
      image: placeholderImage,
      impact: "Engaged with 15+ community organizations"
    },
    {
      title: "FLL Jr. Mentoring",
      date: "Fall & Spring",
      description: "Mentoring FIRST LEGO League Jr. teams to help younger students develop early robotics and teamwork skills.",
      image: placeholderImage,
      impact: "Mentored 8 elementary school teams"
    },
    {
      title: "Engineering Open House",
      date: "Annual",
      description: "Annual event where we invite the community to learn about FIRST Robotics and engage in hands-on STEM activities.",
      image: placeholderImage,
      impact: "500+ attendees at our last event"
    }
  ];

  return (
    <section
      id="outreach"
      className="relative py-20 md:py-28 bg-gradient-to-b from-black via-blue-950/20 to-black overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-64 bg-purple-500/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-64 bg-blue-500/10 blur-3xl -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzFhMSAxIDAgMTEwLTIgMSAxIDAgMDEwIDJ6bTIwLTFhMSAxIDAgMTEwLTIgMSAxIDAgMDEwIDJ6bS00MCAwYTEgMSAwIDExMC0yIDEgMSAwIDAxMCAyem0yMC0yMGExIDEgMCAxMTAtMiAxIDEgMCAwMTAgMnptMCAzOGExIDEgMCAxMTAtMiAxIDEgMCAwMTAgMnoiIGZpbGw9IiMyNjRkZTQiIGZpbGwtcnVsZT0ibm9uemVybyIgb3BhY2l0eT0iLjIiLz48L2c+PC9zdmc+')] opacity-5"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 reveal-bottom">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Community Outreach
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto reveal-bottom">
              Our team is committed to sharing our passion for STEM and robotics with the broader community. 
              Through outreach initiatives, we inspire the next generation of engineers and innovators.
            </p>
          </div>

          {/* Outreach mission */}
          <div className="mb-20 reveal-bottom">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4 text-white">Our Outreach Mission</h3>
                  <p className="text-gray-300 mb-4">
                    The SCA Constellations are dedicated to promoting STEM education beyond our team. We believe that 
                    by sharing our knowledge and excitement, we can help inspire more young people to explore careers 
                    in science, technology, engineering, and mathematics.
                  </p>
                  <p className="text-gray-300">
                    Through workshops, demonstrations, mentoring, and community events, we strive to make STEM accessible 
                    and engaging for students of all ages and backgrounds, creating a positive impact in our community.
                  </p>

                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ImpactStat number="15+" label="Events Per Year" />
                    <ImpactStat number="1,000+" label="Community Members Reached" />
                    <ImpactStat number="8" label="Schools Partnered" />
                    <ImpactStat number="200+" label="Volunteer Hours" />
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-full max-w-xs aspect-square rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center p-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Outreach events */}
          <div>
            <h3 className="text-2xl font-bold mb-10 text-center text-white reveal-bottom">
              Our Outreach Activities
            </h3>
            <div className="space-y-12">
              {outreachEvents.map((event, index) => (
                <OutreachEventCard 
                  key={index} 
                  title={event.title} 
                  date={event.date} 
                  description={event.description} 
                  image={event.image}
                  impact={event.impact}
                  isReversed={index % 2 !== 0}
                />
              ))}
            </div>
          </div>

          {/* Call to participate */}
          <div className="mt-20 reveal-bottom">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-white/10 p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Request a Demonstration</h3>
              <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                Interested in having our team present at your school, organization, or community event? 
                We'd love to share our robots and knowledge with your group!
              </p>
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Request Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OutreachEventCard = ({ title, date, description, image, impact, isReversed }) => (
  <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 items-center ${isReversed ? 'reveal-right' : 'reveal-left'}`}>
    <div className="md:w-1/3">
      <div className="relative rounded-xl overflow-hidden aspect-video">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="inline-block px-3 py-1 bg-blue-600/80 rounded-full text-sm text-white font-medium">
            {date}
          </span>
        </div>
      </div>
    </div>
    <div className="md:w-2/3">
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex items-center">
        <div className="w-5 h-5 mr-2 rounded-full bg-purple-600/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-purple-300 text-sm">{impact}</span>
      </div>
    </div>
  </div>
);

const ImpactStat = ({ number, label }) => (
  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/5">
    <p className="text-xl md:text-2xl font-bold text-blue-300">{number}</p>
    <p className="text-xs md:text-sm text-gray-400">{label}</p>
  </div>
);

export default Outreach;
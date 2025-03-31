import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

// Placeholder image for team members - replace with actual team photos
const placeholderImage = "/Logo-nobg-sm.png";

const Team = () => {
  useScrollReveal();

  const teamMembers = {
    mentors: [
      {
        name: "Dr. Sarah Rodriguez",
        role: "Lead Mentor / Engineering",
        image: placeholderImage,
        bio: "Mechanical engineer with 15 years of industry experience. Passionate about inspiring the next generation of innovators."
      },
      {
        name: "Michael Chen",
        role: "Programming Mentor",
        image: placeholderImage,
        bio: "Software developer and FIRST alumnus who guides our team in robot programming and control systems."
      },
      {
        name: "Amanda Park",
        role: "Business/Outreach Mentor",
        image: placeholderImage,
        bio: "Marketing executive who helps our team with community engagement and sponsorship development."
      }
    ],
    leadership: [
      {
        name: "Jordan Taylor",
        role: "Team Captain",
        image: placeholderImage,
        bio: "Senior with 3 years of FIRST experience. Leads team meetings and competition strategy."
      },
      {
        name: "Alex Rivera",
        role: "Engineering Lead",
        image: placeholderImage,
        bio: "Junior specializing in mechanical design. Oversees the robot build process."
      },
      {
        name: "Morgan Wu",
        role: "Programming Lead",
        image: placeholderImage,
        bio: "Senior who excels in Java and vision systems. Manages autonomous programming."
      },
      {
        name: "Sasha Kumar",
        role: "Business Lead",
        image: placeholderImage,
        bio: "Junior focused on sponsorships, outreach, and team logistics."
      }
    ],
    subteams: [
      {
        name: "Mechanical Team",
        description: "Designs and builds the physical robot structure and mechanisms.",
        skills: ["CAD Design", "Fabrication", "Mechanism Design", "Prototyping"]
      },
      {
        name: "Programming Team",
        description: "Develops the code that controls robot functions and autonomous capabilities.",
        skills: ["Java", "Vision Processing", "Motion Control", "Sensor Integration"]
      },
      {
        name: "Electrical Team",
        description: "Creates and maintains the robot's power systems and electronic components.",
        skills: ["Wiring", "Power Management", "Electronics", "Troubleshooting"]
      },
      {
        name: "Business/Outreach Team",
        description: "Handles team logistics, sponsorships, and community engagement activities.",
        skills: ["Marketing", "Fundraising", "Event Planning", "Documentation"]
      }
    ]
  };

  return (
    <section
      id="team"
      className="relative py-20 md:py-28 bg-gradient-to-b from-black via-indigo-950/20 to-black"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMjEuMTgxJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjNkM2M0ZGIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzZDNjNGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIgZD0iTTAgNDRoNDR2NDRIMHoiIHRyYW5zZm9ybT0icm90YXRlKC00NSA0NS4zNTUgNjcuNjQ1KSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 reveal-bottom">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto reveal-bottom">
              The SCA Constellations are powered by dedicated students and mentors who bring diverse skills
              and a shared passion for robotics, innovation, and STEM education.
            </p>
          </div>

          {/* Mentors section */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-10 text-center text-white reveal-bottom">
              Team Mentors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.mentors.map((mentor, index) => (
                <TeamMemberCard
                  key={index}
                  name={mentor.name}
                  role={mentor.role}
                  image={mentor.image}
                  bio={mentor.bio}
                  revealDirection={index === 0 ? "left" : index === teamMembers.mentors.length - 1 ? "right" : "bottom"}
                />
              ))}
            </div>
          </div>

          {/* Student Leadership */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-10 text-center text-white reveal-bottom">
              Student Leadership
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.leadership.map((leader, index) => (
                <TeamMemberCard
                  key={index}
                  name={leader.name}
                  role={leader.role}
                  image={leader.image}
                  bio={leader.bio}
                  revealDirection={
                    index === 0 ? "left" : 
                    index === teamMembers.leadership.length - 1 ? "right" : 
                    index < teamMembers.leadership.length / 2 ? "bottom" : "bottom"
                  }
                />
              ))}
            </div>
          </div>

          {/* Subteams */}
          <div>
            <h3 className="text-2xl font-bold mb-10 text-center text-white reveal-bottom">
              Our Subteams
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.subteams.map((team, index) => (
                <SubteamCard
                  key={index}
                  name={team.name}
                  description={team.description}
                  skills={team.skills}
                  revealDirection={
                    index % 2 === 0 ? "left" : "right"
                  }
                />
              ))}
            </div>
          </div>

          {/* Join the team */}
          <div className="mt-20 py-10 px-6 md:px-10 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 text-center reveal-bottom">
            <h3 className="text-2xl font-bold mb-4 text-white">Join Our Team!</h3>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8">
              Interested in robotics, programming, engineering, or business? The SCA Constellations
              welcomes students of all experience levels. No prior knowledge required - just bring
              your curiosity and enthusiasm!
            </p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-purple-500/10 blur-3xl -z-10" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-64 bg-blue-500/10 blur-3xl -z-10" aria-hidden="true"></div>
    </section>
  );
};

const TeamMemberCard = ({ name, role, image, bio, revealDirection }) => (
  <div className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 hover:bg-white/10 reveal-${revealDirection}`}>
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 mb-4 rounded-full overflow-hidden p-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
        <img src={image} alt={name} className="rounded-full w-full h-full object-cover" />
      </div>
      <h4 className="text-xl font-bold text-white mb-1">{name}</h4>
      <p className="text-blue-300 text-sm mb-3">{role}</p>
      <p className="text-gray-400 text-center">{bio}</p>
    </div>
  </div>
);

const SubteamCard = ({ name, description, skills, revealDirection }) => (
  <div className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl transition-all duration-300 reveal-${revealDirection}`}>
    <h4 className="text-xl font-bold text-white mb-3">{name}</h4>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-indigo-600/20 rounded-full text-sm text-indigo-200"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default Team;
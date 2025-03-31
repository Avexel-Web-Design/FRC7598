import React from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

// Placeholder image for team members - replace with actual team photos
const placeholderImage = "/Logo-nobg-sm.png";

const Team = () => {
  useScrollReveal();

  const teamMembers = {
    leadership: [
      {
        name: "Placeholder",
        role: "Team Captain",
        image: placeholderImage,
        bio: "Senior with 3 years of FIRST experience. Leads team meetings and competition strategy."
      },
      {
        name: "Placeholder",
        role: "Engineering Lead",
        image: placeholderImage,
        bio: "Junior specializing in mechanical design. Oversees the robot build process."
      },
      {
        name: "Placeholder",
        role: "Programming Lead",
        image: placeholderImage,
        bio: "Senior who excels in Java and vision systems. Manages autonomous programming."
      },
      {
        name: "Placeholder",
        role: "Business Lead",
        image: placeholderImage,
        bio: "Junior focused on sponsorships, outreach, and team logistics."
      }
    ],
  };

  return (
    <section
      id="team"
      className="relative py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMjEuMTgxJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjNkM2M0ZGIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzZDNjNGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIgZD0iTTAgNDRoNDR2NDRIMHoiIHRyYW5zZm9ybT0icm90YXRlKC00NSA0NS4zNTUgNjcuNjQ1KSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Student Leadership */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold mb-10 text-center text-white reveal-bottom">
              Captains
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

export default Team;
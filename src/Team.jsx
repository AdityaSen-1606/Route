import React from "react";

const teamMembers = [
  {
    name: "Aditya Sen",
    email: "adityasen1606@gmail.com",
    photo: "src/assets/20118004.jpg",
  },
  {
    name: "Pranjil Jain",
    email: "Pranjiljain26@gmail.com",
    photo: "src/assets/Team2.jpeg",
  },
  {
    name: "Akash Narayan Gadhvae",
    email: "akashngadhave@gmail.com",
    photo: "src/assets/Team3.jpeg",
  },
  {
    name: "Nikita Deshmukh",
    email: "nikitadeshmukh1309@gmail.com",
    photo: "src/assets/Team4.jpeg",
  },
];

const TeamPage = () => {
  return (
    <div className="team-container">
      {teamMembers.map((member, index) => (
        <div className="team-card" key={index}>
          <img
            src={member.photo}
            alt={`${member.name}`}
            className="team-photo"
          />
          <div className="team-info">
            <h2 className="team-name">{member.name}</h2>
            <p className="team-email">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamPage;

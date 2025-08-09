import React from 'react';
import './CharacterInfoPage.css';

const CharacterInfoPage = ({ character }) => {
  // Default character data if none provided
  const defaultCharacter = {
    id: "ilia-chavchavadze",
    name: {
      ka: "ილია ჭავჭავაძე",
      en: "Ilia Chavchavadze"
    },
    title: {
      ka: "საზოგადო მოღვაწე, მწერალი, პუბლიცისტი",
      en: "Public Figure, Writer, Publicist"
    },
    birthYear: 1837,
    deathYear: 1907,
    image: "/images/figures/ilia-chavchavadze.jpg",
    imageUrl: "/images/figures/ilia-chavchavadze.jpg",
    description: {
      ka: "XIX საუკუნის ქართველი საზოგადო მოღვაწე, მწერალი, პუბლიცისტი და პოლიტიკოსი. ის იყო თერგდალეულების ხელმძღვანელი და ქართული ეროვნული მოძრაობის ერთ-ერთი მთავარი იდეოლოგი.",
      en: "19th century Georgian public figure, writer, publicist and politician. He was the leader of Tergdaleulebi and one of the main ideologists of the Georgian national movement."
    },
    achievements: {
      ka: [
        "ქართული ენისა და კულტურის განვითარება",
        "საზოგადოებრივი აზრის ფორმირება", 
        "ლიტერატურული მემკვიდრეობის შექმნა",
        "ეროვნული თვითშეგნების აღზრდა"
      ],
      en: [
        "Development of Georgian language and culture",
        "Formation of public opinion",
        "Creation of literary heritage",
        "Education of national self-awareness"
      ]
    },
    historicalRole: "ილია ჭავჭავაძე ითვლება ქართული ეროვნული აღორძინების მთავარ ფიგურად. მისი მოღვაწეობა ხელს უწყობდა ქართული საზოგადოების განვითარებას და თანამედროვე ქართული ნაციონალიზმის ფორმირებას.",
    era: {
      ka: "XIX საუკუნე",
      en: "19th Century"
    },
    category: {
      ka: "მწერლები",
      en: "Writers"
    }
  };

  const char = character || defaultCharacter;

  return (
    <div className="character-info-content">
      {/* მარჯვენა მხარე - ილია ჭავჭავაძის ინფორმაცია */}
      <div className="ilia-info-section">
        <div className="ilia-info">
          <img 
            src={char.image} 
            alt={char.name?.ka || char.name} 
            className="ilia-portrait"
          />
          <h3 className="ilia-name">{char.name?.ka || char.name}</h3>
          <p className="ilia-description">
            {char.description?.ka || char.description}
          </p>
        </div>
      </div>

      <div className="page-number">3</div>
    </div>
  );
};

export default CharacterInfoPage; 
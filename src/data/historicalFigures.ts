export interface HistoricalFigure {
  id: string;
  name: {
    ka: string;
    en: string;
  };
  title: {
    ka: string;
    en: string;
  };
  birthYear: number;
  deathYear: number;
  image: string;
  imageUrl: string;
  description: {
    ka: string;
    en: string;
  };
  achievements: {
    ka: string[];
    en: string[];
  };
  historicalRole: string;
  greeting: string;
  era: {
    ka: string;
    en: string;
  };
  category: {
    ka: string;
    en: string;
  };
  videos: {
    number: number;
    title: string;
    description: string;
    url: string;
  }[];
}

export const categories = [
  {
    value: 'writers',
    label: {
      ka: 'მწერლები',
      en: 'Writers'
    }
  },
  {
    value: 'poets',
    label: {
      ka: 'პოეტები',
      en: 'Poets'
    }
  },
  {
    value: 'scientists',
    label: {
      ka: 'მეცნიერები',
      en: 'Scientists'
    }
  },
  {
    value: 'reformers',
    label: {
      ka: 'რეფორმატორები',
      en: 'Reformers'
    }
  }
];

export const eras = [
  {
    value: 'medieval',
    label: {
      ka: 'შუა საუკუნეები',
      en: 'Medieval'
    }
  },
  {
    value: 'renaissance',
    label: {
      ka: 'რენესანსი',
      en: 'Renaissance'
    }
  },
  {
    value: 'modern',
    label: {
      ka: 'თანამედროვე პერიოდი',
      en: 'Modern Period'
    }
  },
  {
    value: 'contemporary',
    label: {
      ka: 'თანამედროვე',
      en: 'Contemporary'
    }
  }
];

export const historicalFigures: HistoricalFigure[] = [
  {
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
      en: "19th century Georgian public figure, writer, publicist and politician. He was the leader of the Tergdaleulebi and one of the main ideologists of the Georgian national movement."
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
        "Raising national self-awareness"
      ]
    },
    historicalRole: "ილია ჭავჭავაძე ითვლება ქართული ეროვნული აღორძინების მთავარ ფიგურად. მისი მოღვაწეობა ხელს უწყობდა ქართული საზოგადოების განვითარებას და თანამედროვე ქართული ნაციონალიზმის ფორმირებას.",
    greeting: "გამარჯობა! მე ვარ ილია ჭავჭავაძე. შეგიძლიათ მკითხოთ ჩემს ცხოვრებაზე, მუშაობაზე და იდეალებზე.",
    era: {
      ka: "XIX საუკუნე",
      en: "19th Century"
    },
    category: {
      ka: "მწერლები",
      en: "Writers"
    },
    videos: [
      {
        number: 1,
        title: "დოკუმენტური ფილმი ნაწილი 1",
        description: "ილია ჭავჭავაძის ცხოვრება და მოღვაწეობა",
        url: "/videos/ilia-1.mp4"
      },
      {
        number: 2,
        title: "დოკუმენტური ფილმი ნაწილი 2",
        description: "საზოგადოებრივი მოღვაწეობა",
        url: "/videos/ilia-2.mp4"
      },
      {
        number: 3,
        title: "დოკუმენტური ფილმი ნაწილი 3",
        description: "ლიტერატურული მემკვიდრეობა",
        url: "/videos/ilia-3.mp4"
      }
    ]
  },
  {
    id: "vazha-pshavela",
    name: {
      ka: "ვაჟა-ფშაველა",
      en: "Vazha-Pshavela"
    },
    title: {
      ka: "პოეტი, მწერალი, ფილოსოფოსი",
      en: "Poet, Writer, Philosopher"
    },
    birthYear: 1861,
    deathYear: 1915,
    image: "/images/figures/vazha-pshavela.jpg",
    imageUrl: "/images/figures/vazha-pshavela.jpg",
    description: {
      ka: "XIX-XX საუკუნეების ქართველი პოეტი, მწერალი და ფილოსოფოსი. ის იყო ქართული რომანტიზმის მთავარი წარმომადგენელი და ფშავური ფოლკლორის შემსწავლელი.",
      en: "19th-20th century Georgian poet, writer and philosopher. He was the main representative of Georgian romanticism and a researcher of Pshavian folklore."
    },
    achievements: {
      ka: [
        "ქართული რომანტიზმის განვითარება",
        "ფშავური ფოლკლორის შესწავლა",
        "ფილოსოფიური პოეზიის შექმნა",
        "ეროვნული იდენტობის განვითარება"
      ],
      en: [
        "Development of Georgian romanticism",
        "Study of Pshavian folklore",
        "Creation of philosophical poetry",
        "Development of national identity"
      ]
    },
    historicalRole: "ვაჟა-ფშაველა ითვლება ქართული ლიტერატურის ერთ-ერთ უდიდეს ფიგურად. მისი შემოქმედება ხელს უწყობდა ქართული კულტურის განვითარებას და ეროვნული თვითშეგნების აღზრდას.",
    greeting: "გამარჯობა! მე ვარ ვაჟა-ფშაველა. შეგიძლიათ მკითხოთ ჩემს შემოქმედებაზე, ფილოსოფიაზე და ცხოვრებისეულ გამოცდილებაზე.",
    era: {
      ka: "XIX-XX საუკუნე",
      en: "19th-20th Century"
    },
    category: {
      ka: "პოეტები",
      en: "Poets"
    },
    videos: [
      {
        number: 1,
        title: "დოკუმენტური ფილმი ნაწილი 1",
        description: "ვაჟა-ფშაველას ცხოვრება და შემოქმედება",
        url: "/videos/vazha-1.mp4"
      },
      {
        number: 2,
        title: "დოკუმენტური ფილმი ნაწილი 2",
        description: "პოეტური მემკვიდრეობა",
        url: "/videos/vazha-2.mp4"
      }
    ]
  },
  {
    id: "shota-rustaveli",
    name: {
      ka: "შოთა რუსთაველი",
      en: "Shota Rustaveli"
    },
    title: {
      ka: "პოეტი, მწერალი, ფილოსოფოსი",
      en: "Poet, Writer, Philosopher"
    },
    birthYear: 1160,
    deathYear: 1216,
    image: "/images/figures/shota-rustaveli.jpg",
    imageUrl: "/images/figures/shota-rustaveli.jpg",
    description: {
      ka: "XII საუკუნის ქართველი პოეტი, მწერალი და ფილოსოფოსი. ის არის ქართული ლიტერატურის უდიდესი ნაწარმოების - 'ვეფხისტყაოსნის' ავტორი.",
      en: "12th century Georgian poet, writer and philosopher. He is the author of the greatest work of Georgian literature - 'The Knight in the Panther's Skin'."
    },
    achievements: {
      ka: [
        "'ვეფხისტყაოსნის' შექმნა",
        "ქართული პოეზიის განვითარება",
        "ფილოსოფიური აზროვნების განვითარება",
        "ეროვნული კულტურის გამდიდრება"
      ],
      en: [
        "Creation of 'The Knight in the Panther's Skin'",
        "Development of Georgian poetry",
        "Development of philosophical thinking",
        "Enrichment of national culture"
      ]
    },
    historicalRole: "შოთა რუსთაველი ითვლება ქართული ლიტერატურის უდიდეს ფიგურად. მისი 'ვეფხისტყაოსანი' არის ქართული კულტურის უმნიშვნელოვანესი ნაწარმოები.",
    greeting: "გამარჯობა! მე ვარ შოთა რუსთაველი. შეგიძლიათ მკითხოთ ჩემს შემოქმედებაზე, ფილოსოფიაზე და 'ვეფხისტყაოსანზე'.",
    era: {
      ka: "შუა საუკუნეები",
      en: "Medieval"
    },
    category: {
      ka: "პოეტები",
      en: "Poets"
    },
    videos: [
      {
        number: 1,
        title: "დოკუმენტური ფილმი ნაწილი 1",
        description: "შოთა რუსთაველის ცხოვრება",
        url: "/videos/ilia-1.mp4"
      },
      {
        number: 2,
        title: "დოკუმენტური ფილმი ნაწილი 2",
        description: "'ვეფხისტყაოსნის' შექმნა",
        url: "/videos/ilia-2.mp4"
      }
    ]
  },
  {
    id: "niko-nikoladze",
    name: {
      ka: "ნიკო ნიკოლაძე",
      en: "Niko Nikoladze"
    },
    title: {
      ka: "მეცნიერი, რეფორმატორი, საზოგადო მოღვაწე",
      en: "Scientist, Reformer, Public Figure"
    },
    birthYear: 1843,
    deathYear: 1928,
    image: "/images/figures/niko-nikoladze.jpg",
    imageUrl: "/images/figures/niko-nikoladze.jpg",
    description: {
      ka: "XIX-XX საუკუნეების ქართველი მეცნიერი, რეფორმატორი და საზოგადო მოღვაწე. ის იყო ქართული მეცნიერების ფუნდატორი და განათლების სისტემის რეფორმატორი.",
      en: "19th-20th century Georgian scientist, reformer and public figure. He was the founder of Georgian science and a reformer of the education system."
    },
    achievements: {
      ka: [
        "თბილისის უნივერსიტეტის დაარსება",
        "ქართული მეცნიერების განვითარება",
        "საგანმანათლებლო რეფორმების გატარება",
        "სამეცნიერო ჟურნალების დაარსება"
      ],
      en: [
        "Foundation of Tbilisi University",
        "Development of Georgian science",
        "Implementation of educational reforms",
        "Establishment of scientific journals"
      ]
    },
    historicalRole: "ნიკო ნიკოლაძე ითვლება ქართული მეცნიერების ფუნდატორად. მისი მოღვაწეობა ხელს უწყობდა საქართველოს განათლების სისტემის განვითარებას და თანამედროვე ქართული მეცნიერების ფორმირებას.",
    greeting: "გამარჯობა! მე ვარ ნიკო ნიკოლაძე. შეგიძლიათ მკითხოთ ჩემს მეცნიერულ მუშაობაზე, რეფორმებზე და განათლების განვითარებაზე.",
    era: {
      ka: "XIX-XX საუკუნე",
      en: "19th-20th Century"
    },
    category: {
      ka: "მეცნიერები",
      en: "Scientists"
    },
    videos: [
      {
        number: 1,
        title: "დოკუმენტური ფილმი ნაწილი 1",
        description: "ნიკო ნიკოლაძის ცხოვრება და მოღვაწეობა",
        url: "/videos/vazha-1.mp4"
      },
      {
        number: 2,
        title: "დოკუმენტური ფილმი ნაწილი 2",
        description: "მეცნიერული მუშაობა",
        url: "/videos/vazha-2.mp4"
      }
    ]
  }
];

export const getHistoricalFigure = (id: string): HistoricalFigure | undefined => {
  return historicalFigures.find(figure => figure.id === id);
}; 
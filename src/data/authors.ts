export interface Author {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  achievements: string[];
  quotes: string[];
  videos: string[];
}

export const authors: Author[] = [
  {
    id: 'ilia-chavchavadze',
    name: 'ილია ჭავჭავაძე',
    title: 'ერის მამა',
    subtitle: 'თერგდალეულების ხელმძღვანელი',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ilia_Chavchavadze_by_Dimitri_Yermakov.jpg/800px-Ilia_Chavchavadze_by_Dimitri_Yermakov.jpg',
    description: 'ილია ჭავჭავაძე (1837-1907) — ქართველი მწერალი, პოეტი, პუბლიცისტი, პოლიტიკური და საზოგადო მოღვაწე, საქართველოს ეროვნულ-განმათავისუფლებელი მოძრაობის ლიდერი. ქართველებმა მას „ერის მამა" უწოდეს.',
    achievements: [
      'თერგდალეულების მოძრაობის ხელმძღვანელობა',
      'ქართული ლიტერატურის განვითარება',
      'საზოგადოებრივი რეფორმების გატარება'
    ],
    quotes: [
      'აზრის დაბადება',
      'ყოველი სიტყვა, ფურცელზე დატანილი, მომავლის თესლია.',
      'სიტყვის გავრცელება',
      'ნაბეჭდი სიტყვა ერის ცნობიერების ბურჯია.',
      'ჩემი მამული',
      'მთა და ბარი, მდინარე და წყარო - ეს არის ჩვენი სამშობლო.',
      'ცოდნის სათავე',
      'წიგნი ერთადერთი უკვდავი რამ არის ამქვეყნად.'
    ],
    videos: [
      'https://assets.mixkit.co/videos/preview/mixkit-man-writing-a-letter-with-a-fountain-pen-32820-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-historic-printing-press-at-work-4322-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-gorgeous-mountain-range-2287-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-large-library-of-old-books-4265-large.mp4'
    ]
  },
  {
    id: 'vazha-pshavela',
    name: 'ვაჟა ფშაველა',
    title: 'ქართული პოეზიის კლასიკოსი',
    subtitle: 'ალუდა ქეთელაურის ავტორი',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Vazha-Pshavela.jpg/800px-Vazha-Pshavela.jpg',
    description: 'ვაჟა ფშაველა (1861-1915) — დიდი ქართველი პოეტი, მწერალი და საზოგადო მოღვაწე. მისი შემოქმედება ქართული ლიტერატურის უმაღლესი მიღწევაა.',
    achievements: [
      'ქართული რომანტიზმის განვითარება',
      'ალუდა ქეთელაურის შექმნა',
      'ქართული პოეზიის მოდერნიზაცია'
    ],
    quotes: [
      'პოეზიის ძალა',
      'სიტყვა უფრო ძლიერია ვიდრე ხმალი.',
      'ალუდას სული',
      'მთის ბავშვი ვარ, მთის ბავშვი ვიქნები.',
      'სამშობლოს სიყვარული',
      'მთა და ბარი ჩემი სამშობლოა.',
      'პოეტის მისია',
      'პოეტი ხალხის ხმაა.'
    ],
    videos: [
      'https://assets.mixkit.co/videos/preview/mixkit-man-writing-a-letter-with-a-fountain-pen-32820-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-historic-printing-press-at-work-4322-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-gorgeous-mountain-range-2287-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-large-library-of-old-books-4265-large.mp4'
    ]
  },
  {
    id: 'niko-nikoladze',
    name: 'ნიკო ნიკოლაძე',
    title: 'ქართული მეცნიერების ფუნდატორი',
    subtitle: 'მეცნიერი და პედაგოგი',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Niko_Nikoladze.jpg/800px-Niko_Nikoladze.jpg',
    description: 'ნიკო ნიკოლაძე (1843-1928) — ქართველი მეცნიერი, პედაგოგი და საზოგადო მოღვაწე. მისი შრომა ქართული მეცნიერების განვითარებაში უმნიშვნელოვანესია.',
    achievements: [
      'ქართული მეცნიერების განვითარება',
      'პედაგოგიური სისტემის რეფორმა',
      'საზოგადოებრივი მოძრაობის ხელმძღვანელობა'
    ],
    quotes: [
      'მეცნიერების ძალა',
      'ცოდნა ძალაა.',
      'განათლების მნიშვნელობა',
      'განათლება ხალხის განვითარების საფუძველია.',
      'მეცნიერის მისია',
      'მეცნიერი ხალხის მსახურია.',
      'პროგრესის გზა',
      'მეცნიერება პროგრესის ძრავაა.'
    ],
    videos: [
      'https://assets.mixkit.co/videos/preview/mixkit-man-writing-a-letter-with-a-fountain-pen-32820-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-historic-printing-press-at-work-4322-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-gorgeous-mountain-range-2287-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-large-library-of-old-books-4265-large.mp4'
    ]
  },
  {
    id: 'shota-rustaveli',
    name: 'შოთა რუსთაველი',
    title: 'ვეფხისტყაოსნის ავტორი',
    subtitle: 'ქართული ლიტერატურის კლასიკოსი',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Shota_Rustaveli.jpg/800px-Shota_Rustaveli.jpg',
    description: 'შოთა რუსთაველი (XII საუკუნე) — დიდი ქართველი პოეტი, ვეფხისტყაოსნის ავტორი. მისი შემოქმედება ქართული ლიტერატურის უმაღლესი მიღწევაა.',
    achievements: [
      'ვეფხისტყაოსნის შექმნა',
      'ქართული პოეზიის განვითარება',
      'საერთაშორისო ლიტერატურაში ქართული კულტურის პოპულარიზაცია'
    ],
    quotes: [
      'სიყვარულის ძალა',
      'რა არის სიყვარული? ეს არის ცეცხლი, რომელიც ცეცხლში იწვის.',
      'მეგობრობის მნიშვნელობა',
      'მეგობარი უფრო ძვირფასია ვიდრე ოქრო.',
      'სამართლიანობა',
      'სამართლიანობა ყველაფრის ზემოთაა.',
      'პოეტის მისია',
      'პოეტი ხალხის სულია.'
    ],
    videos: [
      'https://assets.mixkit.co/videos/preview/mixkit-man-writing-a-letter-with-a-fountain-pen-32820-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-historic-printing-press-at-work-4322-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-gorgeous-mountain-range-2287-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-large-library-of-old-books-4265-large.mp4'
    ]
  },
  {
    id: 'david-agmashenebeli',
    name: 'დავით აღმაშენებელი',
    title: 'საქართველოს უდიდესი მეფე',
    subtitle: 'ქართული კულტურის აყვავების პერიოდის მმართველი',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/David_IV_of_Georgia.jpg/800px-David_IV_of_Georgia.jpg',
    description: 'დავით IV აღმაშენებელი (1073-1125) — საქართველოს უდიდესი მეფე, რომელმაც ქართული სახელმწიფო უდიდესი ძლიერების პიკამდე მიიყვანა.',
    achievements: [
      'საქართველოს გაერთიანება',
      'გელათის აკადემიის დაარსება',
      'ქართული კულტურის აყვავება'
    ],
    quotes: [
      'მეფის მისია',
      'მეფე ხალხის მსახურია.',
      'განათლების მნიშვნელობა',
      'განათლება ხალხის ძალაა.',
      'სამართლიანობა',
      'სამართლიანობა მეფის ძირითადი ვალდებულებაა.',
      'კულტურის განვითარება',
      'კულტურა ხალხის სულია.'
    ],
    videos: [
      'https://assets.mixkit.co/videos/preview/mixkit-man-writing-a-letter-with-a-fountain-pen-32820-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-historic-printing-press-at-work-4322-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-gorgeous-mountain-range-2287-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-large-library-of-old-books-4265-large.mp4'
    ]
  },
  {
    id: 'akaki-tsereteli',
    name: 'აკაკი წერეთელი',
    title: 'სულიკოს ავტორი',
    subtitle: 'ქართული ლიტერატურის კლასიკოსი',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Akaki_Tsereteli.jpg/800px-Akaki_Tsereteli.jpg',
    description: 'აკაკი წერეთელი (1840-1915) — დიდი ქართველი პოეტი, მწერალი და საზოგადო მოღვაწე, თერგდალეულების ერთ-ერთი ლიდერი.',
    achievements: [
      'სულიკოს შექმნა',
      'ქართული პოეზიის განვითარება',
      'ფოლკლორული მოტივების ლიტერატურაში შეტანა'
    ],
    quotes: [
      'სულიკოს სიყვარული',
      'სულიკო, ჩემი სიყვარული, როგორ ხარ?',
      'პოეტის მისია',
      'პოეტი ხალხის ხმაა.',
      'სამშობლოს სიყვარული',
      'სამშობლო ყველაფრის ზემოთაა.',
      'კულტურის მნიშვნელობა',
      'კულტურა ხალხის სულია.'
    ],
    videos: [
      'https://assets.mixkit.co/videos/preview/mixkit-man-writing-a-letter-with-a-fountain-pen-32820-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-historic-printing-press-at-work-4322-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-gorgeous-mountain-range-2287-large.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-a-large-library-of-old-books-4265-large.mp4'
    ]
  }
];

export const getAuthorById = (id: string): Author | undefined => {
  return authors.find(author => author.id === id);
}; 
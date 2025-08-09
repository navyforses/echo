# Echo - ქართული ისტორიული ფიგურების ციფრული ბიბლიოთეკა

**ციფრული ხმა წარსულიდან - ქართული ისტორიის ცოცხალი ქრონიკები**

---

## 📚 პროექტის აღწერა

Echo არის ინოვაციური ციფრული პლატფორმა, რომელიც საშუალებას გაძლევთ უსაუბროდ ქართული ისტორიის უდიდეს მოღვაწეებთან AI ჩატის მეშვეობით. პროექტი აერთიანებს მოდერნულ ვებ ტექნოლოგიებს, ქართული კულტურული მემკვიდრეობის პრეზენტაციას და ინტერაქტიულ სწავლების გამოცდილებას.

## ✨ ძირითადი ფუნქციები

- 🤖 **AI ჩატი** - უსაუბროდ ისტორიულ ფიგურებთან
- 📚 **3D წიგნების ეფექტები** - ინტერაქტიული ციფრული წიგნები
- 🎥 **ვიდეო ინტეგრაცია** - თითოეული ფიგურისთვის ვიდეო მასალები
- 🔍 **ძიების სისტემა** - სახელით, სათაურით, აღწერით
- 📅 **ეპოქის ფილტრები** - საუკუნეების მიხედვით
- 🌐 **ორენოვანი მხარდაჭერა** - ქართული და ინგლისური
- 📱 **Responsive დიზაინი** - მობილური და დესკტოპი

## 🏛️ ისტორიული ფიგურები

- **ილია ჭავჭავაძე** (XIX-XX საუკუნე) - თერგდალეულების ხელმძღვანელი
- **ვაჟა ფშაველა** (XIX-XX საუკუნე) - ქართული პოეზიის კლასიკოსი
- **ნიკო ნიკოლაძე** (XIX-XX საუკუნე) - ქართული მეცნიერების ფუნდატორი
- **შოთა რუსთაველი** (XII საუკუნე) - ვეფხისტყაოსნის ავტორი
- **დავით აღმაშენებელი** (XI-XII საუკუნე) - საქართველოს უდიდესი მეფე

## 🛠️ ტექნოლოგიები

### Frontend
- **React 18** - მოდერნული UI ბიბლიოთეკა
- **TypeScript** - ტიპ-უსაფრთხო განვითარება
- **Vite** - სწრაფი development და build სისტემა
- **Tailwind CSS** - utility-first CSS ფრეიმვორკი
- **Framer Motion** - ანიმაციების ბიბლიოთეკა

### State Management & Routing
- **Redux Toolkit** - მდგრადი state management
- **React Router** - client-side routing
- **React Query** - server state management

### Internationalization
- **i18next** - მრავალენოვანი მხარდაჭერა
- **react-i18next** - React ინტეგრაცია

### 3D & Interactive
- **React PageFlip** - 3D წიგნების ეფექტები
- **Three.js** - 3D გრაფიკა
- **React Three Fiber** - React ინტეგრაცია

## 🚀 დაყენება და გაშვება

### წინაპირობები
- Node.js 18+ 
- npm ან yarn

### ინსტალაცია

```bash
# რეპოზიტორიის კლონირება
git clone https://github.com/your-username/echo.git
cd echo

# დამოკიდებულებების ინსტალაცია
npm install

# Development სერვერის გაშვება
npm run dev

# Production build
npm run build

# Build-ის preview
npm run preview
```

### Environment Variables

```env
VITE_APP_TITLE=Echo
VITE_APP_DESCRIPTION=ციფრული ხმა წარსულიდან
VITE_API_URL=https://api.echo.georgia.com
```

## 📁 პროექტის სტრუქტურა

```
echo/
├── public/                 # Static ფაილები
│   ├── images/            # სურათები
│   ├── videos/            # ვიდეო ფაილები
│   └── echo-logo.svg      # ლოგო
├── src/
│   ├── components/        # React კომპონენტები
│   │   ├── Navigation.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── shared/
│   ├── features/          # ფუნქციონალური მოდულები
│   │   ├── landing/       # მთავარი გვერდი
│   │   └── library/       # ბიბლიოთეკა
│   ├── data/              # მონაცემები
│   │   └── historicalFigures.ts
│   ├── store/             # Redux store
│   ├── locales/           # თარგმანები
│   └── styles/            # CSS სტილები
├── package.json
└── README.md
```

## 🎨 დიზაინის სისტემა

### ფერების პალიტრა
- **ოქროსი** (#FFD700) - პირველადი ფერი
- **შოკოლადი** (#8B4513) - მეორადი ფერი
- **შავი** (#000000) - ფონი
- **თეთრი** (#FFFFFF) - ტექსტი

### ფონტები
- **Noto Serif Georgian** - ქართული ტექსტი
- **BPG Arial** - ლათინური ტექსტი

## 🔧 Development

### Code Style
- **ESLint** - კოდის ხარისხის კონტროლი
- **Prettier** - კოდის ფორმატირება
- **TypeScript** - ტიპების შემოწმება

### Testing
```bash
# Unit ტესტები
npm run test

# E2E ტესტები
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📊 Performance

### Optimization
- **Code Splitting** - lazy loading
- **Image Optimization** - WebP ფორმატი
- **Bundle Analysis** - webpack-bundle-analyzer
- **Caching** - service workers

### Metrics
- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🌐 Deployment

### Production
```bash
# Build
npm run build

# Deploy to Vercel/Netlify
npm run deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribution

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code of Conduct
- პატივისცემა ყველა contributor-ის მიმართ
- კონსტრუქტიული კრიტიკა
- ქართული ენის პრიორიტეტი

## 📄 ლიცენზია

ეს პროექტი ლიცენზირებულია MIT ლიცენზიით - იხილეთ [LICENSE](LICENSE) ფაილი დეტალებისთვის.

## 📞 კონტაქტი

- **Email**: info@echo.georgia.com
- **Website**: https://echo.georgia.com
- **GitHub**: https://github.com/echo-team

## 🙏 მადლობა

გმადლობთ ქართული კულტურისა და ისტორიის პოპულარიზაციაში წვლილის შეტანისთვის!

---

**Echo Team** © 2024 - ქართული ისტორიის ციფრული ხმა 
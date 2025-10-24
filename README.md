# 🚀 SAST Club Website

<div align="center">

**Society for Astrophysics and Space Technology**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?logo=node.js)](https://nodejs.org/)

*A collaborative platform showcasing the spirit, achievements, and events of SAST*

</div>

---

## 📖 About

Welcome to the official repository of the **Society for Astrophysics and Space Technology (SAST)** website. This platform serves as the digital hub for our club, featuring:

- 🌟 **Member Profiles** - Showcase our talented team
- 🏆 **Contribution Leaderboard** - Track open-source contributions
- 🛰️ **Satellite Tracking** - Real-time satellite visualization
- 📰 **Astronomy News** - Latest space discoveries
- 📅 **Event Calendar** - Upcoming workshops and events
- 🎓 **Documentation Hub** - Learning resources and guides
- 🛍️ **Merch Store** - SAST merchandise

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19.0.0 + Vite
- **Styling:** TailwindCSS, Framer Motion
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **3D Visualization:** Cesium, Resium
- **Icons:** Lucide React, React Icons

### Backend
- **Runtime:** Node.js + Express
- **Database:** Sequelize ORM
- **Authentication:** JWT (planned)

### Tools & Libraries
- **Satellite Tracking:** satellite.js
- **Markdown:** marked
- **Date Handling:** date-fns
- **Notifications:** React Hot Toast

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SASTxNST/Website_SAST.git
   cd Website_SAST
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the root directory
   cp .env.example .env
   ```
   
   Add the following variables:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   VITE_FRONTEND_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Visit `http://localhost:5173` in your browser

5. **Start the backend server** (optional)
   ```bash
   cd backend
   npm install
   npm start
   ```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 🤝 Contributing

**Only official SAST Club members are allowed to contribute to this repository.**

### How to Contribute

1. **Prerequisites**
   - Be a verified SAST club member
   - Follow our GitHub organization [@SASTxNST](https://github.com/SASTxNST)
   - Read the [Code of Conduct](src/components/docs/code-of-conduct.md)

2. **Choose a contribution area**
   - 📚 **Documentation** - Write guides, tutorials, FAQs
   - 💻 **Code** - Frontend/backend features, bug fixes
   - 🎨 **Design** - UI/UX improvements, graphics
   - 🧪 **Testing** - Write tests, report bugs
   - 📊 **Data** - Update member profiles, events

3. **Development workflow**
   ```bash
   # Fork the repository
   # Create a feature branch
   git checkout -b feature/your-feature-name
   
   # Make your changes
   # Commit with clear messages
   git commit -m "feat: add satellite filter feature"
   
   # Push to your fork
   git push origin feature/your-feature-name
   
   # Create a Pull Request
   ```

4. **PR Guidelines**
   - Write clear, descriptive PR titles
   - Reference related issues
   - Add screenshots for UI changes
   - Ensure all tests pass
   - Follow code style conventions

### Contribution Ideas
- 🐛 Fix bugs from the [Issues](https://github.com/SASTxNST/Website_SAST/issues) tab
- ⚡ Improve performance and optimization
- ♿ Enhance accessibility features
- 📱 Improve mobile responsiveness
- 🔒 Add security improvements
- 🧪 Write unit and integration tests
- 📝 Complete placeholder documentation

---

## 📂 Project Structure

```
Website_SAST/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── data/           # JSON data files
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Context providers
│   ├── utils/          # Utility functions
│   └── workers/        # Web workers
├── backend/            # Express backend server
├── public/             # Static assets
└── package.json        # Dependencies
```

---

## 🔗 Useful Links

- **GitHub Repository:** [Website_SAST](https://github.com/SASTxNST/Website_SAST)
- **Organization:** [@SASTxNST](https://github.com/SASTxNST)
- **Live Website:** Coming Soon 🚧
- **Issues:** [Report bugs or request features](https://github.com/SASTxNST/Website_SAST/issues)
- **Discussions:** [Join conversations](https://github.com/SASTxNST/Website_SAST/discussions)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Contributors

Thanks to all our amazing contributors! View the [Contribution Leaderboard](https://github.com/SASTxNST/Website_SAST/graphs/contributors) to see who's building this project.

---

<div align="center">

**Let's build something extraordinary together! 🚀✨**

*Made with ❤️ by the SAST Team*

</div>

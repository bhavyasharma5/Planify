# Planify

Planify is a modern, sleek calendar and event planning application built with React. It allows users to manage their schedule by adding, editing, and deleting events with a beautiful and intuitive user interface.

## Screenshots

### Main Calendar View
![Planify Main View](https://github.com/bhavyasharma5/Planify/raw/main/public/images/calendar-view.png)

### Event Management
![Planify with Event](https://github.com/bhavyasharma5/Planify/raw/main/public/images/event-view.png)

### Modern Time Picker
![Planify Time Picker](https://github.com/bhavyasharma5/Planify/raw/main/public/images/time-picker.png)

## Features

- Interactive calendar with month navigation
- Add events with specific times using a modern, intuitive time picker
- Edit and delete existing events
- Responsive design that works on desktop and mobile devices
- Beautiful UI with smooth animations and transitions
- Dark theme with vibrant accent colors

## Technologies Used

- React.js for building the user interface
- CSS3 with modern features (Grid, Flexbox, CSS Variables)
- Vite for fast development and building
- Boxicons for icons
- Custom time picker component

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/bhavyasharma5/Planify.git
   cd Planify
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build files will be located in the `dist` directory.

## Project Structure

```
planify-app/
├── public/             # Public assets
├── src/                # Source files
│   ├── Components/     # React components
│   │   ├── Planify.jsx # Main calendar component
│   │   └── Planify.css # Styles for the calendar
│   ├── App.jsx         # App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
└── package.json        # Dependencies and scripts
```

## Implementation Details

- Custom calendar logic for date calculations and month navigation
- Modern time picker with scrollable hours and minutes selection
- Event management with CRUD operations
- Responsive design using CSS media queries

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from modern calendar applications
- Built as a personal project to showcase React skills

---

Developed with ❤️ by [Bhavya Sharma](https://github.com/bhavyasharma5)

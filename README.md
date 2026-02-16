# RemindMe - Reminder Application

Use this minimalistic and efficient reminder application to stay organized and productive. Built with React and Vite, RemindMe helps you manage your tasks, set due dates, and receive timely notifications.

## Features

-   **Dashboard Overview**: Get a quick glance at your upcoming and pending reminders.
-   **Create Reminders**: Easily add new reminders with a title, description, due date, and category.
-   **Categorization**: Organize your reminders into categories for better management.
-   **Browser Notifications**: Receive real-time browser notifications when a task is due.
-   **Management**: Edit or delete reminders as needed.
-   **Responsive Design**: precise and user-friendly interface.

## Tech Stack

-   **Frontend Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **ID Generation**: [Nanoid](https://github.com/ai/nanoid)
-   **Styling**: CSS

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd reminder-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## Usage

1.  Open the application in your browser (usually at `http://localhost:5173`).
2.  Click "New Reminder" to add a task.
3.  Fill in the details and save.
4.  Allow browser notifications when prompted to receive alerts.

## Project Structure

```
src/
├── components/       # UI Components (Dashboard, ReminderList, etc.)
├── hooks/            # Custom Hooks (useReminders, useNotification)
├── utils/            # Utility functions
├── App.jsx           # Main Application Component
└── main.jsx          # Entry point
```

## License

This project is licensed under the MIT License.

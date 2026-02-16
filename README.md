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
    git clone https://github.com/ananyaschandan/Reminder-App.git
    cd Reminder-App
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
1. **Open App:** Navigate to `http://localhost:5173/` in your browser.
2. **Permissions:** Allow browser notifications when prompted.
3. **Add Reminder:** Click **"New Reminder"** and fill out the details (set a due date 1 minute from now).
4. **Check List:** Verify the reminder appears in the **"My Reminders"** list and the **"Upcoming"** dashboard card.
5. **Wait for Notification:** Wait for the due time and verify a system notification appears.
6. **Filter:** Try searching for the reminder or filtering by priority.
7. **Edit/Delete:** Try updating or removing the reminder.

---
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

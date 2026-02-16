import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useReminders } from './hooks/useReminders';
import { useNotification } from './hooks/useNotification';
import Dashboard from './components/Dashboard';
import ReminderList from './components/ReminderList';
import ReminderForm from './components/ReminderForm';
import Modal from './components/Modal/Modal';
import Button from './components/UI/Button';
import './App.css';

function App() {
  const { reminders, addReminder, updateReminder, deleteReminder, deleteCategory } = useReminders();
  const { sendNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const existingCategories = React.useMemo(() => {
    return [...new Set(reminders.map(r => r.category).filter(Boolean))];
  }, [reminders]);

  // Check for due reminders every 30 seconds
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      reminders.forEach(reminder => {
        if (!reminder.completed && !reminder.notified && reminder.dueDate) {
          const dueDate = new Date(reminder.dueDate);
          // Notify if due within the last minute or just passed
          if (dueDate <= now) {
            sendNotification(`Reminder Due: ${reminder.title}`, {
              body: reminder.description || 'This task is due now!',
              icon: '/vite.svg' // optional
            });
            updateReminder(reminder.id, { notified: true });
          }
        }
      });
    };

    const intervalId = setInterval(checkReminders, 30000);
    // Initial check
    checkReminders();

    return () => clearInterval(intervalId);
  }, [reminders, sendNotification, updateReminder]);

  const handleAddReminder = (data) => {
    addReminder(data);
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            RemindMe
          </h1>
          <p className="app-subtitle">Stay organized and productive.</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="icon-sm mr-2" />
          New Reminder
        </Button>
      </header>

      <main className="app-main">
        <Dashboard reminders={reminders} />

        <section className="reminder-section">
          <div className="section-header">
            <h2 className="section-title">My Reminders</h2>
          </div>
          <ReminderList
            reminders={reminders}
            onUpdate={updateReminder}
            onDelete={deleteReminder}
            onDeleteCategory={deleteCategory}
            existingCategories={existingCategories}
          />
        </section>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Reminder"
      >
        <ReminderForm
          onAdd={handleAddReminder}
          onCancel={() => setIsModalOpen(false)}
          existingCategories={existingCategories}
        />
      </Modal>
    </div>
  );
}

export default App;


import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { loadReminders, saveReminders } from '../utils/storage';

export const useReminders = () => {
    const [reminders, setReminders] = useState(() => loadReminders());

    useEffect(() => {
        saveReminders(reminders);
    }, [reminders]);

    const addReminder = (reminder) => {
        const newReminder = {
            id: nanoid(),
            createdAt: Date.now(),
            completed: false,
            notified: false,
            ...reminder,
        };
        setReminders((prev) => [newReminder, ...prev]);
    };

    const updateReminder = (id, updates) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
        );
    };

    const deleteReminder = (id) => {
        setReminders((prev) => prev.filter((r) => r.id !== id));
    };

    const toggleComplete = (id) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
        );
    };

    const deleteCategory = (category) => {
        setReminders((prev) =>
            prev.map((r) => (r.category === category ? { ...r, category: '' } : r))
        );
    };

    return {
        reminders,
        addReminder,
        updateReminder,
        deleteReminder,
        toggleComplete,
        deleteCategory,
    };
};

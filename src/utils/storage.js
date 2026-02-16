const STORAGE_KEY = 'reminder-app-data';

export const loadReminders = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load reminders:', error);
    return [];
  }
};

export const saveReminders = (reminders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  } catch (error) {
    console.error('Failed to save reminders:', error);
  }
};

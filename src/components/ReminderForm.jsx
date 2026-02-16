import React, { useState, useEffect } from 'react';
import Input from './UI/Input';
import Select from './UI/Select';
import Button from './UI/Button';
import { useNotification } from '../hooks/useNotification';

const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
];

const RECURRENCE_OPTIONS = [
    { value: 'none', label: 'None' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
];

const ReminderForm = ({ onAdd, onCancel, initialData = null, existingCategories = [] }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        category: '',
        recurrence: 'none',
    });
    const { sendNotification } = useNotification();

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        onAdd(formData);

        // Simple verification notification
        if (formData.dueDate) {
            // In a real app, we'd schedule this. Here we just notify creation.
            // sendNotification('Reminder Set', { body: `Reminder set for ${formData.title}` });
        }

        if (!initialData) {
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                priority: 'medium',
                category: '',
                recurrence: 'none',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="reminder-form card">
            <h2 className="form-title">{initialData ? 'Edit Reminder' : 'New Reminder'}</h2>

            <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What needs to be done?"
                required
            />

            <div className="form-row">
                <Input
                    type="datetime-local"
                    label="Due Date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="flex-1"
                />

                <div className="input-group flex-1">
                    <label className="input-label">Category</label>
                    <input
                        list="category-suggestions"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g. Work"
                        className="input-control"
                    />
                    <datalist id="category-suggestions">
                        {existingCategories.map((cat) => (
                            <option key={cat} value={cat} />
                        ))}
                    </datalist>
                </div>
            </div>

            <div className="form-row">
                <Select
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    options={PRIORITY_OPTIONS}
                    className="flex-1"
                />

                <Select
                    label="Recurrence"
                    name="recurrence"
                    value={formData.recurrence}
                    onChange={handleChange}
                    options={RECURRENCE_OPTIONS}
                    className="flex-1"
                />
            </div>

            <div className="input-group">
                <label className="input-label">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input-control textarea-control"
                    placeholder="Add details..."
                />
            </div>

            <div className="form-actions">
                {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit">
                    {initialData ? 'Update Reminder' : 'Add Reminder'}
                </Button>
            </div>
        </form>
    );
};

export default ReminderForm;

import React, { useState, useMemo } from 'react';
import ReminderCard from './ReminderCard';
import Input from './UI/Input';
import Button from './UI/Button';
import Select from './UI/Select';
import { Search, Filter, X, Trash2 } from 'lucide-react';
import ReminderForm from './ReminderForm';

const ReminderList = ({ reminders, onUpdate, onDelete, onDeleteCategory, existingCategories = [] }) => {
    const [search, setSearch] = useState('');
    const [filterPriority, setFilterPriority] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [editingId, setEditingId] = useState(null);
    const [isManagingCategories, setIsManagingCategories] = useState(false);

    const categories = useMemo(() => {
        const cats = new Set(reminders.map(r => r.category).filter(Boolean));
        return ['all', ...Array.from(cats)];
    }, [reminders]);

    const filteredReminders = useMemo(() => {
        return reminders.filter(reminder => {
            const matchesSearch = reminder.title.toLowerCase().includes(search.toLowerCase()) ||
                (reminder.description && reminder.description.toLowerCase().includes(search.toLowerCase()));
            const matchesPriority = filterPriority === 'all' || reminder.priority === filterPriority;
            const matchesCategory = filterCategory === 'all' || reminder.category === filterCategory;

            // Active filter: if a specific category is selected, filtering out completed items
            const isActiveFilter = filterCategory !== 'all' ? !reminder.completed : true;

            return matchesSearch && matchesPriority && matchesCategory && isActiveFilter;
        }).sort((a, b) => {
            // Sort by completion (incomplete first), then by changes
            if (a.completed === b.completed) {
                // Then by due date (if exists)
                if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate);
                if (a.dueDate) return -1;
                if (b.dueDate) return 1;
                return 0;
            }
            return a.completed ? 1 : -1;
        });
    }, [reminders, search, filterPriority, filterCategory]);

    const handleDeleteCategory = (cat) => {
        if (window.confirm(`Are you sure you want to delete the category "${cat}"? This will remove it from all reminders.`)) {
            onDeleteCategory(cat);
            if (filterCategory === cat) setFilterCategory('all');
        }
    };

    const handleUpdate = (id, updates) => {
        if (updates.isEditing) {
            setEditingId(id);
        } else {
            onUpdate(id, updates);
        }
    };

    const handleEditSubmit = (data) => {
        onUpdate(editingId, data);
        setEditingId(null);
    };

    return (
        <div className="reminder-list-container">
            <div className="controls-bar card">
                <div className="search-wrapper">
                    <Search className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search reminders..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filters-wrapper">
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Categories</option>
                        {existingCategories.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    <Button variant="secondary" onClick={() => setIsManagingCategories(true)} className="whitespace-nowrap">
                        Manage
                    </Button>
                </div>
            </div>

            <div className="reminders-grid">
                {filteredReminders.length === 0 ? (
                    <div className="empty-state">
                        <p>No reminders found matching your filters.</p>
                    </div>
                ) : (
                    filteredReminders.map(reminder => (
                        editingId === reminder.id ? (
                            <ReminderForm
                                key={reminder.id}
                                initialData={reminder}
                                onAdd={handleEditSubmit}
                                onCancel={() => setEditingId(null)}
                                existingCategories={existingCategories}
                            />
                        ) : (
                            <ReminderCard
                                key={reminder.id}
                                reminder={reminder}
                                onUpdate={handleUpdate}
                                onDelete={onDelete}
                            />
                        )
                    ))
                )}
            </div>

            {isManagingCategories && (
                <div className="modal-overlay" onClick={() => setIsManagingCategories(false)}>
                    <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Manage Categories</h2>
                            <button onClick={() => setIsManagingCategories(false)}><X className="icon" /></button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {existingCategories.length === 0 ? (
                                <p className="text-text-muted">No categories created yet.</p>
                            ) : (
                                existingCategories.map(cat => (
                                    <div key={cat} className="flex justify-between items-center p-3 bg-bg-input rounded-md">
                                        <span>{cat}</span>
                                        <Button variant="ghost" className="text-danger hover:bg-red-400/10" onClick={() => handleDeleteCategory(cat)}>
                                            <Trash2 className="icon-sm" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReminderList;

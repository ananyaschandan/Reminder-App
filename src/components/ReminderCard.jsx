import React from 'react';
import { Calendar, Clock, Tag, Repeat, Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import Button from './UI/Button';

const ReminderCard = ({ reminder, onUpdate, onDelete }) => {
    const { id, title, description, dueDate, priority, category, recurrence, completed } = reminder;

    const priorityColors = {
        low: 'bg-slate-700 text-slate-300',
        medium: 'bg-blue-900/50 text-blue-300 border-blue-800',
        high: 'bg-red-900/50 text-red-300 border-red-800',
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
        }).format(date);
    };

    return (
        <div className={`reminder-card card group ${completed ? 'completed' : ''}`}>
            <div className="reminder-header">
                <button
                    onClick={() => onUpdate(id, { completed: !completed })}
                    className="check-btn"
                >
                    {completed ? <CheckCircle className="icon icon-success" /> : <Circle className="icon" />}
                </button>

                <div className="reminder-content">
                    <h3 className="reminder-title">{title}</h3>
                    {description && <p className="reminder-desc">{description}</p>}
                </div>

                <div className="reminder-actions">
                    <Button variant="ghost" className="icon-btn" onClick={() => onUpdate(id, { isEditing: true })}>
                        <Edit2 className="icon-sm" />
                    </Button>
                    <Button variant="ghost" className="icon-btn danger" onClick={() => onDelete(id)}>
                        <Trash2 className="icon-sm" />
                    </Button>
                </div>
            </div>

            <div className="reminder-meta">
                {dueDate && (
                    <div className={`meta-tag ${new Date(dueDate) < new Date() && !completed ? 'overdue' : ''}`}>
                        <Calendar className="icon-xs" />
                        <span>{formatDate(dueDate)}</span>
                    </div>
                )}

                {category && (
                    <div className="meta-tag">
                        <Tag className="icon-xs" />
                        <span>{category}</span>
                    </div>
                )}

                {recurrence !== 'none' && (
                    <div className="meta-tag">
                        <Repeat className="icon-xs" />
                        <span>{recurrence}</span>
                    </div>
                )}

                <div className={`meta-tag priority-${priority}`}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </div>
            </div>
        </div>
    );
};

export default ReminderCard;

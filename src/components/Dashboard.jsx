import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

const StatCard = ({ title, count, icon: Icon, colorClass, bgClass }) => (
    <div className="stat-card card">
        <div className={`stat-icon-wrapper ${bgClass} ${colorClass}`}>
            <Icon className="icon" />
        </div>
        <div>
            <p className="stat-label">{title}</p>
            <p className="stat-value">{count}</p>
        </div>
    </div>
);

const Dashboard = ({ reminders }) => {
    const stats = React.useMemo(() => {
        const total = reminders.length;
        const completed = reminders.filter(r => r.completed).length;
        const pending = total - completed;

        const now = new Date();
        const overdue = reminders.filter(r => !r.completed && r.dueDate && new Date(r.dueDate) < now).length;
        const upcoming = reminders.filter(r => !r.completed && r.dueDate && new Date(r.dueDate) >= now).length;

        return { total, completed, pending, overdue, upcoming };
    }, [reminders]);

    return (
        <div className="dashboard-grid">
            <StatCard
                title="Upcoming"
                count={stats.upcoming}
                icon={Clock}
                colorClass="text-blue"
                bgClass="bg-blue-light"
            />
            <StatCard
                title="Overdue"
                count={stats.overdue}
                icon={AlertCircle}
                colorClass="text-red"
                bgClass="bg-red-light"
            />
            <StatCard
                title="Completed"
                count={stats.completed}
                icon={CheckCircle}
                colorClass="text-green"
                bgClass="bg-green-light"
            />
        </div>
    );
};

export default Dashboard;

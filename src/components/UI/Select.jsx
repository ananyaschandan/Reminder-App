import React from 'react';

const Select = React.forwardRef(({ label, error, options, className = '', ...props }, ref) => {
    return (
        <div className={`input-group ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <select
                ref={ref}
                className={`select-control ${error ? 'input-error' : ''}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;

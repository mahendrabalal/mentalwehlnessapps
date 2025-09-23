import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
export function Card({ children, className, padding = 'md' }) {
    return (_jsx("div", { className: clsx('bg-white rounded-lg shadow-sm border border-gray-200', {
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
        }, className), children: children }));
}

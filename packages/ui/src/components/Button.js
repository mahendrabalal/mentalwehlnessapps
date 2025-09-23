import { jsx as _jsx } from "react/jsx-runtime";
import { clsx } from 'clsx';
export function Button({ variant = 'primary', size = 'md', className, children, ...props }) {
    return (_jsx("button", { className: clsx('font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2', {
            'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500': variant === 'primary',
            'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500': variant === 'secondary',
            'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500': variant === 'crisis',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
        }, className), ...props, children: children }));
}

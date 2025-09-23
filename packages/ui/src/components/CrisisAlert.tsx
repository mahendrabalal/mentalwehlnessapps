import React from 'react'
import { clsx } from 'clsx'

interface CrisisAlertProps {
  message: string
  actionButton?: React.ReactNode
  className?: string
}

export function CrisisAlert({ message, actionButton, className }: CrisisAlertProps) {
  return (
    <div
      className={clsx(
        'bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg',
        'flex items-center justify-between',
        className
      )}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
      {actionButton && <div className="ml-4">{actionButton}</div>}
    </div>
  )
}
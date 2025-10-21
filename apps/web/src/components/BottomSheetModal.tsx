import { useState, useEffect, useRef } from 'react'

export interface BottomSheetModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  height?: 'auto' | 'half' | 'full'
  isDismissible?: boolean
  className?: string
}

/**
 * Bottom Sheet Modal - Mobile-optimized disclosure pattern
 * Used by Headspace, Calm, Apple Health
 *
 * Features:
 * - Drag to dismiss
 * - Tap outside to dismiss
 * - Smooth transitions
 * - Mobile-first design
 * - Accessibility support (WCAG 2.2)
 */
export function BottomSheetModal({
  isOpen,
  onClose,
  title,
  children,
  height = 'half',
  isDismissible = true,
  className = '',
}: BottomSheetModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const sheetRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-drag-handle]')) {
      startYRef.current = e.clientY
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startYRef.current === 0) return

    const diff = e.clientY - startYRef.current
    if (diff > 0) {
      setDragOffset(diff)
    }
  }

  const handleMouseUp = () => {
    if (dragOffset > 100) {
      onClose()
    }
    setDragOffset(0)
    startYRef.current = 0
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (isDismissible && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleEscape = (e: KeyboardEvent) => {
    if (isDismissible && e.key === 'Escape' && isOpen) {
      onClose()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, isDismissible])

  const heightClass = {
    auto: 'max-h-[50vh]',
    half: 'max-h-[50vh]',
    full: 'max-h-[90vh]',
  }[height]

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
        aria-hidden={!isOpen}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-all duration-300 ${heightClass} ${className} ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          transform: `translateY(${isOpen ? dragOffset : '100%'})`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!isOpen}
      >
        {/* Drag Handle */}
        <div
          data-drag-handle
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to close"
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-therapy-500 rounded-lg p-1"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className={`overflow-y-auto ${heightClass} pb-6`}>
          <div className="px-6">{children}</div>
        </div>
      </div>
    </>
  )
}

/**
 * Hook for managing bottom sheet state
 */
export function useBottomSheet(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return { isOpen, open, close, toggle }
}

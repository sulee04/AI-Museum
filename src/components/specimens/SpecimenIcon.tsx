import type { SpecimenIconType } from '@/content/specimens.data'
import { cn } from '@/lib/utils'

interface SpecimenIconProps {
  type: SpecimenIconType
  className?: string
  color?: string
}

export function SpecimenIcon({ type, className, color = 'currentColor' }: SpecimenIconProps) {
  const props = {
    className: cn('h-4 w-4 shrink-0', className),
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (type) {
    case 'spark':
      return (
        <svg {...props}>
          <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
        </svg>
      )
    case 'skull':
      return (
        <svg {...props}>
          <circle cx="12" cy="10" r="6" />
          <path d="M8 16v2M12 16v2M16 16v2M9 10h.01M15 10h.01" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...props}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
        </svg>
      )
    case 'scale':
      return (
        <svg {...props}>
          <path d="M12 3v18M5 7h14M7 7l-2 6h4L7 7zM17 7l-2 6h4L17 7z" />
        </svg>
      )
    case 'code':
      return (
        <svg {...props}>
          <path d="M8 8L4 12l4 4M16 8l4 4-4 4M14 4l-4 16" />
        </svg>
      )
    case 'meme':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="9" cy="10" r="1" fill={color} />
          <circle cx="15" cy="10" r="1" fill={color} />
          <path d="M8 15c1.5 2 6.5 2 8 0" />
        </svg>
      )
    case 'eye':
      return (
        <svg {...props}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      )
    case 'brain':
      return (
        <svg {...props}>
          <path d="M8 5c-2 1-3 3-3 5a4 4 0 0 0 4 4M16 5c2 1 3 3 3 5a4 4 0 0 1-4 4M8 14v3M16 14v3M12 5v14" />
        </svg>
      )
    case 'bot':
      return (
        <svg {...props}>
          <rect x="5" y="8" width="14" height="11" rx="2" />
          <circle cx="9" cy="13" r="1" fill={color} />
          <circle cx="15" cy="13" r="1" fill={color} />
          <path d="M12 4v4M8 4h8" />
        </svg>
      )
    case 'ghost':
      return (
        <svg {...props}>
          <path d="M12 3c-4 0-7 3-7 7v8l2-2 2 2 2-2 2 2 2-2 2 2V10c0-4-3-7-7-7z" />
          <circle cx="9" cy="11" r="1" fill={color} />
          <circle cx="15" cy="11" r="1" fill={color} />
        </svg>
      )
    case 'chain':
      return (
        <svg {...props}>
          <path d="M8 12a4 4 0 0 1 4-4h1a4 4 0 0 1 0 8h-1a4 4 0 0 1-4-4zM16 12a4 4 0 0 1-4 4h-1a4 4 0 0 1 0-8h1a4 4 0 0 1 4 4z" />
        </svg>
      )
    case 'fire':
      return (
        <svg {...props}>
          <path d="M12 3c0 4-4 5-4 9a4 4 0 0 0 8 0c0-4-4-5-4-9z" />
        </svg>
      )
    case 'droplet':
      return (
        <svg {...props}>
          <path d="M12 3c-4 5-7 8-7 12a7 7 0 0 0 14 0c0-4-3-7-7-12z" />
        </svg>
      )
    case 'star':
      return (
        <svg {...props}>
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
        </svg>
      )
    case 'warning':
      return (
        <svg {...props}>
          <path d="M12 3L2 20h20L12 3z" />
          <path d="M12 10v4M12 17h.01" />
        </svg>
      )
    case 'smile':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...props}>
          <rect x="6" y="10" width="12" height="10" rx="1" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      )
    case 'wave':
      return (
        <svg {...props}>
          <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}

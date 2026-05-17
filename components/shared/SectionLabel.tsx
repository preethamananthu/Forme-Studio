import { cn } from '@/lib/utils'

type Props = { children: React.ReactNode; className?: string }

export function SectionLabel({ children, className }: Props) {
  return (
    <p className={cn('label-mono mb-3', className)}>
      {children}
    </p>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { useLeadModal } from '@/components/global/lead-capture-provider'
import type { LeadFormType } from '@/lib/lead-forms'

export function BlogCtaButton({
  label,
  source,
  type = 'seller-appraisal',
  variant = 'gold',
  className = '',
}: {
  label: string
  source: string
  type?: LeadFormType
  variant?: 'gold' | 'green' | 'outline'
  className?: string
}) {
  const { openLeadModal } = useLeadModal()

  const variantClasses = {
    gold: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    green: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline:
      'border-2 border-secondary text-secondary hover:bg-secondary/10 bg-transparent',
  }

  return (
    <Button
      className={`font-bold ${variantClasses[variant]} ${className}`}
      onClick={() =>
        openLeadModal({
          type,
          source,
        })
      }
    >
      {label}
    </Button>
  )
}

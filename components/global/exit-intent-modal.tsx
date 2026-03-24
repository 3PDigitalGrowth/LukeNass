'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Download } from 'lucide-react'
import { submitLeadForm } from '@/lib/submit-lead-form'

export function ExitIntentModal() {
  const [showModal, setShowModal] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const sessionStorageKey = 'lukenass-exit-intent-shown'

  useEffect(() => {
    const alreadyShown = window.sessionStorage.getItem(sessionStorageKey) === 'true'
    if (alreadyShown) {
      setHasShown(true)
    }
  }, [])

  useEffect(() => {
    if (hasShown) {
      window.sessionStorage.setItem(sessionStorageKey, 'true')
      return
    }

    const alreadyShown = window.sessionStorage.getItem(sessionStorageKey) === 'true'
    if (alreadyShown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if ((e as any).clientY <= 0) {
        setShowModal(true)
        setHasShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  useEffect(() => {
    if (!showModal) {
      setErrorMessage(null)
      setIsSubmitting(false)
    }
  }, [showModal])

  const triggerDownload = () => {
    const link = document.createElement('a')
    link.href = '/perth-se-corridor-2026-outlook.pdf'
    link.download = 'perth-se-corridor-2026-outlook.pdf'
    link.click()
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await submitLeadForm(
        {
          type: 'market-report-download',
          source: 'Exit intent modal',
          title: 'Perth Southeast Corridor Outlook Download',
          metadata: {
            'Follow-up action': 'Please email this user with the Perth Southeast Corridor outlook and offer RP Data guidance until logins are available.',
          },
        },
        {
          email,
        }
      )

      triggerDownload()
      setShowModal(false)
      setEmail('')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to send your request right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-3 tracking-tighter">
                Wait!
              </h2>
              <p className="text-muted-foreground mb-6">
                Get the exclusive{' '}
                <span className="font-semibold text-foreground">Perth SE Corridor 2026 Outlook</span> report before you go.
              </p>

              <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-secondary/30">
                <p className="text-sm font-medium text-foreground mb-2">In this report:</p>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>✓ Market trends & predictions</li>
                  <li>✓ Suburb-by-suburb analysis</li>
                  <li>✓ Investment opportunities</li>
                  <li>✓ Expert pricing strategies</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  required
                />
                {errorMessage && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive text-left">
                    {errorMessage}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-11 rounded-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Download Free Report'}
                </Button>
              </form>

              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                No thanks, I'll continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

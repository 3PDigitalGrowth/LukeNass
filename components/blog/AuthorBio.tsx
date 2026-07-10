export function AuthorBio({ author }: { author: string }) {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-serif text-xl font-bold text-secondary">
          LN
        </div>
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">
            Boutique real estate guidance for Roleystone, Kelmscott, and Perth's SE Corridor.
          </p>
        </div>
      </div>
    </section>
  )
}

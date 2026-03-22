'use client'

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ExternalLink, FileText, Link2, LogOut, RefreshCcw, Trash2, Upload, Video } from "lucide-react"

import type { AdminAsset } from "@/lib/admin-assets"
import type { AdminLink } from "@/lib/admin-links"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function getAssetKind(mimeType: string) {
  if (mimeType.startsWith("video/")) return "video"
  if (mimeType.startsWith("image/")) return "image"
  if (mimeType === "application/pdf") return "pdf"
  return "document"
}

export function AdminDashboard() {
  const router = useRouter()
  const [assets, setAssets] = useState<AdminAsset[]>([])
  const [links, setLinks] = useState<AdminLink[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [areLinksLoading, setAreLinksLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isCreatingLink, setIsCreatingLink] = useState(false)
  const [deletingLinkId, setDeletingLinkId] = useState("")
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")
  const [linkStatus, setLinkStatus] = useState("")
  const [linkError, setLinkError] = useState("")
  const [linkForm, setLinkForm] = useState({
    title: "",
    url: "",
    description: "",
  })

  const totalSelectedSize = useMemo(
    () => selectedFiles.reduce((sum, file) => sum + file.size, 0),
    [selectedFiles]
  )

  const loadAssets = async () => {
    setIsLoading(true)
    setError("")

    const response = await fetch("/api/admin/assets", { cache: "no-store" })

    if (!response.ok) {
      setError("Unable to load uploaded files.")
      setIsLoading(false)
      return
    }

    const data = (await response.json()) as { assets: AdminAsset[] }
    setAssets(data.assets)
    setIsLoading(false)
  }

  const loadLinks = async () => {
    setAreLinksLoading(true)
    setLinkError("")

    const response = await fetch("/api/admin/links", { cache: "no-store" })

    if (!response.ok) {
      setLinkError("Unable to load important links.")
      setAreLinksLoading(false)
      return
    }

    const data = (await response.json()) as { links: AdminLink[] }
    setLinks(data.links)
    setAreLinksLoading(false)
  }

  useEffect(() => {
    void loadAssets()
    void loadLinks()
  }, [])

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFiles.length) {
      setError("Choose at least one file to upload.")
      return
    }

    setIsUploading(true)
    setError("")
    setStatus("")

    try {
      for (const file of selectedFiles) {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/admin/assets", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const data = (await response.json()) as { error?: string }
          throw new Error(data.error || `Failed to upload ${file.name}`)
        }
      }

      setSelectedFiles([])
      setStatus("Files uploaded successfully.")
      await loadAssets()
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Upload failed."
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.refresh()
  }

  const handleCreateLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!linkForm.title.trim() || !linkForm.url.trim()) {
      setLinkError("Add both a title and a URL.")
      return
    }

    setIsCreatingLink(true)
    setLinkError("")
    setLinkStatus("")

    try {
      const response = await fetch("/api/admin/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linkForm),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error || "Unable to create link.")
      }

      setLinkForm({
        title: "",
        url: "",
        description: "",
      })
      setLinkStatus("Important link saved successfully.")
      await loadLinks()
    } catch (createError) {
      setLinkError(
        createError instanceof Error
          ? createError.message
          : "Unable to create link."
      )
    } finally {
      setIsCreatingLink(false)
    }
  }

  const handleDeleteLink = async (id: string) => {
    setDeletingLinkId(id)
    setLinkError("")
    setLinkStatus("")

    try {
      const response = await fetch(`/api/admin/links/${id}`, {
        method: "DELETE",
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete link.")
      }

      setLinkStatus("Important link removed.")
      await loadLinks()
    } catch (deleteError) {
      setLinkError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete link."
      )
    } finally {
      setDeletingLinkId("")
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground font-medium mb-3">
            Admin
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl tracking-tight text-foreground mb-3">
            Marketing Materials Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Upload videos, PDFs, brochures, or other sales materials for the Luke Nass team. Uploaded files appear below and can be previewed directly from this page.
          </p>
        </div>

        <Button variant="outline" onClick={handleLogout} className="bg-transparent">
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6 lg:p-8 shadow-lg">
        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload Files
            </label>
            <Input
              type="file"
              multiple
              onChange={(event) =>
                setSelectedFiles(Array.from(event.target.files || []))
              }
            />
            <p className="text-xs text-muted-foreground mt-2">
              Upload videos, PDFs, images, or other documents.
            </p>
          </div>

          {selectedFiles.length ? (
            <div className="rounded-xl border border-border/50 bg-background/60 p-4">
              <p className="text-sm font-medium text-foreground mb-2">
                Ready to upload
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {selectedFiles.map((file) => (
                  <li key={`${file.name}-${file.size}`}>
                    {file.name} ({formatFileSize(file.size)})
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-3">
                Total size: {formatFileSize(totalSelectedSize)}
              </p>
            </div>
          ) : null}

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {status ? <p className="text-sm text-primary">{status}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={isUploading}>
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Materials"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-transparent"
              onClick={() => void loadAssets()}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh Library
            </Button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card p-6 lg:p-8 shadow-lg">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground font-medium mb-2">
            Important Links
          </p>
          <h2 className="font-serif text-2xl tracking-tight text-foreground mb-2">
            Manage Important Links
          </h2>
          <p className="text-muted-foreground">
            Add key URLs that the team wants handy on the admin page, such as campaign folders, listing portals, docs, or external resources.
          </p>
        </div>

        <form onSubmit={handleCreateLink} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Link Title
              </label>
              <Input
                value={linkForm.title}
                onChange={(event) =>
                  setLinkForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Vendor campaign folder"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                URL
              </label>
              <Input
                value={linkForm.url}
                onChange={(event) =>
                  setLinkForm((current) => ({
                    ...current,
                    url: event.target.value,
                  }))
                }
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <Textarea
              value={linkForm.description}
              onChange={(event) =>
                setLinkForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Optional note to explain when or why this link matters."
            />
          </div>

          {linkError ? <p className="text-sm text-destructive">{linkError}</p> : null}
          {linkStatus ? <p className="text-sm text-primary">{linkStatus}</p> : null}

          <Button type="submit" disabled={isCreatingLink}>
            <Link2 className="w-4 h-4 mr-2" />
            {isCreatingLink ? "Saving..." : "Save Important Link"}
          </Button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl tracking-tight text-foreground">
            Uploaded Materials
          </h2>
          <p className="text-sm text-muted-foreground">
            {assets.length} file{assets.length === 1 ? "" : "s"}
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-border/50 bg-card p-8 text-muted-foreground">
            Loading uploads...
          </div>
        ) : null}

        {!isLoading && assets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-foreground font-medium mb-2">No materials uploaded yet.</p>
            <p className="text-muted-foreground">
              Upload your first video, brochure, or document to make it available from the admin page.
            </p>
          </div>
        ) : null}

        {!isLoading && assets.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {assets.map((asset) => {
              const assetKind = getAssetKind(asset.mimeType)
              const assetUrl = `/api/admin/assets/${asset.id}`

              return (
                <div
                  key={asset.id}
                  className="rounded-2xl border border-border/50 bg-card p-5 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground break-words">
                        {asset.originalName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(asset.uploadedAt).toLocaleString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
                      {assetKind.toUpperCase()}
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-border/50 bg-background mb-4">
                    {assetKind === "video" ? (
                      <video controls className="h-64 w-full bg-black">
                        <source src={assetUrl} type={asset.mimeType} />
                      </video>
                    ) : null}

                    {assetKind === "image" ? (
                      <img
                        src={assetUrl}
                        alt={asset.originalName}
                        className="h-64 w-full object-cover"
                      />
                    ) : null}

                    {assetKind === "pdf" ? (
                      <iframe
                        src={assetUrl}
                        title={asset.originalName}
                        className="h-64 w-full"
                      />
                    ) : null}

                    {assetKind === "document" ? (
                      <div className="h-64 flex flex-col items-center justify-center gap-3 text-center p-6">
                        <FileText className="w-10 h-10 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          Document preview is not available for this file type.
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground mb-4">
                    <span>{formatFileSize(asset.size)}</span>
                    <span className="truncate">{asset.mimeType}</span>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="flex-1">
                      <a href={assetUrl} target="_blank" rel="noopener noreferrer">
                        {assetKind === "video" ? (
                          <Video className="w-4 h-4 mr-2" />
                        ) : (
                          <FileText className="w-4 h-4 mr-2" />
                        )}
                        View File
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <a href={assetUrl} download={asset.originalName}>
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl tracking-tight text-foreground">
            Important Links
          </h2>
          <p className="text-sm text-muted-foreground">
            {links.length} link{links.length === 1 ? "" : "s"}
          </p>
        </div>

        {areLinksLoading ? (
          <div className="rounded-2xl border border-border/50 bg-card p-8 text-muted-foreground">
            Loading important links...
          </div>
        ) : null}

        {!areLinksLoading && links.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-foreground font-medium mb-2">No important links added yet.</p>
            <p className="text-muted-foreground">
              Save your first link above to keep key resources easy to access from the admin page.
            </p>
          </div>
        ) : null}

        {!areLinksLoading && links.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="rounded-2xl border border-border/50 bg-card p-5 shadow-lg"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground break-words">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(link.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-medium text-secondary">
                    LINK
                  </span>
                </div>

                <div className="rounded-xl border border-border/50 bg-background/60 p-4 mb-4">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary break-all hover:underline"
                  >
                    {link.url}
                  </a>
                  {link.description ? (
                    <p className="text-sm text-muted-foreground mt-3">
                      {link.description}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="flex-1">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Link
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    disabled={deletingLinkId === link.id}
                    onClick={() => void handleDeleteLink(link.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {deletingLinkId === link.id ? "Removing..." : "Remove"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

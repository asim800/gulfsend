"use client"

import Image from "next/image"
import { useState, ChangeEvent } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Trash2, Edit2, Eye, EyeOff, Copy, ExternalLink, Check } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface ApiKey {
  id: string
  name: string
  key: string
  usage: number
  createdAt: string
  lastUsed: string
}

const navLinks = [
  { label: "Overview", href: "/dashboard", icon: null },
  { label: "API Playground", href: "#", icon: null },
  { label: "Invoices", href: "#", icon: null },
  { label: "Documentation", href: "#", icon: ExternalLink },
]

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: "1", name: "default", key: "tvly-1234567890abcdefghijklmnopqrstuvwxyz", usage: 24, createdAt: new Date().toISOString(), lastUsed: "Today" },
    { id: "2", name: "tmp1", key: "tvly-0987654321abcdefghijklmnopqrstuvwxyz", usage: 0, createdAt: new Date().toISOString(), lastUsed: "Never" },
    { id: "3", name: "my-cool-api-key", key: "tvly-abcdefghijklmnopqrstuvwxyz123456", usage: 0, createdAt: new Date().toISOString(), lastUsed: "Never" },
    { id: "4", name: "hello", key: "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", usage: 0, createdAt: new Date().toISOString(), lastUsed: "Never" },
    { id: "5", name: "cursor", key: "tvly-1234567890zyxwvutsrqponmlkjihgfedcba", usage: 0, createdAt: new Date().toISOString(), lastUsed: "Never" },
  ])
  const [newKeyName, setNewKeyName] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [viewingKeyId, setViewingKeyId] = useState<string | null>(null)
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null)
  const [editingKey, setEditingKey] = useState<{ id: string; name: string } | null>(null)

  const handleCreateKey = async () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `tvly-${Math.random().toString(36).substring(2, 38)}`,
      usage: 0,
      createdAt: new Date().toISOString(),
      lastUsed: "Never"
    }
    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setIsCreating(false)
  }

  const handleDeleteKey = async (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewKeyName(e.target.value)
  }

  const handleViewKey = (id: string) => {
    setViewingKeyId(viewingKeyId === id ? null : id)
  }

  const handleCopyKey = async (key: string, id: string) => {
    try {
      await navigator.clipboard.writeText(key)
      setCopiedKeyId(id)
      toast.success("API key copied to clipboard")
      setTimeout(() => setCopiedKeyId(null), 2000)
    } catch (err) {
      toast.error("Failed to copy API key")
    }
  }

  const handleEditKey = (id: string, currentName: string) => {
    setEditingKey({ id, name: currentName })
  }

  const handleSaveEdit = () => {
    if (!editingKey) return

    setApiKeys(apiKeys.map(key => 
      key.id === editingKey.id 
        ? { ...key, name: editingKey.name }
        : key
    ))
    setEditingKey(null)
    toast.success("API key name updated")
  }

  const handleEditNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editingKey) return
    setEditingKey({ ...editingKey, name: e.target.value })
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between py-6 px-4 min-h-screen shadow-sm">
        <div>
          <div className="flex items-center mb-10">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image src="/gulfsend-logo.png" alt="GulfSend Logo" width={160} height={40} priority />
            </Link>
          </div>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="group">
                <Button variant="ghost" className="w-full justify-start px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-[#e0f7fa]">
                  {link.icon && <link.icon className="mr-2 h-4 w-4" />} {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        {/* User info placeholder */}
        <div className="flex items-center gap-2 mt-10">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <span className="text-sm text-gray-600">Arif Ahmed</span>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between px-10 py-6 bg-transparent">
          <div className="text-sm text-gray-400 font-medium flex items-center gap-2">
            <span>Pages</span>
            <span className="mx-1">/</span>
            <span className="text-gray-900 font-semibold">Overview</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            <div className="flex gap-2">
              <a 
                href="https://github.com/gulfsend" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="hover:text-[#0097a7] transition-colors"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48C19.13 20.58 22 16.76 22 12.26 22 6.58 17.52 2 12 2Z"/></svg>
              </a>
              <a 
                href="https://twitter.com/gulfsend" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter" 
                className="hover:text-[#0097a7] transition-colors"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 2-4.29 4.44 0 .35.04.7.11 1.03C7.69 9.3 4.07 7.6 1.64 5.13c-.38.67-.6 1.45-.6 2.28 0 1.57.77 2.96 1.95 3.77-.72-.02-1.4-.23-1.99-.56v.06c0 2.2 1.5 4.03 3.5 4.45-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.8 2.12 3.12 3.99 3.16A8.6 8.6 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.12A12.13 12.13 0 0 0 7.29 21.5c7.55 0 11.68-6.5 11.68-12.13 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 22.46 6Z"/></svg>
              </a>
              <a 
                href="mailto:contact@gulfsend.com" 
                aria-label="Email" 
                className="hover:text-[#0097a7] transition-colors"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 2v.01L12 13 4 6.01V6h16ZM4 20v-9.99l7.29 6.7c.38.35.95.35 1.33 0L20 10.01V20H4Z"/></svg>
              </a>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex flex-col gap-8 px-10 pb-10">
          {/* Plan Card */}
          <section>
            <div className="rounded-2xl shadow-md p-8 mb-8 bg-gradient-to-r from-[#a18cd1] via-[#fbc2eb] to-[#fad0c4] relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span className="inline-block bg-white/30 text-xs font-semibold text-white px-3 py-1 rounded-full mb-2">CURRENT PLAN</span>
                  <h2 className="text-3xl font-bold text-white mb-2">Researcher</h2>
                  <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                    <span>API Limit</span>
                    <span className="relative group">
                      <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">i</text></svg>
                      <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-32 bg-white text-gray-700 text-xs rounded shadow-lg px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none z-10">API requests per month</span>
                    </span>
                  </div>
                  <div className="w-full max-w-xs">
                    <div className="h-2 bg-white/40 rounded-full overflow-hidden">
                      <div className="h-2 bg-white rounded-full" style={{ width: '2.4%' }} />
                    </div>
                    <div className="text-xs text-white/90 mt-1">24 / 1,000 Requests</div>
                  </div>
                </div>
                <Button className="bg-white/80 text-[#7b4397] font-semibold hover:bg-white/90 px-6 py-2 rounded-xl shadow" variant="outline">
                  Manage Plan
                </Button>
              </div>
            </div>
          </section>

          {/* API Keys Card */}
          <section>
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">API Keys</CardTitle>
                  <Dialog open={isCreating} onOpenChange={setIsCreating}>
                    <DialogTrigger asChild>
                      <Button size="icon" className="ml-2 bg-[#0097a7] text-white hover:bg-[#007d8a] rounded-full">
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New API Key</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Key Name</Label>
                          <Input
                            id="name"
                            value={newKeyName}
                            onChange={handleNameChange}
                            placeholder="Enter a name for your API key"
                          />
                        </div>
                        <Button onClick={handleCreateKey} className="bg-[#0097a7] hover:bg-[#007d8a]">
                          Create Key
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-4">
                  The key is used to authenticate your requests to the Research API. To learn more, see the <a href="#" className="text-[#0097a7] underline">documentation</a> page.
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead className="text-right">Options</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell>{key.usage}</TableCell>
                        <TableCell>
                          <code className="bg-gray-100 px-2 py-1 rounded text-gray-700 select-all">
                            {viewingKeyId === key.id ? key.key : "tvly-************************"}
                          </code>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              aria-label={viewingKeyId === key.id ? "Hide key" : "View key"}
                              onClick={() => handleViewKey(key.id)}
                            >
                              {viewingKeyId === key.id ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              aria-label="Copy key"
                              onClick={() => handleCopyKey(key.key, key.id)}
                              className="relative group"
                            >
                              {copiedKeyId === key.id ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Copy to clipboard
                              </span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              aria-label="Edit key name"
                              onClick={() => handleEditKey(key.id, key.name)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              aria-label="Delete" 
                              onClick={() => handleDeleteKey(key.id)} 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {apiKeys.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500">
                          No API keys found. Create your first key to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>

      {/* Edit Key Dialog */}
      <Dialog open={!!editingKey} onOpenChange={() => setEditingKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit API Key Name</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Key Name</Label>
              <Input
                id="edit-name"
                value={editingKey?.name || ""}
                onChange={handleEditNameChange}
                placeholder="Enter a new name for your API key"
              />
            </div>
            <Button onClick={handleSaveEdit} className="bg-[#0097a7] hover:bg-[#007d8a]">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
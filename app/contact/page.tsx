"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Check } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6 mb-8">
          <div className="flex flex-col items-center text-center mb-6">
            <Mail className="h-12 w-12 mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions, suggestions, or found a bug? We&apos;d love to hear from you!
            </p>
          </div>

          {isSubmitted ? (
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <Check className="h-12 w-12 mb-4 text-green-500" />
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-4">
                Thank you for contacting us. We&apos;ll get back to you as soon as possible.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">For direct inquiries, you can email us at:</p>
            <a href="mailto:tejas.benibagde@gmail.com" className="text-primary hover:underline">
              tejas.benibagde@gmail.com
            </a>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-2">GitHub Issues</h3>
            <p className="text-muted-foreground mb-4">For bug reports and feature requests, please use GitHub:</p>
            <Button variant="outline" asChild>
              <Link href="https://github.com/tejasbenibagde/fil/issues" target="_blank" rel="noreferrer">
                Open an Issue
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}


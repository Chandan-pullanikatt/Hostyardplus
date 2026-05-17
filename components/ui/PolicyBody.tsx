"use client"

import { PortableText } from "@portabletext/react"

const portableComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-sans text-gray-600 text-base leading-relaxed">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mt-8 mb-2">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl text-gray-900 mt-6 mb-1">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-ocean-400 pl-5 italic text-gray-500 font-sans">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 flex flex-col gap-2 font-sans text-gray-600 text-base leading-relaxed">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 flex flex-col gap-2 font-sans text-gray-600 text-base leading-relaxed">{children}</ol>
    ),
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PolicyBody({ body }: { body: any[] }) {
  return (
    <div className="flex flex-col gap-5">
      <PortableText value={body} components={portableComponents as never} />
    </div>
  )
}

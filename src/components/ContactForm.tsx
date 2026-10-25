import { useState, type CSSProperties, type FormEvent } from 'react'
import { at, type Rect } from '~/lib/layout'

/*
 * The Wix form posted to Wix's own backend, which a static site can't use. Set
 * VITE_CONTACT_FORM_ENDPOINT to a form service URL (Formspree, Getform, ...) to receive
 * messages there; without it, Submit opens the visitor's email app addressed to
 * VITE_CONTACT_EMAIL with the message filled in.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined
const EMAIL = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? ''

interface Field {
  name: string
  label: string
  type?: 'text' | 'email' | 'textarea'
  required?: boolean
  /** Input frames inside the form on the 1440 (d) and 390 (m) canvases. */
  d: Rect
  m: Rect
}

const fields: Field[] = [
  { name: 'firstName', label: 'First name', required: true, d: [23, 156, 672, 33], m: [24, 198, 147, 33] },
  { name: 'lastName', label: 'Last name', required: true, d: [731, 156, 672, 33], m: [207, 198, 147, 33] },
  { name: 'email', label: 'Email', type: 'email', required: true, d: [23, 239, 1380, 33], m: [24, 281, 331, 33] },
  { name: 'organization', label: 'Organization / Affiliation', d: [23, 322, 1380, 33], m: [24, 364, 331, 33] },
  { name: 'subject', label: 'Purpose of Inquiry / Subject', required: true, d: [23, 405, 1380, 33], m: [24, 447, 331, 33] },
  { name: 'message', label: 'Message / Inquiry', type: 'textarea', required: true, d: [23, 496, 1392, 75], m: [24, 538, 343, 75] },
]

// Labels sit 25px above inputs and 33px above the message box.
const labelRect = (r: Rect, textarea: boolean): Rect => [r[0], r[1] - (textarea ? 33 : 25), r[2]]

function mailtoHref(data: FormData) {
  const get = (k: string) => String(data.get(k) ?? '').trim()
  const org = get('organization')
  const body = [
    `Name: ${get('firstName')} ${get('lastName')}`,
    `Email: ${get('email')}`,
    ...(org ? [`Organization / Affiliation: ${org}`] : []),
    '',
    get('message'),
  ].join('\n')
  return `mailto:${EMAIL}?subject=${encodeURIComponent(get('subject'))}&body=${encodeURIComponent(body)}`
}

export function ContactForm({ style }: { style?: CSSProperties }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (!ENDPOINT) {
      window.location.href = mailtoHref(data)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="cform d m" style={style} onSubmit={onSubmit}>
      <h2 className="cform-title d m" style={at([23, 25, 600], [24, 25, 325])}>
        Contact us
      </h2>
      <p className="cform-desc d m" style={at([23, 87, 1000], [24, 87, 325])}>
        May katanungan, nais makipag-partner, o gustong magbahagi ng kwento? Mag-iwan ng mensahe at makikipag-ugnayan kami sa inyo.
      </p>
      {fields.map((f) => {
        const textarea = f.type === 'textarea'
        const id = `cform-${f.name}`
        return (
          <div key={f.name} style={{ display: 'contents' }}>
            <label htmlFor={id} className="cform-label d m" style={at(labelRect(f.d, textarea), labelRect(f.m, textarea))}>
              {f.label}
              {f.required && <span aria-hidden="true"> *</span>}
            </label>
            {textarea ? (
              <textarea id={id} name={f.name} required={f.required} className="cform-input d m" style={at(f.d, f.m)} />
            ) : (
              <input id={id} name={f.name} type={f.type ?? 'text'} required={f.required} className="cform-input d m" style={at(f.d, f.m)} />
            )}
          </div>
        )
      })}
      <button type="submit" className="cform-submit d m" style={at([23, 604, 1392, 41], [24, 646, 343, 41])} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Submit'}
      </button>
      <p className="cform-status d m" style={at([23, 650, 1392], [24, 690, 343])} role="status">
        {status === 'sent' && 'Thanks for submitting!'}
        {status === 'error' && 'Something went wrong. Please try again.'}
      </p>
    </form>
  )
}

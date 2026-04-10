'use client'

import {Check, Loader2} from 'lucide-react'
import * as React from 'react'

import {
  CheckboxGrid,
  PrimaryButton,
  SelectField,
  TextAreaField,
  TextField,
} from '@/app/components/contact/FormFields'
import {submitContactForm, type ContactFormResult} from '@/app/actions/contact'

type Props = {
  data?: {
    formHeading?: string | null
  } | null
}

export default function ContactFormSection({data}: Props) {
  const heading = data?.formHeading || "Let's Talk."

  const formRef = React.useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [result, setResult] = React.useState<ContactFormResult | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const res = await submitContactForm(formData)
    setResult(res)
    setSubmitting(false)

    if (res.success) {
      formRef.current?.reset()
    }
  }

  return (
    <section id="form" className="bg-white py-12 md:py-16 lg:pt-[120px] lg:pb-[100px]">
      <div className="container">
        <div className="flex items-start justify-between gap-10">
          <h2 className="font-sans text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
            {heading}
          </h2>
          <p className="hidden font-sans text-[20px] font-medium leading-[1.4] text-design-oregonSandblastingBlue md:block md:text-[24px]">
            *Required Fields
          </p>
        </div>

        {result?.success ? (
          <div className="mt-10 md:mt-[70px]">
            <div className="mx-auto max-w-lg rounded-xl border border-green-200 bg-green-50 p-8 text-center sm:p-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <Check className="h-7 w-7 text-green-600" strokeWidth={3} />
              </div>
              <h3 className="mt-5 text-[24px] font-bold text-design-oregonSandblastingBlue">
                Message Sent
              </h3>
              <p className="mt-2 text-[16px] text-design-gray">
                Thanks for reaching out! We'll get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setResult(null)}
                className="mt-6 inline-flex h-[45px] items-center justify-center border border-design-lightGray px-6 text-[14px] font-bold uppercase tracking-[0.06em] text-design-oregonSandblastingBlue hover:bg-design-lightGray/50"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="mt-10 md:mt-[70px]">
            <div className="grid gap-x-8 gap-y-8 md:gap-x-12 md:gap-y-[55px] lg:grid-cols-2 lg:gap-x-[100px] xl:gap-x-[183px]">
              <TextField label="Name" name="name" required />
              <TextField label="Company" name="company" />
              <TextField label="Email" name="email" type="email" required />
              <TextField label="Phone Number" name="phone" type="tel" />
              <TextField label="Project Location" name="projectLocation" />
              <SelectField
                label="Estimated Project Timeline"
                name="timeline"
                options={['ASAP', '1–2 weeks', '2–4 weeks', '1–3 months']}
              />
              <CheckboxGrid
                label="Coating Services Needed"
                name="services"
                options={['Blasting', 'Powder', 'Liquid', 'Hybrid', 'Specialty', 'Not Sure']}
              />
              <TextAreaField label="Project Description" name="description" rows={4} />
              <SelectField
                label="How Did You Hear About Us?"
                name="referralSource"
                options={['Referral', 'Google', 'Social', 'Other']}
              />
              <div className="flex flex-col items-start gap-3">
                {result?.error && (
                  <div className="w-full rounded-md bg-red-50 border border-red-200 px-4 py-3">
                    <p className="text-[14px] font-medium text-red-700">{result.error}</p>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <PrimaryButton label={submitting ? 'Sending…' : 'Submit'} disabled={submitting} />
                  {submitting && <Loader2 className="h-5 w-5 animate-spin text-design-gray" />}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

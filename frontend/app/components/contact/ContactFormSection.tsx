import {
  CheckboxGrid,
  PrimaryButton,
  SelectField,
  TextAreaField,
  TextField,
} from '@/app/components/contact/FormFields'

export default function ContactFormSection() {
  return (
    <section id="form" className="bg-white py-24">
      <div className="container">
        <div className="flex items-start justify-between gap-10">
          <h2 className="text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
            Let’s Talk.
          </h2>
          <p className="hidden text-[20px] font-medium leading-[1.4] text-design-oregonSandblastingBlue md:block md:text-[24px]">
            *Required Fields
          </p>
        </div>

        <form className="mt-14">
          <div className="grid gap-x-[183px] gap-y-14 md:grid-cols-2">
            <TextField label="Name" required />
            <TextField label="Company" />

            <TextField label="Email" required />
            <TextField label="Phone Number" />

            <TextField label="Project Location" />
            <SelectField label="Estimated Project Timeline" options={['ASAP', '1–2 weeks', '2–4 weeks', '1–3 months']} />

            <div className="md:col-span-1">
              <CheckboxGrid
                label="Coating Services Needed"
                options={['Blasting', 'Powder', 'Liquid', 'Hybrid', 'Specialty', 'Not Sure']}
              />
            </div>
            <TextAreaField label="Project Description" />

            <SelectField
              label="How Did You Hear About Us?"
              options={['Lorem ipsum', 'Referral', 'Google', 'Social', 'Other']}
            />

            <div className="flex items-end">
              <PrimaryButton label="Submit" />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}



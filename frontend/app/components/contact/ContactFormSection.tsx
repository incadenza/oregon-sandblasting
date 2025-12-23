import {
  CheckboxGrid,
  PrimaryButton,
  SelectField,
  TextAreaField,
  TextField,
} from '@/app/components/contact/FormFields'

export default function ContactFormSection() {
  return (
    <section id="form" className="bg-white pt-[120px] pb-[100px]">
      <div className="container">
        {/* Header row - Figma: "Let's Talk." on left, "*Required Fields" on right */}
        <div className="flex items-start justify-between gap-10">
          <h2 className="font-sans text-[34px] font-bold leading-[1.2] text-design-oregonSandblastingBlue sm:text-[48px] md:text-[60px]">
            Let's Talk.
          </h2>
          <p className="hidden font-sans text-[20px] font-medium leading-[1.4] text-design-oregonSandblastingBlue md:block md:text-[24px]">
            *Required Fields
          </p>
        </div>

        {/* Form - Figma: 2 columns, 729px each, gap ~183px */}
        <form className="mt-[70px]">
          <div className="grid gap-x-[183px] gap-y-[55px] lg:grid-cols-2">
            {/* Row 1 */}
            <TextField label="Name" required />
            <TextField label="Company" />

            {/* Row 2 */}
            <TextField label="Email" required />
            <TextField label="Phone Number" />

            {/* Row 3 */}
            <TextField label="Project Location" />
            <SelectField label="Estimated Project Timeline" options={['ASAP', '1–2 weeks', '2–4 weeks', '1–3 months']} />

            {/* Row 4 */}
            <CheckboxGrid
              label="Coating Services Needed"
              options={['Blasting', 'Powder', 'Liquid', 'Hybrid', 'Specialty', 'Not Sure']}
            />
            <TextAreaField label="Project Description" rows={4} />

            {/* Row 5 */}
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



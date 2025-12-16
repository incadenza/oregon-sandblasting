import ArrowDownLeftIcon from '@/app/components/ui/ArrowDownLeftIcon'

type FieldProps = {
  label: string
  required?: boolean
  className?: string
  inputClassName?: string
}

export function TextField({
  label,
  required,
  className = '',
  inputClassName = '',
}: FieldProps) {
  return (
    <div className={`space-y-3 ${className}`.trim()}>
      <label className="block text-[20px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[24px]">
        {label}
        {required ? '*' : ''}
      </label>
      <input
        className={`h-[70px] w-full bg-design-lightGray px-6 text-[18px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent focus:ring-design-brightBlue ${inputClassName}`.trim()}
      />
    </div>
  )
}

export function TextAreaField({
  label,
  className = '',
  inputClassName = '',
}: FieldProps) {
  return (
    <div className={`space-y-3 ${className}`.trim()}>
      <label className="block text-[20px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[24px]">
        {label}
      </label>
      <textarea
        rows={4}
        className={`min-h-[122px] w-full resize-none bg-design-lightGray px-6 py-5 text-[18px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent focus:ring-design-brightBlue ${inputClassName}`.trim()}
      />
    </div>
  )
}

export function SelectField({
  label,
  required,
  className = '',
  inputClassName = '',
  options,
}: FieldProps & {options: string[]}) {
  return (
    <div className={`space-y-3 ${className}`.trim()}>
      <label className="block text-[20px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[24px]">
        {label}
        {required ? '*' : ''}
      </label>
      <div className="relative">
        <select
          className={`h-[70px] w-full appearance-none bg-design-lightGray px-6 pr-14 text-[18px] text-design-oregonSandblastingBlue outline-none ring-2 ring-transparent focus:ring-design-brightBlue ${inputClassName}`.trim()}
          defaultValue={options[0]}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-design-oregonSandblastingBlue">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function CheckboxGrid({
  label,
  options,
  className = '',
}: {
  label: string
  options: string[]
  className?: string
}) {
  return (
    <fieldset className={`space-y-4 ${className}`.trim()}>
      <legend className="block text-[20px] font-bold leading-[1.4] text-design-oregonSandblastingBlue md:text-[24px]">
        {label}
      </legend>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 md:grid-cols-3">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-4 text-design-oregonSandblastingBlue">
            <input
              type="checkbox"
              className="h-10 w-10 appearance-none bg-design-lightGray ring-2 ring-transparent checked:bg-design-brightBlue focus:ring-design-brightBlue"
            />
            <span className="text-[18px] font-medium leading-[1.4] md:text-[24px]">{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function PrimaryButton({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <button
      type="submit"
      className={`inline-flex h-[60px] items-center gap-3 bg-design-brightBlue px-8 text-[16px] font-bold uppercase tracking-[0.06em] text-white hover:bg-design-brightBlue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-design-brightBlue focus-visible:ring-offset-2 ${className}`.trim()}
    >
      {label}
      <ArrowDownLeftIcon className="h-5 w-5 -rotate-180" />
    </button>
  )
}



function RequiredIcon({ required }: { required: boolean | undefined }) {
  if(!required) return null

  return (
    <div data-testid="required-icon" className="mb-auto mt-1">
      <span className="text-error font-bold">*</span>
    </div>
  )
}

export default RequiredIcon
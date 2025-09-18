type CheckboxProps = {
  title: string
  name: string
  isActive?: boolean
}

function Checkbox({ title, name, isActive }: CheckboxProps) {
  return (
    <label>
      <div>{title}</div>
      <input type='checkbox' name={name} checked={isActive} />
    </label>
  )
}

export default Checkbox

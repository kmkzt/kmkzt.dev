export default function Avatar({ name, picture }) {
  return (
    <div>
      <img src={picture} alt={name} />
      <div>{name}</div>
    </div>
  )
}

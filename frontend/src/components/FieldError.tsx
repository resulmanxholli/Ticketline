export default function FieldError({ messages }: { messages?: string[] }) {
  return messages?.length ? <span className="field-error">{messages[0]}</span> : null
}
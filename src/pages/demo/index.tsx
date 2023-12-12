import Demo from '../components/Demo'
import { Test } from '../components/Test'

export default function DemoPage() {
  return (
    <div>
      <Demo />
      <Test a={1} />
    </div>
  )
}

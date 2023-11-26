import Image from 'next/image'
import Task from './components/Task'

export default function Home() {
  return (
    <main className="bg-white text-black flex min-h-screen flex-col items-center justify-between p-24">
    <Task />
    </main>
  )
}

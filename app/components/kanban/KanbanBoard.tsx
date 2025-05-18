import Image from "next/image"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import WelcomeColumn from "./WelcomeColumn"

type TaskStatus = "todo" | "in-progress" | "done"

interface Task {
  id: string
  title: string
  status: TaskStatus
  assignee: string
  flag?: string // emoji or image url
}

const columns = [
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
] as const

const initialTasks: Task[] = [
  { id: "2", title: "User Authentication", status: "in-progress", assignee: "Fatima", flag: "🇵🇰" },
  { id: "3", title: "Project Setup", status: "done", assignee: "Sara", flag: "🇦🇪" },
]

const statusLabel = {
  "todo": "TO DO",
  "in-progress": "IN PROGRESS",
  "done": "COMPLETED"
}

const statusColor = {
  "todo": "text-gray-500",
  "in-progress": "text-yellow-600",
  "done": "text-green-600"
}

const KanbanBoard = () => (
  <div className="min-h-screen bg-[#f5f6fa] flex flex-col items-center justify-center py-8">
    {/* Logo at the top */}
    <div className="mb-8 flex justify-center">
      <Image
        src="/gulfsend-logo.png"
        alt="GulfSend Logo"
        width={180}
        height={48}
        priority
        className="mx-auto"
      />
    </div>
    <div className="flex gap-8 w-full max-w-6xl">
      {/* First column: Welcome with language selector */}
      <WelcomeColumn />
      {/* Other columns unchanged */}
      {columns.map((column) => (
        <Card key={column.id} className="flex-1 rounded-3xl shadow-lg bg-white min-h-[500px] flex flex-col">
          <CardHeader className="rounded-t-3xl bg-white border-b-0 pb-2">
            <CardTitle className="text-xl font-bold text-[#0097a7] tracking-wide">{column.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 pt-2">
            {initialTasks.filter(task => task.status === column.id).map(task => (
              <Card
                key={task.id}
                className="flex items-center gap-4 rounded-2xl shadow border border-gray-100 bg-gray-50 px-4 py-3"
                tabIndex={0}
                aria-label={`Task: ${task.title}, Status: ${statusLabel[task.status]}`}
              >
                <span className="text-2xl">{task.flag ?? "👤"}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{task.assignee}</div>
                  <div className="text-sm text-gray-600">{task.title}</div>
                </div>
                <span className={`text-xs font-semibold uppercase ${statusColor[task.status]}`}>
                  {statusLabel[task.status]}
                </span>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

export default KanbanBoard 
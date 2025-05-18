import Image from "next/image";
import KanbanBoard from "./components/kanban/KanbanBoard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-xl font-bold text-[#0097a7] hover:text-[#007d8a] hover:bg-[#e0f7fa]">
            API Keys Dashboard
          </Button>
        </Link>
      </div>
      <KanbanBoard />
    </main>
  );
}

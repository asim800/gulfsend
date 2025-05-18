"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const languages = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "hi", label: "हिंदी" },
]

const WelcomeColumn = () => {
  const [selectedLanguage1, setSelectedLanguage1] = useState<string>("en")
  const [selectedLanguage2, setSelectedLanguage2] = useState<string>("ur")

  const handleLanguageChange1 = (value: string) => {
    setSelectedLanguage1(value)
  }

  const handleLanguageChange2 = (value: string) => {
    setSelectedLanguage2(value)
  }

  return (
    <Card className="flex-1 rounded-3xl shadow-lg bg-white min-h-[500px] flex flex-col">
      <CardHeader className="rounded-t-3xl bg-white border-b-0 pb-2">
        <CardTitle className="text-xl font-bold text-[#0097a7] tracking-wide">Welcome</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 pt-2 justify-center">
        <div className="flex flex-col gap-4 w-full">
          <Select value={selectedLanguage1} onValueChange={handleLanguageChange1}>
            <SelectTrigger className="w-full h-14 text-lg font-medium rounded-2xl shadow border border-gray-100 bg-gray-50">
              <SelectValue placeholder="Select first language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem 
                  key={lang.code} 
                  value={lang.code}
                  className="text-lg py-3"
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLanguage2} onValueChange={handleLanguageChange2}>
            <SelectTrigger className="w-full h-14 text-lg font-medium rounded-2xl shadow border border-gray-100 bg-gray-50">
              <SelectValue placeholder="Select second language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem 
                  key={lang.code} 
                  value={lang.code}
                  className="text-lg py-3"
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default WelcomeColumn 
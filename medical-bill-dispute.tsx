"use client"

import { useState } from "react"
import { AlertCircle, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MedicalBillDispute() {
  const [itemizedBill, setItemizedBill] = useState<File | null>(null)
  const [eob, setEob] = useState<File | null>(null)
  const [medicalRecords, setMedicalRecords] = useState<File | null>(null)
  const [planCoverage, setPlanCoverage] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [result, setResult] = useState<{ issues: string[]; correctBilling: string; appealLetter: string } | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    if (event.target.files && event.target.files[0]) {
      setter(event.target.files[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the data to your backend
    // For demonstration, we'll simulate a response
    setResult({
      issues: ["Incorrect billing code used", "Duplicate charge found"],
      correctBilling: "The correct billing code should be XYZ123",
      appealLetter: "Dear Sir/Madam,\n\nI am writing to appeal the charges on my recent medical bill...",
    })
  }

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result.appealLetter], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "appeal-letter.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Medical Bill Dispute Assistant</CardTitle>
          <CardDescription>
            Upload your documents and describe your situation to get help with your medical bill dispute.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="itemized-bill" className="block text-sm font-medium text-gray-700 mb-1">
                  Itemized Bill from Provider
                </label>
                <input
                  type="file"
                  id="itemized-bill"
                  onChange={(e) => handleFileUpload(e, setItemizedBill)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label htmlFor="eob" className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation of Benefits (EOB)
                </label>
                <input
                  type="file"
                  id="eob"
                  onChange={(e) => handleFileUpload(e, setEob)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label htmlFor="medical-records" className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Records
                </label>
                <input
                  type="file"
                  id="medical-records"
                  onChange={(e) => handleFileUpload(e, setMedicalRecords)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label htmlFor="plan-coverage" className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Coverage Document
                </label>
                <input
                  type="file"
                  id="plan-coverage"
                  onChange={(e) => handleFileUpload(e, setPlanCoverage)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Describe your encounter and why you think the bill is wrong
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Please provide details about your medical encounter and why you believe the bill is incorrect..."
              />
            </div>
            <Button type="submit" className="w-full">
              <Upload className="mr-2 h-4 w-4" /> Submit for Review
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Dispute Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Issues Found</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5">
                  {result.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Correct Billing Information</h3>
              <p>{result.correctBilling}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download Appeal Letter
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}


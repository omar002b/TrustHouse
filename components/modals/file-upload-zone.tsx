"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, File, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadZoneProps {
  label: string
  accept?: string
  multiple?: boolean
  onFilesChange: (files: File[]) => void
  className?: string
}

export function FileUploadZone({ label, accept, multiple = false, onFilesChange, className }: FileUploadZoneProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      const newFiles = multiple ? [...files, ...droppedFiles] : droppedFiles.slice(0, 1)

      setFiles(newFiles)
      onFilesChange(newFiles)
    },
    [files, multiple, onFilesChange],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
      const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles.slice(0, 1)

      setFiles(newFiles)
      onFilesChange(newFiles)
    },
    [files, multiple, onFilesChange],
  )

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index)
      setFiles(newFiles)
      onFilesChange(newFiles)
    },
    [files, onFilesChange],
  )

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-gray-300">{label}</label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragOver
            ? "border-green-400 bg-green-900/20"
            : files.length > 0
              ? "border-green-500 bg-green-900/10"
              : "border-gray-500 bg-gray-700/30 hover:border-green-400 hover:bg-green-900/10",
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          id={`file-${label.replace(/\s+/g, "-").toLowerCase()}`}
        />

        <label htmlFor={`file-${label.replace(/\s+/g, "-").toLowerCase()}`} className="cursor-pointer">
          {files.length === 0 ? (
            <div className="space-y-2">
              <Upload className="w-8 h-8 mx-auto text-gray-400" />
              <div className="text-gray-300">
                <p className="font-medium">Arrastra y suelta {multiple ? "los archivos" : "el archivo"} aquí</p>
                <p className="text-sm text-gray-400">o haz clic para seleccionar</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Check className="w-8 h-8 mx-auto text-green-400" />
              <p className="text-green-400 font-medium">
                {files.length} archivo{files.length > 1 ? "s" : ""} seleccionado{files.length > 1 ? "s" : ""}
              </p>
            </div>
          )}
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-700/50 p-2 rounded">
              <div className="flex items-center space-x-2">
                <File className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300 truncate">{file.name}</span>
                <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button onClick={() => removeFile(index)} className="text-red-400 hover:text-red-300 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

"use client";

import { uploadWallpaper } from "@/app/upload/actions";
import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, ImageIcon, Plus, UploadIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

const categories: { value: string; label: string }[] = [
  { value: "general", label: "Geral" },
  { value: "anime", label: "Anime" },
  { value: "people", label: "Pessoas" },
  { value: "nature", label: "Natureza" },
  { value: "abstract", label: "Abstrato" },
  { value: "space", label: "Espaço" },
  { value: "technology", label: "Tecnologia" },
];

export function UploadForm() {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<{
    url: string;
    file: File;
    name: string;
    size: number;
    width: number;
    height: number;
  } | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    tags: [] as string[],
  });

  const addTag = () => {
    if (
      tagInput.trim() &&
      !formData.tags.includes(tagInput.trim().toLowerCase())
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        setPreview({
          url: e.target.result,
          file,
          name: file.name,
          size: parseFloat((file.size / (1024 * 1024)).toFixed(2)),
          width,
          height,
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview?.file) return alert("Selecione um arquivo de imagem.");
    if (!formData.category) return alert("Selecione uma categoria.");

    const fd = new FormData();
    fd.append("file", preview.file);
    fd.append("category", formData.category);
    fd.append("tags", JSON.stringify(formData.tags));
    fd.append("width", preview.width.toString());
    fd.append("height", preview.height.toString());

    await uploadWallpaper(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl transition-all duration-300",
          dragActive
            ? "border-cyan-500 bg-cyan-500/10"
            : "border-zinc-800 hover:border-zinc-700",
          preview ? "p-4" : "p-12",
        )}
      >
        {preview ? (
          <div className="relative rounded-xl flex flex-col w-fit mx-auto">
            <img
              src={preview.url}
              alt="Preview"
              className="w-full h-auto rounded-xl max-h-100 mx-auto caret-transparent select-none"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-2 cursor-pointer right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-zinc-400 text-sm">
              <Check className="w-4 h-4 text-green-400" />
              {preview.name} - {preview.size} MB
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-white font-medium mb-2">
              Arraste seu wallpaper aqui
            </h3>
            <p className="text-zinc-500 text-sm mb-4">
              Suporta JPG, PNG e JPEG
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <span className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors">
                <UploadIcon className="w-4 h-4 mr-2" />
                Upload de um arquivo
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-3">
        <Label className="text-zinc-400">Categoria *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger className="bg-zinc-900/80 border-zinc-800 text-white h-12 rounded-xl">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800">
            {categories.map((cat) => (
              <SelectItem
                key={cat.value}
                value={cat.value}
                className="text-white focus:bg-zinc-800 focus:text-white capitalize"
              >
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-3">
        <Label className="text-zinc-400">Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            placeholder="Adicionar tags"
            className="bg-zinc-900/80 border-zinc-800 text-white h-12 rounded-xl focus:ring-cyan-500 focus:border-cyan-500"
          />
          <button
            type="button"
            onClick={addTag}
            className="h-12 px-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer px-3 py-1"
                onClick={() => removeTag(tag)}
              >
                {tag}
                <X className="w-3 h-3 ml-2" strokeWidth={3} />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Button className="font-sans py-5">Enviar</Button>
    </form>
  );
}

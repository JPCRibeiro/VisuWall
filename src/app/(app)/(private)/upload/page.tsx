import { UploadForm } from "@/components/layout/forms/uploadForm";

export default function UploadPage() {
  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Upload Wallpaper</h1>
      <p className="text-zinc-400 mb-8">
        Compartilhe seus incríveis papéis de parede com a comunidade
      </p>
      <UploadForm />
    </div>
  );
}
export default function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between">
          <p className="text-[#4b4b4b] text-sm font-semibold flex items-center gap-1.25 ">
            <span className="text-lg font-extrabold font-fredoka pb-0.75 leading-0">VisuWall</span>
            {" "}{" "}© {new Date().getFullYear()}. Todos os wallpapers foram enviados pelos usuários
          </p>
        </div>
      </div>
    </footer>
  );
}

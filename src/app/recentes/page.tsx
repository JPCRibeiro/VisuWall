import { Clock } from "lucide-react";
import Link from "next/link";

export default function RecentesPage() {
  return (
    <div className=" bg-[#0a0a0a]">
      <div className="bg-[radial-gradient(800px_80px_at_0px_top,#0068ff63,transparent)] pl-10 pt-5 pr-5">
        <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000] flex items-center gap-3 mb-2">
          <Clock className="text-blue-500" size={40} />
          Mais Recentes
        </h3>
        <p className="text-white font-semibold text-[18px]">
          Últimos wallpapers postados por nossos usuários!
        </p>
      </div>
    </div>
  );
}

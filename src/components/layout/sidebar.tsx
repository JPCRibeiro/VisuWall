import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild className="cursor-pointer md:hidden flex">
        <Menu className="w-6 h-6 text-white" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="items-end">
          <DrawerTitle>
            <DrawerClose asChild className="cursor-pointer">
              <X className="w-7 h-7 text-white" />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription className="hidden"></DrawerDescription>
        </DrawerHeader>
        <ul className="no-scrollbar overflow-y-auto px-4 flex flex-col">
          <li className="w-full">
            <DrawerClose asChild>
              <Link
                href="/"
                className="w-full py-2 flex h-full border-b justify-center border-gray-500"
              >
                Início
              </Link>
            </DrawerClose>
          </li>
          <li className="w-full">
            <DrawerClose asChild>
              <Link
                href="/favoritos"
                className="w-full py-2 flex h-full border-b justify-center border-gray-500"
              >
                Favoritos
              </Link>
            </DrawerClose>
          </li>
          <li className="w-full">
            <DrawerClose asChild>
              <Link
                href="/upload"
                className="w-full py-2 flex h-full justify-center"
              >
                Upload
              </Link>
            </DrawerClose>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

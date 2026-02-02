import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Cpu,
  Layers,
  LayoutGrid,
  Rocket,
  Shapes,
  Sparkles,
  Trees,
  Users,
} from "lucide-react";

const categories = [
  { id: "general", label: "Todos", icon: LayoutGrid },
  { id: "anime", label: "Anime", icon: Sparkles },
  { id: "people", label: "Pessoas", icon: Users },
  { id: "nature", label: "Natureza", icon: Trees },
  { id: "abstract", label: "Abstrato", icon: Shapes },
  { id: "space", label: "Espaço", icon: Rocket },
  { id: "technology", label: "Tecnologia", icon: Cpu },
];

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full flex items-center justify-center"
    >
      <CarouselPrevious className="mr-2"/>
      <CarouselContent className="-ml-1">
        {categories.map((cat) => (
          <CarouselItem key={cat.id} className="basis-1/2 pl-1 lg:basis-1/4">
            <div className="p-1"> 
              <Button variant={"default"} className="w-full px-4! flex">
                <cat.icon className="size-4" />
                <span>{cat.label}</span>
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="ml-2"/>
    </Carousel>
  );
}

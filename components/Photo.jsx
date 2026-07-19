import Image from "next/image";
import photo from "@/public/images/nevil.jpg";

export default function Photo() {
  return (
    <div className="relative w-full max-w-[300px] aspect-[5/6] mx-auto md:mx-0">
      <Image
        src={photo}
        alt="Nevil Amraniya"
        fill
        priority
        sizes="(min-width: 768px) 300px, 60vw"
        className="object-cover object-top rounded-[10px] grayscale contrast-[1.05]"
      />
      <div className="absolute inset-0 rounded-[10px] border border-border-strong" />
      <div className="absolute -bottom-3 -left-3 w-20 h-20 border-l-2 border-b-2 border-amber rounded-bl-[10px]" />
    </div>
  );
}

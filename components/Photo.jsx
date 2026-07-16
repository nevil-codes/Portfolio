import Image from "next/image";
import photo from "@/public/images/nevil.jpg";

export default function Photo() {
  return (
    <div className="relative w-[300px] h-[360px]">
      <Image
        src={photo}
        alt="Nevil Amraniya"
        fill
        priority
        sizes="300px"
        className="object-cover object-top rounded-[10px] grayscale contrast-[1.05]"
      />
      <div className="absolute inset-0 rounded-[10px] border border-border-strong" />
      <div className="absolute -bottom-3 -left-3 w-20 h-20 border-l-2 border-b-2 border-amber rounded-bl-[10px]" />
    </div>
  );
}

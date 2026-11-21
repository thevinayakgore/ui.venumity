import { Avatar, AvatarImage, AvatarFallback, type AvatarSize } from "./index";

const SIZES: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];

export default function SizeAvatarDemo() {
  return (
    <div className="flex flex-wrap items-end gap-5">
      {SIZES.map((s) => (
        <div key={s} className="flex flex-col items-center gap-2">
          <Avatar size={s} animation="scale" status="online">
            <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Bob" />
            <AvatarFallback>Bob Smith</AvatarFallback>
          </Avatar>
          <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

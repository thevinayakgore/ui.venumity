import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./index";

const PEOPLE = [
  { name: "Alice Johnson", src: "https://i.pravatar.cc/150?img=47" },
  { name: "Bob Smith", src: "https://i.pravatar.cc/150?img=12" },
  { name: "Carol Williams", src: "https://i.pravatar.cc/150?img=44" },
  { name: "David Chen", src: "https://i.pravatar.cc/150?img=15" },
  { name: "Eve Martin", src: "https://i.pravatar.cc/150?img=49" },
  { name: "Frank Oz", src: "" },
];

export default function GroupAvatarDemo() {
  return (
    <div className="space-y-5 md:space-y-10">
      <div className="space-y-5">
        <p className="text-xs">
          Group - 6 People, Max 4 Visible
        </p>
        <AvatarGroup max={4}>
          {PEOPLE.map((p) => (
            <Avatar key={p.name} tooltip={p.name}>
              {p.src ? <AvatarImage src={p.src} alt={p.name} /> : null}
              <AvatarFallback>{p.name}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>

      <div className="space-y-5">
        <p className="text-xs">
          Group - XL Size, No-Tooltips
        </p>
        <AvatarGroup max={5} size="xl">
          {PEOPLE.slice(0, 5).map((p) => (
            <Avatar key={p.name}>
              <AvatarImage src={p.src} alt={p.name} />
              <AvatarFallback>{p.name}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
}

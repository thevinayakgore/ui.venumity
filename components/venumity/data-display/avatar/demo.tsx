import { Avatar, AvatarImage, AvatarFallback } from "./index";

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Avatar
        size="lg"
        tooltip="Alice Johnson · Design"
        animation="scale"
        status="offline"
      >
        <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Alice" />
        <AvatarFallback>Alice</AvatarFallback>
      </Avatar>
      <Avatar
        size="lg"
        status="online"
        tooltip={
          <span>
            <strong>Bob Smith</strong>
            <br />
            Engineering · Online
          </span>
        }
      >
        <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Bob" />
        <AvatarFallback>Bob</AvatarFallback>
      </Avatar>
    </div>
  );
}

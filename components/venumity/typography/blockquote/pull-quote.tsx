import { Blockquote } from "./index";

export default function PullBlockquoteDemo() {
  return (
    <Blockquote
      tone="info"
      variant="pull"
      className="w-xl"
      cite="✨ Buddha"
      quote="An idea that is developed and put into action is more important than an idea that exists only as an idea."
    />
  );
}

import { Blockquote } from "./index";

export default function ToneBlockquoteDemo() {
  return (
    <div className="p-5 md:p-10 space-y-8 max-w-3xl">
      {/* Neutral */}
      <div className="space-y-3">
        <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          tone = &quot;neutral&quot;
        </p>
        <Blockquote
          tone="neutral"
          cite="Venumity"
          quote="This is a neutral tone accent on the left bar."
        />
      </div>

      {/* Brand */}
      <div className="space-y-3">
        <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          tone = &quot;brand&quot;
        </p>
        <Blockquote
          tone="info"
          cite="Venumity"
          quote="This is a brand tone accent on the left bar."
        />
      </div>

      {/* Success */}
      <div className="space-y-3">
        <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          tone = &quot;success&quot;
        </p>
        <Blockquote
          tone="success"
          cite="Venumity"
          quote="This is a success tone accent on the left bar."
        />
      </div>

      {/* Warning */}
      <div className="space-y-3">
        <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          tone = &quot;warning&quot;
        </p>
        <Blockquote
          tone="warning"
          cite="Venumity"
          quote="This is a warning tone accent on the left bar."
        />
      </div>

      {/* Danger */}
      <div className="space-y-3">
        <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          tone = &quot;danger&quot;
        </p>
        <Blockquote
          tone="danger"
          cite="Venumity"
          quote="This is a danger tone accent on the left bar."
        />
      </div>
    </div>
  );
}

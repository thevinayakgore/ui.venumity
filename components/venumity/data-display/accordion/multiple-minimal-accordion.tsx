import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./index";

export default function MultipleMinimalAccordionDemo() {
  return (
    <Accordion
      variant="minimal"
      behavior="multiple"
      className="p-5 md:p-10 max-w-2xl"
    >
      <AccordionItem value="account" defaultOpen>
        <AccordionTrigger># Account settings</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Manage your account preferences and security settings.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Change password</li>
              <li>Two-factor authentication</li>
              <li>Privacy settings</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="billing">
        <AccordionTrigger># Billing information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <p>View and manage your billing details and subscription.</p>
            <div className="space-y-1 rounded-md border border-border bg-muted/40 p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current plan</span>
                <span className="font-medium">Pro Plan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next billing</span>
                <span className="font-medium">May 15, 2024</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="notifications">
        <AccordionTrigger>#  Notifications</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Customize how and when you receive notifications.</p>
            <div className="space-y-1.5">
              {["Email notifications", "Push notifications", "SMS alerts"].map(
                (label) => (
                  <label
                    key={label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input type="radio" name="notif" className="size-3.5" />
                    {label}
                  </label>
                ),
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="team">
        <AccordionTrigger># Team members</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Manage team members and their permissions.</p>
            <div className="space-y-1.5">
              {["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown"].map(
                (name) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm"
                  >
                    <span>{name}</span>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      Admin
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="api">
        <AccordionTrigger># API keys</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Manage your API keys and access tokens.</p>
            <div className="space-y-1.5">
              {[
                { name: "Production key", date: "Created Apr 12, 2024" },
                { name: "Development key", date: "Created Apr 1, 2024" },
              ].map((k) => (
                <div
                  key={k.name}
                  className="flex items-center justify-between rounded-md border border-border bg-muted/40 px-3 py-2"
                >
                  <div>
                    <div className="text-sm font-medium">{k.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {k.date}
                    </div>
                  </div>
                  <button className="rounded bg-red-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-600">
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

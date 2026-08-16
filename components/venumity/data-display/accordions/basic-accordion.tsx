"use client";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  badge?: string;
}

interface AccordionRootContextValue {
  openItem: string | null;
  toggleItem: (id: string) => void;
}
const AccordionRootContext = createContext<AccordionRootContextValue | null>(
  null,
);

interface AccordionItemContextValue {
  id: string;
}
const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

function useAccordionRoot() {
  const ctx = useContext(AccordionRootContext);
  if (!ctx)
    throw new Error("Accordion components must be used within <Accordion />");
  return ctx;
}

function useAccordionItem() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx)
    throw new Error(
      "AccordionItem components must be used within <AccordionItem />",
    );
  return ctx;
}

interface AccordionProps {
  defaultValue?: string;
  children: ReactNode;
  className?: string;
}

function Accordion({ defaultValue, children, className }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(defaultValue ?? null);

  function toggleItem(id: string) {
    setOpenItem((prev) => (prev === id ? null : id));
  }

  return (
    <AccordionRootContext.Provider value={{ openItem, toggleItem }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionRootContext.Provider>
  );
}

interface AccordionItemComponentProps {
  id: string;
  children: ReactNode;
  className?: string;
}

function AccordionItem({
  id,
  children,
  className,
}: AccordionItemComponentProps) {
  return (
    <AccordionItemContext.Provider value={{ id }}>
      <div
        className={cn(
          "border rounded-lg overflow-hidden hover:shadow-lg/10 transition-all duration-500",
          className,
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { id } = useAccordionItem();
  const { openItem, toggleItem } = useAccordionRoot();
  const isOpen = openItem === id;

  return (
    <button
      onClick={() => toggleItem(id)}
      className={cn(
        "w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer",
        className,
      )}
    >
      <span className="flex-1">{children}</span>
      <ChevronDown
        className={cn(
          "size-5 shrink-0 transition-transform duration-300",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

function AccordionContent({ children, className }: AccordionContentProps) {
  const { id } = useAccordionItem();
  const { openItem } = useAccordionRoot();
  const isOpen = openItem === id;
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [children]);

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? height : 0 }}
    >
      <div ref={ref} className={cn("px-6 pb-4 pt-2 border-t", className)}>
        {children}
      </div>
    </div>
  );
}

const demoItems: AccordionItem[] = [
  {
    id: "item1",
    title: "Account Settings",
    badge: "3 Updates",
    content: (
      <div className="space-y-2 text-sm">
        <p>Manage your account preferences and security settings.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Change password</li>
          <li>Two-factor authentication</li>
          <li>Privacy settings</li>
        </ul>
      </div>
    ),
  },
  {
    id: "item2",
    title: "Billing Information",
    badge: "Active",
    content: (
      <div className="space-y-3">
        <p>View and manage your billing details and subscription.</p>
        <div className="space-y-1 bg-foreground/5 backdrop-blur-lg p-3 text-xs border rounded-sm">
          <div className="flex justify-between">
            <span className="text-foreground/60">Current Plan</span>
            <span className="font-medium">Pro Plan</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/60">Next Billing</span>
            <span className="font-medium">May 15, 2024</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "item3",
    title: "Notifications",
    badge: "Configure",
    content: (
      <div className="space-y-3">
        <p>Customize how and when you receive notifications.</p>
        <RadioGroup defaultValue="email" className="text-xs font-medium">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <label htmlFor="email">Email notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="push" id="push" />
            <label htmlFor="push">Push notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms" id="sms" />
            <label htmlFor="sms">SMS alerts</label>
          </div>
        </RadioGroup>
      </div>
    ),
  },
  {
    id: "item4",
    title: "Team Members",
    badge: "5 Members",
    content: (
      <div className="space-y-3">
        <p>Manage team members and their permissions.</p>
        <div className="space-y-2">
          {[
            "John Doe",
            "Jane Smith",
            "Bob Johnson",
            "Alice Brown",
            "Charlie Wilson",
          ].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between py-1.5 px-3 bg-foreground/5 backdrop-blur-lg border rounded-sm"
            >
              <span>{name}</span>
              <span className="text-[0.6rem] px-1.5 py-0.5 bg-green-500 text-white rounded">
                Admin
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "item5",
    title: "API Keys",
    badge: "2 Keys",
    content: (
      <div className="space-y-3">
        <p>Manage your API keys and access tokens.</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 py-2 bg-foreground/5 backdrop-blur-lg border rounded-sm">
            <div>
              <div className="font-medium">Production Key</div>
              <div className="text-sm text-foreground/40">
                Created: Apr 12, 2024
              </div>
            </div>
            <button className="py-1 px-3 cursor-pointer text-sm bg-red-500 text-white rounded-sm">
              Revoke
            </button>
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-foreground/5 backdrop-blur-lg border rounded-sm">
            <div>
              <div className="font-medium">Development Key</div>
              <div className="text-sm text-foreground/40">
                Created: Apr 1, 2024
              </div>
            </div>
            <button className="py-1 px-3 cursor-pointer text-sm bg-red-500 text-white rounded-sm">
              Revoke
            </button>
          </div>
        </div>
      </div>
    ),
  },
];

export default function BasicAccordionDemo() {
  return (
    <Accordion defaultValue="item1" className="max-w-2xl mx-auto p-6 md:p-10">
      {demoItems.map((item) => (
        <AccordionItem key={item.id} id={item.id}>
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <span className="font-semibold">{item.title}</span>
              {item.badge && (
                <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  } from "./index";
  
  export default function MinimalAccordion() {
    return (
      <Accordion
        variant="minimal"
        className="p-5 md:p-10 max-w-2xl"
      >
        <AccordionItem value="account" defaultOpen>
          <AccordionTrigger>Account settings</AccordionTrigger>
          <AccordionContent>
            Manage your account preferences and security settings.
          </AccordionContent>
        </AccordionItem>
  
        <AccordionItem value="billing">
          <AccordionTrigger>Billing information</AccordionTrigger>
          <AccordionContent>
            View and manage your billing details and subscription.
          </AccordionContent>
        </AccordionItem>
  
        <AccordionItem value="notifications">
          <AccordionTrigger>Notifications</AccordionTrigger>
          <AccordionContent>
            Customize how and when you receive notifications.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
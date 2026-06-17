import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(4,4,6,0.82)] backdrop-blur-[3px]",
        "data-[state=open]:animate-[gw-fade_0.18s_ease]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Bottom-anchored sheet, oxblood top hairline, rise-in animation — the
 * prototype's `.gw-modal`. Consumers supply the inner content (header, links).
 */
function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay>
        <DialogPrimitive.Content
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative w-full max-w-[560px] border-t-2 border-oxblood bg-ash px-[26px] pb-[34px] pt-[30px]",
            "focus:outline-none data-[state=open]:animate-[gw-rise_0.22s_cubic-bezier(0.2,0.7,0.3,1)]",
            className,
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
};

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";

type TooltipQuickProps = {
  triggerContent: React.ReactNode;
  children: React.ReactNode;
} & PopoverPrimitive.PopoverTriggerProps &
  React.RefAttributes<HTMLButtonElement>;

const TooltipQuick = ({ triggerContent, children, ...props }: TooltipQuickProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={val => setOpen(val)}>
      <PopoverTrigger {...props} onClick={() => setOpen(!open)}>
        {triggerContent}
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
};

export default TooltipQuick;

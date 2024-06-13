"use client";

import * as React from "react";
import Settings from "./Settings";
import { useMediaQuery } from "usehooks-ts";
// import { useMediaQuery } from "~~/hooks/use-media-query"
import { Button } from "~~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~~/components/ui/drawer";
import { Dialog, DialogContent, DialogTrigger } from "~~/components/ui/halo-dialog";

interface SettingsDialog {
  trigger: React.ReactNode;
}

const SettingsDialog = ({ trigger }: SettingsDialog) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  console.log("Dialog Rendered");
  console.log(open);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          title="Settings"
          description={<>View and modify the application settings.</>}
        >
          <Settings />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>View and modify the application settings.</DrawerDescription>
        </DrawerHeader>
        <Settings />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDialog;

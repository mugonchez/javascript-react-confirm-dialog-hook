import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const useConfirm = (title, message) => {
  const [promise, setPromise] = useState(null);

  // Function to create a new promise and store the resolve function
  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  // Handler to close the dialog and reset the promise
  const handleClose = () => {
    setPromise(null);
  };

  // Handler to resolve the promise with true (confirm)
  const handleConfirm = () => {
    if (promise) {
      promise.resolve(true);
      handleClose();
    }
  };

  // Handler to resolve the promise with false (cancel)
  const handleCancel = () => {
    if (promise) {
      promise.resolve(false);
      handleClose();
    }
  };

  // Dialog component to display the confirmation dialog
  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};

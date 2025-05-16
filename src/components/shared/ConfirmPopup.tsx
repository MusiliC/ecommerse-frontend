import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader } from "lucide-react";

type ConfirmPopupProps = {
  onConfirm: () => void;
  children?: React.ReactNode;
  triggerButton: React.ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  onConfirm,
  onCancel,
  triggerButton,
  children,
  title = "Confirm Action",
  description = "Please confirm this action.",
  open,
  onOpenChange,
  isLoading,
  isDisabled,
}) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel || (() => handleOpenChange(false))}
            disabled={isLoading || isDisabled}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading || isDisabled}
            onClick={onConfirm}
          >
            {isLoading && <Loader className="animate-spin size-4" />}
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmPopup;

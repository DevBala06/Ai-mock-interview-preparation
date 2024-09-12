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
  import { Trash2 } from "lucide-react";
  
  interface AlertProps {
    interviewId: string; 
    handleDelete: (id: string) => void;
  }
  
  export function DeleteModal({ interviewId, handleDelete }: AlertProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="font-semibold"
          >
            <Trash2 className="text-[.9rem] text-red-300 hover:text-red-500" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-semibold text-neutral-600">
              This action cannot be undone. This will permanently delete this interview and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 border font-semibold border-red-800 hover:bg-red-700" onClick={() => handleDelete(interviewId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
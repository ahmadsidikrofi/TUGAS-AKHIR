import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye } from '@phosphor-icons/react';
const NotesDetail = ({ title, description }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-amber-500 h-8 rounded-lg p-1">
          <Eye size={22} />
        </DialogTrigger>
        <DialogContent className="w-1/2 h-36 px-8 items-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesDetail;

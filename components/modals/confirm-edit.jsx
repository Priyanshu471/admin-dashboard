import { useButton } from "@/hooks/useButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef } from "react";

export function ConfirmEdit() {
  const { isOpen, toggleModal, user, setUser } = useButton();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const handleSave = () => {
    if (
      nameRef.current.value &&
      emailRef.current.value &&
      roleRef.current.value
    ) {
      setUser({
        ...user,
        name: nameRef.current.value,
        email: emailRef.current.value,
        role: roleRef.current.value,
      });

      toggleModal();
    } else {
      alert("Please fill all the fields");
    }
  };
  const handleCancel = () => {
    toggleModal();
    // setUser(user);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit user: {user.id}</DialogTitle>
          <DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={user.name}
                  className="col-span-3"
                  ref={nameRef}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={user.email}
                  className="col-span-3"
                  ref={emailRef}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  defaultValue={user.role}
                  className="col-span-3"
                  ref={roleRef}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant={"ghost"} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant={"default"} onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

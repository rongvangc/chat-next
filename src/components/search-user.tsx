import { cn, fallbackDisplayname } from "@/lib/utils";
import useUserStore from "@/stores/user";
import { Check } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";
import useChatStore from "@/stores/chat";

export const SearchUser = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUserStore();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const { users, getAllUsers } = useUserStore();
  const { createRoom } = useChatStore();

  console.log(selectedUsers);

  const selectedUerOIncludeYou = useMemo(
    () => [
      {
        displayName: user?.displayName,
        username: user?.username,
        photoURL: user?.photoURL,
        id: user?.id,
      },
      ...selectedUsers,
    ],
    [selectedUsers, user?.displayName, user?.id, user?.photoURL, user?.username]
  );

  const listUID = selectedUerOIncludeYou?.reduce((acc, value) => {
    if (value?.id) return acc.concat([value.id]);
    return acc;
  }, [] as string[]);

  const handleCreateRoom = useCallback(async () => {
    if (user?.id) {
      try {
        createRoom({
          name: user?.id,
          admin: user?.id,
          createdBy: user?.id,
          users: selectedUerOIncludeYou,
        });
        setSelectedUsers([]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [createRoom, selectedUerOIncludeYou, user?.id]);

  // get all users
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">Search users...</span>
        <kbd className="pointer-events-none absolute right-1.5 dark:text-white top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>F
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Invite a user to this thread. This will create a new group
              message.
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {users?.map((user) => (
                  <CommandItem
                    key={user?.username}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        return setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        );
                      }

                      return setSelectedUsers(
                        [...users].filter((u) =>
                          [...selectedUsers, user].includes(u)
                        )
                      );
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user?.photoURL ?? ""} alt="Image" />
                      <AvatarFallback>
                        {fallbackDisplayname(user?.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {user?.displayName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user?.username}
                      </p>
                    </div>
                    {selectedUsers.includes(user) ? (
                      <Check className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedUsers.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user?.displayName}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={user?.photoURL ?? ""} />
                    <AvatarFallback>
                      {fallbackDisplayname(user?.displayName)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select users to add to this thread.
              </p>
            )}
            <Button
              disabled={selectedUsers.length < 1}
              onClick={() => {
                setOpen(false);
                handleCreateRoom();
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

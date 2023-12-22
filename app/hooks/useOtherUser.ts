import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (
    conversation: FullConversationType | { users: User[] }
  ): User | undefined => {
    const session = useSession();
  
    const otherUser = useMemo(() => {
      const currentUserEmail = session.data?.user?.email;
  
      if ("users" in conversation) {
        const otherUsers = (conversation as { users: User[] }).users; // явное приведение типа
        const filteredUsers = otherUsers.filter(
          (user) => user.email !== currentUserEmail
        );
  
        return filteredUsers[0];
      } else {
        return undefined;
      }
    }, [session.data?.user?.email, conversation]);
  
    return otherUser;
  };
  
  export default useOtherUser;
  




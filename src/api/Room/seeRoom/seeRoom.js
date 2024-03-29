import {prisma} from "../../../../generated/prisma-client";
import {ROOM_FRAGMENT} from "../../../fragments";

export default {
    Query: {
        seeRoom: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request)
            const { roomId } = args
            const { user } = request
            const canSee = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            })
            if(canSee){
                return prisma.room({ roomId }).$fragment(ROOM_FRAGMENT)
            }else {
                throw Error("You can't see it")
            }
        }
    }
}
import { prisma } from "../../../../generated/prisma-client";
// import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const userProfile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return {
                user: userProfile,
                posts
            };
        }
    }
};

import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async (_, args, { request }) => {
            const { email } = args;
            const loginSecret = generateSecret();
            console.log(request)
            try {
                // throw Error();
                // await sendSecretMail(email, loginSecret);
                console.log(email, loginSecret)
                await prisma.updateUser({ data: { loginSecret }, where: { email } });
                return true;
            } catch {
                return false;
            }
        }
    }
};

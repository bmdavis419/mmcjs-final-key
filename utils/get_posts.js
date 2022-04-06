import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";

// this method will get all of the todos for the user
const handler = async (req, res) => {
  // init db session
  const prisma = new PrismaClient();

  // get the user id from session
  const session = getSession(req, res);
  const uid = session.user.sub;

  // get or add user from database
  const findUser = await prisma.user.findFirst({
    where: {
      id: uid,
    },
    include: {
      posts: false,
    },
  });

  // create if not exist
  if (!findUser) {
    await prisma.user.create({
      data: {
        id: uid,
      },
    });
  }

  // get all posts
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });
  res.status(200).json([...posts]);
};

export default handler;

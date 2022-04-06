import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";

// this method will create a new todo and save it to the DB
const handler = async (req, res) => {
  // init db session
  const prisma = new PrismaClient();

  // get the user id from session
  const session = getSession(req, res);
  const uid = session.user.sub;

  // update the user by creating a nested post
  const user = await prisma.user.update({
    where: {
      id: uid,
    },
    data: {
      posts: {
        createMany: {
          data: [{ ...req.body }],
        },
      },
    },
    include: {
      posts: true,
    },
  });

  res.status(201).json({ ...user.posts[user.posts.length - 1] });
};

export default handler;

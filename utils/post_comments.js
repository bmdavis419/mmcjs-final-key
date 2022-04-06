import { PrismaClient } from "@prisma/client";
import { getSession } from "@auth0/nextjs-auth0";

// this method will create a new todo and save it to the DB
const handler = async (req, res) => {
  // init db session
  const prisma = new PrismaClient();

  // get the user id from session
  const session = getSession(req, res);
  const uid = session.user.sub;

  // get the post id
  const { post_id } = req.query;

  // update the user by creating a nested post
  const post = await prisma.post.update({
    where: {
      id: parseInt(post_id),
    },
    data: {
      comments: {
        createMany: {
          data: [{ ...req.body }],
        },
      },
    },
    include: {
      comments: true,
    },
  });

  res.status(201).json({ ...post.comments[post.comments.length - 1] });
};

export default handler;

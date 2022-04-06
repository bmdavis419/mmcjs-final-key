import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import post_posts from "../../utils/post_posts";
import get_posts from "../../utils/get_posts";

// CAN VIEW POSTS AT: npx prisma studio

// function to contain all of the methods for todos
export default withApiAuthRequired(async function handler(req, res) {
  if (req.method == "POST") {
    await post_posts(req, res);
  } else if (req.method == "GET") {
    await get_posts(req, res);
  } else {
    res.status(404).send("endpoint not found");
  }
});

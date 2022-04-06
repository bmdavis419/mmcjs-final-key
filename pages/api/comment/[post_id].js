import post_comments from "../../../utils/post_comments";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
  await post_comments(req, res);
});

import type { JSONResponse } from "../../types/jsonResponse";
import type { NextApiRequest, NextApiResponse } from "next";

import mailClient from "../../lib/mailClient";

/**
 * Handler for "Say Hello" form.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JSONResponse>
) {
  // Light server-side validation.
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res
      .status(400)
      .json(makeResponse(false, "Missing required fields."));
  }

  // On the blacklist. Just tell them you sent it...
  if (process.env.BLACKLIST.includes(req.body.email)) {
    return res.status(202).json(makeResponse(true, "Message Sent!"));
  }

  // Honeypot caught something.
  if (req.body.phone) {
    return res
      .status(202)
      .json(makeResponse(false, "Failed to send. Are you by chance a 🤖?"));
  }

  const text = `
    Name: ${req.body.name}\n\n
    Email: ${req.body.email}\n\n
    Message: ${req.body.message}
  `;

  const result = await mailClient
    .sendMail({
      from: '"KevinRuffe.com" <noreply@kevinruffe.com>',
      to: "kevinjruffe@gmail.com",
      subject: "Message from 'Say Hello' Form",
      text,
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(console.error);

  const sent = Boolean(result && result.accepted.length);

  return res
    .status(202)
    .json(
      makeResponse(
        sent,
        sent ? "Message Sent!" : "Server Error! Unable to Send."
      )
    );
}

/**
 * Helper function for building a JSONResponse.
 */
function makeResponse(sent: boolean, message: string): JSONResponse {
  return { sent, message };
}

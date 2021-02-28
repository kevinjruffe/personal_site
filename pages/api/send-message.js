import mailClient from "../../lib/mailClient";

/**
 * Handler for "Say Hello" form.
 */
export default async function handler(req, res) {
  // Light server-side validation.
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).json({
      sent: false,
      message: "Missing required fields.",
    });
  }

  // On the blacklist. Just tell them you sent it...
  if (process.env.BLACKLIST.includes(req.body.email)) {
    return res.status(202).json({
      sent: true,
      message: "Message Sent!",
    });
  }

  // Honeypot caught something.
  if (req.body.phone) {
    return res.status(202).json({
      sent: false,
      message: "Failed to send. Are you by chance a 🤖?",
    });
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

  const sent = Boolean(result.accepted.length);

  res.status(202).json({
    sent,
    message: sent ? "Message Sent!" : "Server Error! Unable to Send.",
  });
}

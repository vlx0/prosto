import nodemailer from "nodemailer";
import { content } from "@/content";

export async function sendCodeMail(to: string, code: string) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  if (!host || !from) return false;

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });

  await transporter.sendMail({
    from,
    to,
    subject: content.apply.mailSubject,
    text: content.apply.mailBody.replace("{code}", code),
  });
  return true;
}

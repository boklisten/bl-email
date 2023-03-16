import { EmailAttachment } from "./email-attachment";
import { EmailTextBlock } from "./email-text-block";

export type EmailSetting = {
  userId: string;
  toEmail: string;
  fromEmail: string;
  subject: string;
  userFullName?: string;
  blMessageId?: string;
  attachments?: EmailAttachment[];
  textBlocks?: EmailTextBlock[];
};

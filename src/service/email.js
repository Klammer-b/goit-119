import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'node:fs';
import path from 'node:path';
import { getEnvVar } from '../helper/getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';
import { TEMPLATE_DIR } from '../constants/path.js';

const client = nodemailer.createTransport({
  host: getEnvVar(ENV_VARS.SMTP_HOST),
  port: getEnvVar(ENV_VARS.SMTP_PORT),
  secure: true,
  auth: {
    user: getEnvVar(ENV_VARS.SMTP_USER),
    pass: getEnvVar(ENV_VARS.SMTP_PASSWORD),
  },
});

const resetPasswordEmailTemplate = fs
  .readFileSync(path.join(TEMPLATE_DIR, 'request-reset-password-email.html'))
  .toString();

export const sendResetPasswordEmail = async (email, params) => {
  const template = Handlebars.compile(resetPasswordEmailTemplate);
  const html = template({
    username: '<script>console.log("Hello world!")</script>',
    resetUrl: `${getEnvVar(ENV_VARS.FRONTEND_DOMAIN)}/reset-password?token=${params.token}`,
  });

  await client.sendMail({
    to: email,
    subject: 'Reset your password!',
    from: 'borys.meshkov@ukr.net',
    html,
  });
};

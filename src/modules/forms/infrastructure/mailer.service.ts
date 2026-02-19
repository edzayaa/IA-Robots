import type { SendMailOptions } from 'nodemailer';
import { SmtpMailerHelper } from '#shared/email/smtp-mailer.helper.js';
import { emailConfig } from '#config/email.js';
import { buildIaRobotsEmailTemplate } from '#shared/email/templates/ia-robots.template.js';
import type { ContactFormEmailData, DemoRequestEmailData } from '../application/dto/forms.dto.js';

export class MailerService {
    constructor(private readonly smtpMailerHelper: SmtpMailerHelper) { }

    async sendMail(mailOptions: SendMailOptions, rateLimitKey?: string): Promise<void> {
        await this.smtpMailerHelper.send(mailOptions, {
            rateLimitKey
        });
    }

    async sendContactFormEmail(data: ContactFormEmailData): Promise<void> {
        const subject = `New contact submitted to IA Robots - ${data.name}`;
        const html = buildIaRobotsEmailTemplate({
            title: 'New contact from web form',
            subtitle: 'IA Robots',
            rows: [
                { label: 'Name', value: data.name },
                { label: 'Job', value: data.job },
                { label: 'Email', value: data.email },
                { label: 'Phone', value: data.phone },
                { label: 'Message', value: data.message }
            ]
        });

        const text = [
            'New contact from web form',
            `Name: ${data.name}`,
            `Job: ${data.job}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone}`,
            `Message: ${data.message}`
        ].join('\n');

        await this.sendMail(
            {
                to: emailConfig.contactEmailTo,
                replyTo: data.email,
                subject,
                text,
                html
            },
            `forms:contact:${data.email.toLowerCase()}`
        );
    }

    async sendRequestDemoEmail(data: DemoRequestEmailData): Promise<void> {
        const subject = `New demo request submitted to IA Robots - ${data.name}`;
        const html = buildIaRobotsEmailTemplate({
            title: 'New demo request from web form',
            subtitle: 'IA Robots',
            rows: [
                { label: 'Name', value: data.name },
                { label: 'Company', value: data.company },
                { label: 'Email', value: data.email },
                { label: 'Country', value: data.country },
                { label: 'Industry', value: data.industry },
                { label: 'Robots of Interest', value: data.robotsOfInterest.join(', ') }
            ]
        });

        const text = [
            'New demo request from web form',
            `Name: ${data.name}`,
            `Company: ${data.company}`,
            `Email: ${data.email}`,
            `Country: ${data.country}`,
            `Industry: ${data.industry}`,
            `Robots of Interest: ${data.robotsOfInterest.join(', ')}`
        ].join('\n');

        await this.sendMail(
            {
                to: emailConfig.contactEmailTo,
                replyTo: data.email,
                subject,
                text,
                html
            },
            `forms:demo-request:${data.email.toLowerCase()}`
        );
    }
}
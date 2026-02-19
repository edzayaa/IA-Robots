interface TemplateRow {
    label: string;
    value: string;
}

interface IaRobotsTemplateInput {
    title: string;
    subtitle?: string;
    rows: TemplateRow[];
    reference?: string;
    submittedAt?: string;
}

const escapeHtml = (value: string): string => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const normalizeLabel = (label: string): string => label.trim().toLowerCase();

const formatMultiline = (value: string): string => escapeHtml(value).replaceAll('\n', '<br/>');

const isMessageLabel = (label: string): boolean => {
    const value = normalizeLabel(label);
    return value === 'message' || value === 'mensaje';
};

const buildDynamicRows = (rows: TemplateRow[]): string => {
    if (rows.length === 0) {
        return `
          <div style="font-size:14px;color:#94a3b8;font-family:Arial,sans-serif;">No additional fields.</div>
        `;
    }

    return rows
        .map((row) => `
          <div style="margin-bottom:12px;">
            <div class="label">${escapeHtml(row.label)}</div>
            <div class="value">${formatMultiline(row.value)}</div>
          </div>
        `)
        .join('');
};

const defaultReference = (): string => `CI-${Date.now().toString().slice(-6)}`;

export const buildIaRobotsEmailTemplate = ({
    title,
    subtitle,
    rows,
    reference,
    submittedAt
}: IaRobotsTemplateInput): string => {
    const safeTitle = escapeHtml(title);
    const safeSubtitle = escapeHtml(subtitle ?? 'IA Robots');
    const safeReference = escapeHtml(reference ?? defaultReference());
    const safeSubmittedAt = escapeHtml(
        submittedAt ?? new Date().toLocaleString('es-ES', { hour12: false })
    );

    const messageRow = rows.find((row) => isMessageLabel(row.label));
    const senderMessage = messageRow ? formatMultiline(messageRow.value) : '';
    const detailRows = rows.filter((row) => !isMessageLabel(row.label));
    const dynamicRows = buildDynamicRows(detailRows);

    return `
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>${safeTitle}</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f8fafc;
      }
      .mail-shell {
        width: 100%;
        padding: 24px 12px;
        box-sizing: border-box;
      }
      .mail-card {
        max-width: 760px;
        margin: 0 auto;
        border-radius: 24px;
        overflow: hidden;
        background: radial-gradient(circle at top right, #1e293b, #0a0a0c 60%);
        border: 1px solid #1f2937;
      }
      .label {
        font-size: 12px;
        color: #94a3b8;
        font-family: Arial, sans-serif;
        margin-bottom: 4px;
      }
      .value {
        font-size: 18px;
        color: #e2e8f0;
        font-family: Arial, sans-serif;
      }
      .message-box {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
      }
      @media (max-width: 720px) {
        .two-col,
        .two-col > tbody,
        .two-col > tbody > tr,
        .two-col > tbody > tr > td {
          display: block !important;
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="mail-shell">
      <tr>
        <td>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="mail-card">
            <tr>
              <td style="padding:24px 28px 12px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <div style="font-size:12px;color:#94a3b8;letter-spacing:1.4px;text-transform:uppercase;font-family:Arial,sans-serif;">New Inquiry Received</div>
                      <div style="font-size:14px;line-height:1.5;font-family:Arial,sans-serif;color:#64748b;margin-top:6px;">${safeSubtitle}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:8px 28px 0 28px;">
                <h1 style="margin:0 0 6px 0;color:#ffffff;font-size:34px;line-height:1.2;font-family:Arial,sans-serif;">${safeTitle}</h1>
                <p style="margin:0;color:#94a3b8;font-size:15px;line-height:1.5;font-family:Arial,sans-serif;">A new message has been submitted via the website.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 28px 18px 28px;">
                <h3 style="margin:0 0 14px 0;color:#3b82f6;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;font-family:Arial,sans-serif;">Form Data</h3>
                ${dynamicRows}
              </td>
            </tr>

            ${messageRow
                ? `
            <tr>
              <td style="padding:0 28px 24px 28px;">
                <h3 style="margin:0 0 12px 0;color:#3b82f6;font-size:12px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;font-family:Arial,sans-serif;">Message</h3>
                <div class="message-box" style="padding:20px;">
                  <p style="margin:0;color:#cbd5e1;font-size:17px;line-height:1.7;font-family:Arial,sans-serif;">${senderMessage}</p>
                </div>
              </td>
            </tr>
            `
                : ''}

            <tr>
              <td style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="font-size:12px;line-height:1.4;color:#94a3b8;font-family:Arial,sans-serif;">IA Robots · Contact Notification</td>
                    <td align="right" style="font-size:12px;line-height:1.4;color:#64748b;font-family:Arial,sans-serif;">Submitted on ${safeSubmittedAt}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
};
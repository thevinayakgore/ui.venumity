// app/actions/send-feedback.ts
"use server";

import nodemailer from "nodemailer";

function getFormattedDateTime(): string {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} | ${hours}:${minutes} ${ampm}`;
}

function getUserDetails(ua: string, ip?: string): string {
  const u = ua.toLowerCase();
  const device = /mobile|android|iphone|ipod/i.test(u)
    ? "Mobile"
    : /tablet|ipad/i.test(u)
      ? "Tablet"
      : "Desktop";
  const os = /windows/i.test(u)
    ? "Windows"
    : /android/i.test(u)
      ? "Android"
      : /iphone|ipad|ios/i.test(u)
        ? "iOS"
        : /mac/i.test(u)
          ? "macOS"
          : /linux/i.test(u)
            ? "Linux"
            : "Unknown OS";
  const browser =
    /chrome/i.test(u) && !/edg/i.test(u)
      ? "Chrome"
      : /safari/i.test(u) && !/chrome/i.test(u)
        ? "Safari"
        : /firefox/i.test(u)
          ? "Firefox"
          : /edg/i.test(u)
            ? "Edge"
            : "Unknown";
  const location =
    ip && !ip.startsWith("::1") && !ip.startsWith("127.")
      ? `IP: ${ip}`
      : "Location unknown";
  return `${location} | ${device} (${os}, ${browser})`;
}

export async function sendFeedbackEmail(formData: FormData) {
  try {
    // Extract data from FormData
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const rating = parseInt(formData.get("rating") as string);
    const sitePageUrl = formData.get("sitePageUrl") as string;
    const userAgent = formData.get("userAgent") as string;
    const ip = formData.get("ip") as string;
    const referer = formData.get("referer") as string;

    // Validate required fields
    if (!username?.trim()) {
      return {
        success: false,
        message: "Username is required.",
      };
    }

    if (!message?.trim()) {
      return {
        success: false,
        message: "Message is required.",
      };
    }

    // Validate email only if provided
    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return {
          success: false,
          message: "Please enter a valid email address.",
        };
      }
    }

    if (!rating || rating < 1 || rating > 5) {
      return {
        success: false,
        message: "Valid rating is required (1-5 stars).",
      };
    }

    const dateTime = getFormattedDateTime();
    const userDetails = getUserDetails(userAgent, ip);

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error(
        "Email credentials not configured. Check your .env.local file.",
      );
      return {
        success: false,
        message: "Email service is not configured. Please contact support.",
      };
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("Email transporter verification failed:", verifyError);
      return {
        success: false,
        message: "Email service configuration is invalid.",
      };
    }

    // Create star rating string
    const starString = "★".repeat(rating) + "☆".repeat(5 - rating);

    // Absolute URL for the banner image from the public folder
    const bannerUrl = "https://ui.venumity.com/banner.png";

    // Email content
    const mailOptions = {
      from: `"Venumity UI Feedback" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `✨ New Feedback: ${rating}⭐ from ${username}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Feedback</title>
          <style>
            /* Reset styles */
            body, html {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background-color: #f4f6f9;
              line-height: 1.6;
              color: #1a202c;
            }
            
            .email-container {
              max-width: 620px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);
            }

            /* Banner Image */
            .banner-image {
              width: 100%;
              height: auto;
              display: block;
              background-color: #2563eb; /* Fallback color if image fails to load */
            }
            
            /* Header */
            .header {
              background: #ffffff;
              padding: 32px 40px 24px;
              text-align: center;
              border-bottom: 1px solid #f1f5f9;
            }
            
            .header-icon {
              font-size: 42px;
              margin-bottom: 8px;
              display: inline-block;
              background: #f8fafc;
              padding: 12px;
              border-radius: 50%;
              box-shadow: 0 4px 6px rgba(0,0,0,0.02);
            }
            
            .header h1 {
              color: #0f172a;
              margin: 0;
              font-size: 26px;
              font-weight: 800;
              letter-spacing: -0.5px;
            }
            
            .header p {
              color: #64748b;
              margin: 8px 0 0;
              font-size: 16px;
              font-weight: 500;
            }
            
            /* Rating Section */
            .rating-section {
              background: linear-gradient(to right, #fef9e7, #fdf4d6);
              padding: 24px 40px;
              text-align: center;
              border-bottom: 1px solid #f0e6d0;
            }
            
            .rating-stars {
              font-size: 38px;
              letter-spacing: 4px;
              color: #fbbf24;
              display: block;
              margin-bottom: 8px;
              text-shadow: 0 2px 4px rgba(251, 191, 36, 0.2);
            }
            
            .rating-text {
              font-size: 14px;
              color: #92400e;
              font-weight: 700;
              background: rgba(251, 191, 36, 0.2);
              padding: 6px 18px;
              border-radius: 20px;
              display: inline-block;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            /* Content */
            .content {
              padding: 32px 40px 24px;
            }
            
            .feedback-item {
              margin-bottom: 20px;
              padding: 16px 20px;
              background: #f8fafc;
              border-radius: 12px;
              border-left: 4px solid #2563eb;
              transition: all 0.2s;
            }
            
            .feedback-item:last-child {
              margin-bottom: 0;
            }
            
            .feedback-label {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #64748b;
              margin-bottom: 6px;
              display: flex;
              align-items: center;
              gap: 6px;
            }
            
            .feedback-label .icon {
              font-size: 14px;
            }
            
            .feedback-value {
              font-size: 15px;
              color: #0f172a;
              word-wrap: break-word;
              font-weight: 500;
            }
            
            .feedback-value a {
              color: #2563eb;
              text-decoration: none;
              font-weight: 600;
              border-bottom: 1px solid transparent;
              transition: border-color 0.2s;
            }
            
            .feedback-value a:hover {
              border-bottom-color: #2563eb;
            }
            
            .message-content {
              background: #ffffff;
              padding: 16px 20px;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
              font-size: 15px;
              line-height: 1.7;
              color: #334155;
              white-space: pre-wrap;
              box-shadow: inset 0 2px 4px rgba(0,0,0,0.01);
            }
            
            /* Metadata */
            .metadata {
              margin-top: 32px;
              padding-top: 24px;
              border-top: 2px dashed #e2e8f0;
            }
            
            .metadata-title {
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #64748b;
              margin-bottom: 16px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            
            .metadata-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }
            
            .metadata-item {
              background: #f1f5f9;
              padding: 12px 16px;
              border-radius: 8px;
              font-size: 13px;
              border: 1px solid #e2e8f0;
            }
            
            .metadata-item .label {
              font-size: 10px;
              font-weight: 700;
              text-transform: uppercase;
              color: #64748b;
              display: block;
              letter-spacing: 0.5px;
            }
            
            .metadata-item .value {
              color: #0f172a;
              margin-top: 4px;
              word-break: break-all;
              font-weight: 500;
            }
            
            /* Footer */
            .footer {
              background: #f8fafc;
              padding: 32px 40px;
              text-align: center;
              border-top: 1px solid #e2e8f0;
            }
            
            .footer .brand {
              font-size: 18px;
              font-weight: 800;
              color: #0f172a;
              letter-spacing: -0.5px;
            }
            
            .footer .brand span {
              color: #2563eb;
            }
            
            .footer .tagline {
              font-size: 14px;
              color: #64748b;
              margin-top: 6px;
            }
            
            .footer .action-buttons {
              margin-top: 20px;
            }
            
            .footer .action-buttons a {
              display: inline-block;
              padding: 12px 28px;
              background: #2563eb;
              color: #ffffff;
              text-decoration: none;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 600;
              transition: background 0.2s, transform 0.1s;
              box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
            }
            
            .footer .action-buttons a:hover {
              background: #1d4ed8;
            }
            
            .footer .meta-info {
              font-size: 12px;
              color: #94a3b8;
              margin-top: 24px;
            }
            
            .footer .meta-info a {
              color: #2563eb;
              text-decoration: none;
              font-weight: 500;
            }
            
            /* Responsive */
            @media (max-width: 600px) {
              .email-container {
                margin: 0;
                border-radius: 0;
              }
              
              .header {
                padding: 24px 20px;
              }
              
              .header h1 {
                font-size: 22px;
              }
              
              .content {
                padding: 24px 20px;
              }
              
              .rating-section {
                padding: 20px;
              }
              
              .rating-stars {
                font-size: 32px;
              }
              
              .metadata-grid {
                grid-template-columns: 1fr;
              }
              
              .footer {
                padding: 24px 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <img src="${bannerUrl}" alt="Venumity UI" class="banner-image" />

            <div class="header">
              <div class="header-icon">🎉</div>
              <h1>New Feedback Received</h1>
              <p>Someone just shared their thoughts with you</p>
            </div>
            
            <div class="rating-section">
              <span class="rating-stars">${starString}</span>
              <span class="rating-text">${rating} out of 5 stars</span>
            </div>
            
            <div class="content">
              <div class="feedback-item">
                <div class="feedback-label">
                  <span class="icon">👤</span> Username
                </div>
                <div class="feedback-value">${username}</div>
              </div>
              
              ${
                email && email.trim()
                  ? `
              <div class="feedback-item">
                <div class="feedback-label">
                  <span class="icon">📧</span> Email
                </div>
                <div class="feedback-value">
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              `
                  : `
              <div class="feedback-item" style="border-left-color: #94a3b8; opacity: 0.7;">
                <div class="feedback-label">
                  <span class="icon">📧</span> Email
                </div>
                <div class="feedback-value" style="color: #94a3b8;">Not provided</div>
              </div>
              `
              }
              
              <div class="feedback-item" style="border-left-color: #7c3aed;">
                <div class="feedback-label">
                  <span class="icon">💬</span> Message
                </div>
                <div class="message-content">${message.replace(/\n/g, "<br>")}</div>
              </div>
              
              <div class="feedback-item" style="border-left-color: #059669;">
                <div class="feedback-label">
                  <span class="icon">🌐</span> Page URL
                </div>
                <div class="feedback-value">
                  <a href="${sitePageUrl}" target="_blank">${sitePageUrl}</a>
                </div>
              </div>
              
              <div class="feedback-item" style="border-left-color: #d97706;">
                <div class="feedback-label">
                  <span class="icon">📅</span> Date & Time
                </div>
                <div class="feedback-value">${dateTime}</div>
              </div>
              
              <div class="metadata">
                <div class="metadata-title">
                  <span>🔍</span> Technical Details
                </div>
                <div class="metadata-grid">
                  <div class="metadata-item">
                    <span class="label">Device</span>
                    <span class="value">${userDetails.split(" | ")[1]?.split(" (")[0] || "Unknown"}</span>
                  </div>
                  <div class="metadata-item">
                    <span class="label">OS</span>
                    <span class="value">${userDetails.match(/\(([^)]+)\)/)?.[1]?.split(", ")[0] || "Unknown"}</span>
                  </div>
                  <div class="metadata-item">
                    <span class="label">Browser</span>
                    <span class="value">${userDetails.match(/\(([^)]+)\)/)?.[1]?.split(", ")[1] || "Unknown"}</span>
                  </div>
                  ${
                    ip && ip !== "unknown"
                      ? `
                  <div class="metadata-item">
                    <span class="label">IP Address</span>
                    <span class="value">${ip}</span>
                  </div>
                  `
                      : ""
                  }
                  ${
                    referer
                      ? `
                  <div class="metadata-item" style="grid-column: 1 / -1;">
                    <span class="label">Referer</span>
                    <span class="value" style="word-break: break-all;">${referer}</span>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
            
            <div class="footer">
              <div class="brand">
                UI <span>Venumity</span>
              </div>
              <div class="tagline">Building better experiences, one piece of feedback at a time</div>
              <div class="action-buttons">
                <a href="https://ui.venumity.com/" target="_blank">View Live Page</a>
              </div>
              <div class="meta-info">
                This email was sent from <a href="https://ui.venumity.com" target="_blank">ui.venumity.com</a> · Feedback System v1.1
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        ✨ New Feedback Received
        ════════════════════════════════════════
        
        Rating: ${rating}/5 ⭐
        ${starString}
        
        ─── Feedback Details ──────────────────
        
        👤 Username: ${username}
        ${email && email.trim() ? `📧 Email: ${email}` : "📧 Email: Not provided"}
        💬 Message: ${message}
        🌐 Page: ${sitePageUrl}
        📅 Date: ${dateTime}
        
        ─── Technical Details ──────────────────
        
        ${userDetails}
        ${ip && ip !== "unknown" ? `IP: ${ip}` : ""}
        ${referer ? `Referer: ${referer}` : ""}
        User Agent: ${userAgent}
        
        ────────────────────────────────────────
        Venumity UI · Building better experiences
        https://ui.venumity.com
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Feedback sent successfully!",
    };
  } catch (error) {
    console.error("Error sending feedback email:", error);
    return {
      success: false,
      message: "Failed to send feedback. Please try again.",
    };
  }
}

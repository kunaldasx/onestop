import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const result = insertContactSchema.safeParse(body);

		if (!result.success) {
			const validationError = fromZodError(result.error);
			return NextResponse.json(
				{ error: validationError.message },
				{ status: 400 }
			);
		}

		const data = result.data;

		const contact = await storage.createContactSubmission(data);

		const resend = new Resend(process.env.RESEND_API_KEY);

		// -------------------------------
		// 1. EMAIL TO SUPPORT TEAM
		// -------------------------------

		await resend.emails.send({
			from: "Onestop Notifications <no-reply@yourdomain.com>",
			to: process.env.SUPPORT_EMAIL!, // e.g. support@onestop.com
			subject: "🔔 New Contact Form Submission",
			html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company ?? "N/A"}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
        <br/>
        <p><i>Submitted at: ${new Date().toISOString()}</i></p>
      `,
		});

		// -------------------------------
		// 2. CONFIRMATION EMAIL TO USER
		// -------------------------------

		await resend.emails.send({
			from: "Onestop Support <no-reply@yourdomain.com>",
			to: data.email,
			subject: "Thanks for contacting Onestop!",
			html: `
        <h2>Hi ${data.name},</h2>
        <p>Thanks for reaching out! We’ve received your message and our team will get back to you shortly.</p>

        <p><strong>Your message:</strong></p>
        <blockquote>${data.message}</blockquote>

        <p>If this wasn’t you, feel free to ignore this email.</p>
        <br/>
        <p>— The Onestop Team</p>
      `,
		});

		return NextResponse.json(
			{
				message: "Contact submission received successfully",
				id: contact.id,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating contact submission:", error);
		return NextResponse.json(
			{ error: "Failed to submit contact form" },
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		const submissions = await storage.getContactSubmissions();
		return NextResponse.json(submissions);
	} catch (error) {
		console.error("Error fetching contact submissions:", error);
		return NextResponse.json(
			{ error: "Failed to fetch contact submissions" },
			{ status: 500 }
		);
	}
}

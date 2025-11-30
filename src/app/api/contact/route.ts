import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

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

    const contact = await storage.createContactSubmission(result.data);
    
    return NextResponse.json(
      { message: "Contact submission received successfully", id: contact.id },
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

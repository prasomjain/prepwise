import { db } from "@/firebase/admin";

export async function GET() {
  try {
    // Try to write a test document
    const testDoc = {
      role: "Test Role",
      type: "technical",
      level: "mid",
      techstack: ["JavaScript", "React"],
      questions: ["Test question 1", "Test question 2"],
      userId: "test-user",
      finalized: true,
      createdAt: new Date().toISOString(),
    };

    console.log("[Debug] Attempting to write test interview...");
    const docRef = await db.collection("interviews").add(testDoc);
    console.log(
      "[Debug] Successfully created test interview with ID:",
      docRef.id
    );

    // Try to read it back
    const doc = await docRef.get();
    console.log("[Debug] Read back document:", doc.data());

    return Response.json({
      success: true,
      message: "Test document created successfully",
      docId: docRef.id,
    });
  } catch (error) {
    console.error("[Error] Failed to write test document:", error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const RATE_LIMIT_COOKIE = "shoutout_last";
const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => null);

    if (!body) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { message, handle, company } = body as {
        message?: string;
        handle?: string;
        company?: string; // honeypot
    };

    // Honeypot: real users never fill this hidden field.
    // Pretend success so bots don't learn anything, but skip the DB write
    // and don't burn the rate-limit cookie on a real visitor's behalf.
    if (company) {
        return NextResponse.json({ ok: true });
    }

    const trimmedMessage = message?.trim() ?? "";
    const trimmedHandle = handle?.trim() ?? "";

    if (!trimmedMessage || trimmedMessage.length > 500) {
        return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    if (trimmedHandle.length > 120) {
        return NextResponse.json({ error: "Invalid handle" }, { status: 400 });
    }

    const lastSubmission = req.cookies.get(RATE_LIMIT_COOKIE)?.value;
    if (lastSubmission && Date.now() - Number(lastSubmission) < RATE_LIMIT_MS) {
        return NextResponse.json(
            { error: "Please wait a bit before sending another." },
            { status: 429 },
        );
    }

    await prisma.shoutout.create({
        data: {
            message: trimmedMessage,
            handle: trimmedHandle || null,
        },
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(RATE_LIMIT_COOKIE, String(Date.now()), {
        httpOnly: true,
        sameSite: "lax",
        maxAge: RATE_LIMIT_MS / 1000,
    });

    return res;
}
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getOrdinal(n: number) {
    const mod10 = n % 10;
    const mod100 = n % 100;

    let suffix = "th";

    if (mod10 === 1 && mod100 !== 11) suffix = "st";
    else if (mod10 === 2 && mod100 !== 12) suffix = "nd";
    else if (mod10 === 3 && mod100 !== 13) suffix = "rd";

    return `${n.toLocaleString()}${suffix}`;
}

function getVisitorMessage(count: number) {
    return getOrdinal(count);
}

export async function GET(req: NextRequest) {
    const seen = req.cookies.get("visitor_seen")?.value;

    let row = await prisma.visitorCounter.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            count: 0,
        },
    });

    if (seen === "true") {
        return NextResponse.json({
            count: row.count,
            message: getVisitorMessage(row.count),
        });
    }

    row = await prisma.visitorCounter.update({
        where: { id: 1 },
        data: {
            count: {
                increment: 1,
            },
        },
    });

    const res = NextResponse.json({
        count: row.count,
        message: getVisitorMessage(row.count),
    });

    res.cookies.set("visitor_seen", "true", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
    });

    return res;
}
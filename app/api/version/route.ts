import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    now: new Date().toISOString(),
    vercelEnv: process.env.VERCEL_ENV || null,
    gitCommit: process.env.VERCEL_GIT_COMMIT_SHA || null,
    gitMessage: process.env.VERCEL_GIT_COMMIT_MESSAGE || null,
    gitRepo: process.env.VERCEL_GIT_REPO_SLUG || null,
    gitBranch: process.env.VERCEL_GIT_COMMIT_REF || null,
  });
}
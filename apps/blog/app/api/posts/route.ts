import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

import { CreatePostDTO, DatabaseStructure, Post } from "@/types";

const dataFilePath = path.join(process.cwd(), "data/db.json");

export async function readData(): Promise<DatabaseStructure> {
  const data = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(data);
}

export async function writeData(data: DatabaseStructure): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreatePostDTO = await request.json();
    const data = await readData();

    const newPost: Post = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.posts.unshift(newPost);
    await writeData(data);

    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}

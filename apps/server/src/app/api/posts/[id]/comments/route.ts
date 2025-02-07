import { NextRequest, NextResponse } from 'next/server';

import { Comment, CreateCommentDTO } from '@/types';
import { readData, writeData } from '@/utils';

/**
 * @swagger
 * /posts/{id}/comments:
 *   get:
 *     tags: ['Comments']
 *     summary: 게시글의 댓글 목록 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글을 조회할 게시글의 ID
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await readData();
    const { id } = await params;
    const comments = data.comments.filter(c => c.postId === id);
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

/**
 * @swagger
 * /posts/{id}/comments:
 *   post:
 *     tags: ['Comments']
 *     summary: 새 댓글 작성
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글을 작성할 게시글의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentDTO'
 *     responses:
 *       200:
 *         description: 댓글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body: CreateCommentDTO = await request.json();
    const data = await readData();
    const { id } = await params;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId: id,
      ...body,
      createdAt: new Date().toISOString(),
    };

    data.comments.unshift(newComment);
    await writeData(data);

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Failed to create comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

import { Response } from 'express';

export function AppResponse 
(res: Response, statusCode: number = 200, data: Record<string, string[]> | unknown | any | string | null, message: string) {
  return res.status(statusCode).json({
    status: 'success',
    message: message ?? "Operation successful",
    data: data ?? null,
  });
}
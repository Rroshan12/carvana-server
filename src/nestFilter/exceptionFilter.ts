// src/common/filters/database-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { exceptions } from 'src/database/model/exceptions';

@Catch()
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor(@Inject('DB') private db: any) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any).message || 'Internal server error';

    const stack = (exception as any).stack || null;

    // Save to database using Drizzle
    try {
      await this.db.insert(exceptions).values({
        message: typeof message === 'string' ? message : JSON.stringify(message),
        stack,
        status: status.toString(),
        path: request.url,
        method: request.method,
      });
    } catch (dbError) {
      console.error('Failed to log exception to DB', dbError);
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      method: request.method,
      message,
    });
  }
}

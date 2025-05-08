import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
    // Filtrar as mensagems de exceções
    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const errorResponse = exception.getResponse();

        response.status(status).json({
            statusCode: status,
            message: errorResponse !== '' ? errorResponse : 'Erro ao realizar esta operação.',
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        });

    }
}
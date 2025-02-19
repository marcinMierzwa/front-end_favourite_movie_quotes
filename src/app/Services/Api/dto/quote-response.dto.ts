import { QuoteResponseDataDto } from "./quote-response-data.dto";

export interface QuoteResponseDto {
    data: QuoteResponseDataDto[];
    message: string;
    pageIndex: number;
    pageSize: number;
    totalItems: number;
  }
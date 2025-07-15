import { QuoteResponseDataDto } from "./quote-response-data.dto";

export interface QuoteResponseDto {
    data: QuoteResponseDataDto[];
    pageIndex: number;
    pageSize: number;
    totalItems: number;
  }
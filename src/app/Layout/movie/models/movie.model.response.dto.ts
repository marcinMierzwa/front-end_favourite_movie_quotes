export interface MovieDataResponse {
  data: MovieResponseDto
}

interface MovieResponseDto {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
  directedBy: string;
  produceddBy: string;
  musicBy: string;
  productionCompanies: string;
  distributedBy: string;
  runtimeInMinutes: number;
  budgetInMillions: number;
  boxOfficeRevenueInMillions: number;
  academyAwardNominations: number;
  academyAwardWins: number;
  rottenTomatoesScore: number;
}

export type APIErrorResponse = {
  type: "error";
  message: string;
  code?: number;
  details?: unknown;
};

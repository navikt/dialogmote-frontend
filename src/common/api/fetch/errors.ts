export class FetchNetworkError extends Error {
  override readonly name = "FetchNetworkError";
}

export class FetchResponseParseError extends Error {
  override readonly name = "FetchResponseParseError";
}

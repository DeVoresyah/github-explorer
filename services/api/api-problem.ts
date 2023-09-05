import { ApiResponse } from "apisauce";

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true; message?: string }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true; message?: string }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server"; message?: string }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized"; message?: string }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden"; message?: string }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found"; message?: string }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected"; message?: string }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true; message?: string }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data"; message?: string }
  /**
   * Canceled.
   */
  | { kind: "cancelled"; message?: string }
  /**
   * Unprocessable Entity
   */
  | { kind: "unprocessable"; message?: string };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: ApiResponse<any>
): GeneralApiProblem | void {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      alert("Connection not available.");
      return { kind: "cannot-connect", temporary: true };
    case "NETWORK_ERROR":
      alert("Network not available.");
      return { kind: "cannot-connect", temporary: true };
    case "TIMEOUT_ERROR":
      alert("Request timeout.");
      return { kind: "timeout", temporary: true };
    case "SERVER_ERROR":
      alert("Internal server error.");
      return { kind: "server" };
    case "UNKNOWN_ERROR":
      alert("Unknown error.");
      return { kind: "unknown", temporary: true };
    case "CLIENT_ERROR":
      if (response?.data?.data?.message) {
        alert(response?.data?.data?.message);
      }

      switch (response.status) {
        case 401:
          return {
            kind: "unauthorized",
            message: response?.data?.data?.message,
          };
        case 403:
          return { kind: "forbidden", message: response?.data?.data?.message };
        case 404:
          return { kind: "not-found", message: response?.data?.data?.message };
        case 422:
          return {
            kind: "unprocessable",
            message: response?.data?.data?.message,
          };
        default:
          return { kind: "rejected" };
      }
    case "CANCEL_ERROR":
      alert("Request cancelled.");
      return { kind: "cancelled" };
  }
  return;
}

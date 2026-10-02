import type { ErrorRequestHandler } from "express";
import { z } from "zod";
import { HttpError } from "../utils/HttpError.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  if (err instanceof z.ZodError) {
    res
      .status(400)
      .json({
        error: "Validation failed",
        details: z.flattenError(err).fieldErrors,
      });
    return;
  }

  // express.json() rejects broken JSON with its own 4xx status; pass that through
  if (typeof err?.status === "number" && err.expose) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};

import { describe, expect, it } from "vitest";

import { cn, formatDate } from "../src/lib/utils";

describe("formatDate", () => {
  it("formats an ISO date without timezone drift", () => {
    expect(formatDate("2025-06-01")).toBe("June 1, 2025");
  });

  it("formats end-of-year dates correctly", () => {
    expect(formatDate("2024-12-31")).toBe("December 31, 2024");
  });

  it("formats start-of-year dates correctly", () => {
    expect(formatDate("2024-01-01")).toBe("January 1, 2024");
  });
});

describe("cn", () => {
  it("merges tailwind classes with later values winning", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional classes", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});

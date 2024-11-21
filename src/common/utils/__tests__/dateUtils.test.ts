import {
  getFullDateFormat,
  getLongDateFormat,
  isDateInPast,
  minutesToMillis,
} from "../dateUtils";
import { afterAll, beforeAll, describe, expect, vi, it } from "vitest";

describe("dateUtils", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2020-02-02").getTime());
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  describe("getLongDateFormat", () => {
    it("should return long date format", () => {
      const formatedDate = getLongDateFormat(Date.now());

      expect(formatedDate).toBe("2. februar 2020");
    });
  });

  describe("getFullDateFormat", () => {
    it("should return full date format", () => {
      const formatedDate = getFullDateFormat(Date.now());

      expect(formatedDate).toBe("søndag 2. februar 2020");
    });
  });

  describe("isDateInPast", () => {
    it("should return true when date param is the past", () => {
      const pastDate = new Date("2010-02-02");

      expect(isDateInPast(pastDate)).toBe(true);
    });

    it("should return false when date param is present", () => {
      const presentDate = new Date();

      expect(isDateInPast(presentDate)).toBe(false);
    });

    it("should return false when date param is the future", () => {
      const futureDate = new Date("2021-02-02");

      expect(isDateInPast(futureDate)).toBe(false);
    });
  });

  describe("minuitoMillis", () => {
    it("should convert to millis from minutes", () => {
      const minutes = 60;

      expect(minutesToMillis(minutes)).toBe(3600000);
    });
  });
});

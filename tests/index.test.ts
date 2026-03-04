import { expect, test, describe } from "vitest";
import { isOnlyKanji, removes } from "../src/lib/utils/tuita";

describe("removes", () => {
  test("ユーザーメンションを除去", () => {
    expect(removes("<@123456789>漢字")).toBe("漢字");
  });

  test("ロールメンションを除去", () => {
    expect(removes("<@&987654321>漢字")).toBe("漢字");
  });

  test("チャンネルメンションを除去", () => {
    expect(removes("<#111222333>漢字")).toBe("漢字");
  });

  test("改行を除去", () => {
    expect(removes("漢字\n漢字")).toBe("漢字漢字");
  });

  test("全角・半角スペースを除去", () => {
    expect(removes("漢字　漢字 漢字")).toBe("漢字漢字漢字");
  });
});

describe("isOnlyKanji", () => {
  test("漢字のみ → true", () => {
    expect(isOnlyKanji("漢字")).toBe(true);
  });

  test("許可記号のみ → true", () => {
    expect(isOnlyKanji("！？。、")).toBe(true);
  });

  test("漢字＋許可記号 → true", () => {
    expect(isOnlyKanji("漢字！")).toBe(true);
  });

  test("ひらがな → false", () => {
    expect(isOnlyKanji("ひらがな")).toBe(false);
  });

  test("カタカナ → false", () => {
    expect(isOnlyKanji("カタカナ")).toBe(false);
  });

  test("英字 → false", () => {
    expect(isOnlyKanji("hello")).toBe(false);
  });

  test("漢字＋英字混在 → false", () => {
    expect(isOnlyKanji("漢字hello")).toBe(false);
  });

  test("メンションは除去されて漢字のみ → true", () => {
    expect(isOnlyKanji("<@123456789>漢字")).toBe(true);
  });

  test("空文字 → true", () => {
    expect(isOnlyKanji("")).toBe(true);
  });

  test("スペースのみ → true（除去後空文字）", () => {
    expect(isOnlyKanji("   ")).toBe(true);
  });
});

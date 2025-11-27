import { test, expect } from "@playwright/test";

test.describe("무한 스크롤 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ko");
    await page.waitForLoadState("networkidle");
  });

  test("스크롤 시 추가 DApp이 로드된다", async ({ page }) => {
    const initialItems = await page
      .locator('[class*="space-y-3"] > button')
      .count();

    expect(initialItems).toBeGreaterThan(0);

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForTimeout(1000);

    const afterScrollItems = await page
      .locator('[class*="space-y-3"] > button')
      .count();

    expect(afterScrollItems).toBeGreaterThan(initialItems);
  });

  test("로딩 인디케이터가 표시된다", async ({ page }) => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await expect(page.getByText(/Loading more/i)).toBeVisible({
      timeout: 2000,
    });
  });

  test("모든 데이터를 로드하면 완료 메시지가 표시된다", async ({ page }) => {
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForTimeout(500);
    }

    await expect(
      page.getByText(/모든 DApp을 불러왔습니다/i)
    ).toBeVisible({ timeout: 5000 });
  });
});


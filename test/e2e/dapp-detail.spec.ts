import { test, expect } from "@playwright/test";

test.describe("DApp 상세 보기", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ko");
    await page.waitForLoadState("networkidle");
  });

  test("DApp 클릭 시 바텀시트가 열린다", async ({ page }) => {
    const firstDApp = page.locator('[class*="space-y-3"] > button').first();
    await firstDApp.click();

    await expect(page.locator('[role="dialog"]')).toBeVisible();

    await expect(page.getByText("Description")).toBeVisible();
  });

  test("바텀시트에서 Go 버튼을 클릭하면 새 탭이 열린다", async ({
    page,
    context,
  }) => {
    const firstDApp = page.locator('[class*="space-y-3"] > button').first();
    await firstDApp.click();

    await expect(page.locator('[role="dialog"]')).toBeVisible();

    const pagePromise = context.waitForEvent("page");
    await page.getByRole("button", { name: "Go" }).click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    expect(newPage.url()).not.toBe(page.url());
  });

  test("바텀시트 외부 클릭 시 닫힌다", async ({ page }) => {
    const firstDApp = page.locator('[class*="space-y-3"] > button').first();
    await firstDApp.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    await page.locator('[class*="bg-black/40"]').click({ position: { x: 10, y: 10 } });

    await expect(dialog).not.toBeVisible({ timeout: 1000 });
  });
});


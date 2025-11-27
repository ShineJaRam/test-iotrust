import { test, expect } from "@playwright/test";

test.describe("DApp 검색 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ko");
    await page.waitForLoadState("networkidle");
  });

  test("검색창에 텍스트를 입력하면 결과가 필터링된다", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/검색/i);
    await searchInput.fill("Uniswap");

    await page.waitForTimeout(500);

    const dappItems = page.locator('[class*="space-y-3"] > button');
    const count = await dappItems.count();

    expect(count).toBeGreaterThan(0);

    const firstItem = dappItems.first();
    await expect(firstItem).toContainText("Uniswap");
  });

  test("검색 결과가 없으면 안내 메시지가 표시된다", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/검색/i);
    await searchInput.fill("NonExistentDApp12345");

    await page.waitForTimeout(500);

    await expect(page.getByText(/검색 결과가 없습니다/i)).toBeVisible();
  });

  test("Clear 버튼을 클릭하면 검색이 초기화된다", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/검색/i);
    await searchInput.fill("Uniswap");

    await page.waitForTimeout(500);

    const clearButton = page.getByLabel(/Clear search/i);
    await clearButton.click();

    await expect(searchInput).toHaveValue("");

    const dappItems = page.locator('[class*="space-y-3"] > button');
    const count = await dappItems.count();
    expect(count).toBeGreaterThan(10);
  });

  test("검색어 하이라이트가 표시된다", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/검색/i);
    await searchInput.fill("Uni");

    await page.waitForTimeout(500);

    const highlightedText = page.locator("mark");
    await expect(highlightedText.first()).toBeVisible();
  });
});


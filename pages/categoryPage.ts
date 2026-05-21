import { expect, type Locator, type Page } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="page-title"]');
  }

  async expectHandToolsPageOpen() {
    await expect(this.page).toHaveURL("https://practicesoftwaretesting.com/category/hand-tools");
    await expect(this.pageTitle).toHaveText('Category: Hand Tools');
  }
}

import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly productCards: Locator;
  readonly burgerMenu: Locator;
  readonly search: Locator;
  readonly categoryButton: Locator;
  readonly handToolsLink: Locator;
  readonly powerToolsLink: Locator;
  readonly dropDownCategories: Locator;
  readonly deleteButton: Locator;
  readonly searchButton: Locator;
  readonly searchedItem: Locator;
  readonly searchResultsCount: Locator;
  readonly noResultsMessage: Locator;
  readonly handToolsFilter: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly filterField: Locator;
  readonly sortByAZ: Locator;
  readonly sortByLowToHigh: Locator;
  readonly firstProductNameLink: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('svg#Layer_1');
    this.productCards = page.locator('.card');
    this.burgerMenu = page.getByRole('button', { name: 'Toggle navigation' });
    this.search = page.locator('[data-test="search-query"]');
    this.categoryButton = page.getByRole('button', { name: 'Categories' });
    this.handToolsLink = page.locator('[data-test="nav-hand-tools"]');
    this.powerToolsLink = page.locator('[data-test="nav-power-tools"]');
    this.dropDownCategories = page.locator('ul[aria-label="nav-categories"]');
    this.deleteButton = page.locator('[data-test="search-reset"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.searchedItem = page.locator('[data-test="search-term"]');
    this.searchResultsCount = page.getByTestId('search-results-count');
    this.noResultsMessage = page.locator('[data-test="no-results"]');
    this.handToolsFilter = page.getByRole('checkbox', { name: 'Hand Tools' });
    this.productNames = page.locator('[data-test="product-name"]');
    this.productPrices = page.locator('[data-test="product-price"]');
    this.filterField = page.locator('[data-test="sort"]');
    this.firstProductNameLink = page.locator('a[href^="/product/"] [data-test="product-name"]').first();
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle(/Practice Software Testing/);
  }

  async expectLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async expectProductCardsVisible() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async expectLoaded() {
    await this.expectTitle();
    await this.expectLogoVisible();
    await this.expectProductCardsVisible();
  }
  async openCategoryMenu() {
    await this.categoryButton.click();
    await expect(this.dropDownCategories).toBeVisible();
    await expect(this.handToolsLink).toBeVisible();
    await expect(this.powerToolsLink).toBeVisible();

  }
  async searchForItem(item: string) {
    await this.search.fill(item);
    await this.searchButton.click();
    await expect(this.searchedItem).toHaveText(item);
   
  }

  async clearSearch() {
    await this.deleteButton.click();
    await expect(this.search).toHaveValue('');
  }

  async openHandToolsCategory() {
    await this.categoryButton.click();
    await this.handToolsLink.click();
  }

  async invalidSearch(item: string) {
    await this.search.fill(item);
    await this.searchButton.click();
    await expect(this.noResultsMessage).toBeVisible();
  }

  async getProductCardsCount() {
    await expect(this.productCards.first()).toBeVisible();
    return this.productCards.count();
  }

  async filterByHandTools() {
    await this.handToolsFilter.check();
    await expect(this.handToolsFilter).toBeChecked();
    await expect(this.productCards.first()).toBeVisible();
  }
  async filterByAZ() {
    await this.filterField.click();
    await this.filterField.selectOption('name,asc');
        await expect(this.filterField).toHaveValue('name,asc');

  }
  async filterByPriceLowToHigh() {
    await this.filterField.click();
    await this.filterField.selectOption('price,asc');
    await expect(this.filterField).toHaveValue('price,asc');
  }
  async openFirstProduct() {
    await this.productCards.first().click();
  }


}

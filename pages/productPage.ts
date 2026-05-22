import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly productPrice: Locator;
    readonly description: Locator;
    readonly addToCartButton: Locator;
    readonly addToFavoritesButton: Locator;
    readonly compareButton: Locator;
    readonly increaseQuantityButton: Locator;
    readonly decreaseQuantityButton: Locator;
    readonly specificationsTitle: Locator;
    readonly productSpecifications: Locator;
    readonly cartQuantity: Locator;
    readonly relatedProductsTitle: Locator;
    readonly relatedProductLinks: Locator;
    readonly compareTwoButton: Locator;
    



    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="product-name"]');
        this.productPrice = page.locator('[data-test="unit-price"]');
        this.description = page.locator('[data-test="product-description"]');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.addToFavoritesButton = page.locator('[data-test="add-to-favorites"]');
        this.compareButton = page.getByRole('button', { name: 'Compare' });
        this.increaseQuantityButton = page.locator('[data-test="increase-quantity"]');
        this.decreaseQuantityButton = page.locator('[data-test="decrease-quantity"]');
        this.specificationsTitle = page.locator('[data-test="specs-title"]');
        this.productSpecifications = page.locator('[data-test="product-specs"]');
        this.cartQuantity = page.locator('[data-test="cart-quantity"]');
        this.relatedProductsTitle = page.getByRole('heading', { name: 'Related products' });
        this.relatedProductLinks = page.locator('a.card[href^="/product/"]');
        this.compareTwoButton = page.locator('[data-test="compare-link"]');
        
    }


    async expectProductPageOpen() {
        await expect(this.productTitle).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.description).toBeVisible();
        await expect(this.addToCartButton).toBeVisible();
        await expect(this.addToFavoritesButton).toBeVisible();
        await expect(this.compareButton).toBeVisible();
        await expect(this.increaseQuantityButton).toBeVisible();
        await expect(this.decreaseQuantityButton).toBeVisible();
        await expect(this.specificationsTitle).toBeVisible();
        await expect(this.productSpecifications).toBeVisible();
    }
    async addToCart() {
        await this.addToCartButton.click();
        await expect(this.cartQuantity).toHaveText('1');

        
    }
    async addIncreaseQuantity() {
        await this.increaseQuantityButton.click();
        await this.addToCartButton.click();
        await expect(this.cartQuantity).toHaveText('2');
    }
    async openFirstRelatedProduct() {
        await expect(this.relatedProductsTitle).toBeVisible();
        await expect(this.relatedProductLinks.first()).toBeVisible();
        await this.relatedProductLinks.first().click();
        await this.page.waitForTimeout(5000);


    }
    async addToCompare(){
        await expect(this.compareButton).toBeVisible();
        //await expect(this.compareButton).not.toHaveClass(/btn-outline-primary/);
        await this.compareButton.click();
        await this.page.waitForTimeout(5000);
        //await expect(this.compareButton).toHaveClass(/btn btn-primary/);
    }
    async compare(){
        //await this.page.waitForTimeout(5000);
        await this.compareTwoButton.click();
        await expect(this.page).toHaveURL('https://practicesoftwaretesting.com/comparison');
    }
    async addToFavorites(){
        await this.addToFavoritesButton.click();
    }
    async getProductName() {
        return (await this.productTitle.textContent())?.trim() || '';
    }
    async expectFavoriteContainsProduct(productName: string) {
    await expect(this.productTitle).toContainText(productName);
    }
     
}
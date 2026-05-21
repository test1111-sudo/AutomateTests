import { expect, test } from '@playwright/test';
import { CategoryPage } from '../pages/categoryPage';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { RegisterPage } from '../pages/registerPage';

test('register a user', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.register();
  await registerPage.signInAfterRegistration();


})

test('home page loads with key elements visible', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.expectLoaded();
});

test('navigation categories are visible', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.openCategoryMenu();
});

test('search functionality works correctly', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.searchForItem('bolt');
  await homePage.clearSearch();
});
test('invalid search shows no results', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.invalidSearch('abcd');
});

test('hand tools category opens correctly', async ({ page }) => {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);

  await homePage.goto();
  await homePage.openHandToolsCategory();
  await categoryPage.expectHandToolsPageOpen();
});

test('check filter functionality', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  const initialCount = await homePage.getProductCardsCount();
  await homePage.filterByHandTools();
  const filteredCount = await homePage.getProductCardsCount();
  expect(filteredCount).toBeGreaterThan(0);

  await homePage.filterByAZ();
  await homePage.filterByPriceLowToHigh();

});


test('add two products to the cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await cartPage.emptyCartIfNeeded();
  await homePage.openFirstProduct();
  await productPage.expectProductPageOpen();
  await productPage.addIncreaseQuantity();
});

test('checkout with bank transfer one product', async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);


  await homePage.goto();
  await homePage.openFirstProduct();
  await productPage.expectProductPageOpen();
  await productPage.addToCart();
  await cartPage.openCart();
  await cartPage.expectCartPageOpen();
  await cartPage.signIn();
  await cartPage.fillBillingAddressIfEmpty();
  await cartPage.payWithBankTransfer();
});

test('checkout with cash on delivery one product', async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();
  await homePage.openFirstProduct();
  await productPage.expectProductPageOpen();
  await productPage.addToCart();
  await cartPage.openCart();
  await cartPage.expectCartPageOpen();
  await cartPage.signIn();
  await cartPage.fillBillingAddressIfEmpty();
  await cartPage.payWithCashOnDelivery();
});

test('checkout with credit card one product', async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();
  await homePage.openFirstProduct();
  await productPage.expectProductPageOpen();
  await productPage.addToCart();
  await cartPage.openCart();
  await cartPage.expectCartPageOpen();
  await cartPage.signIn();
  await cartPage.fillBillingAddressIfEmpty();
  await cartPage.payWithCreditCard();
});

test('checkout with buy now pay later one product', async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();
  await homePage.openFirstProduct();
  await productPage.expectProductPageOpen();
  await productPage.addToCart();
  await cartPage.openCart();
  await cartPage.expectCartPageOpen();
  await cartPage.signIn();
  await cartPage.fillBillingAddressIfEmpty();
  await cartPage.payWithBuyNowPayLater();
});

test('checkout with gift card one product', async ({ page }) => {
  const cartPage = new CartPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();
  await homePage.openFirstProduct();
  await productPage.expectProductPageOpen();
  await productPage.addToCart();
  await cartPage.openCart();
  await cartPage.expectCartPageOpen();
  await cartPage.signIn();
  await cartPage.fillBillingAddressIfEmpty();
  await cartPage.payWithGiftCard();
});

import { expect, type Locator, type Page } from '@playwright/test';
import { testUser } from '../test-data/user';

export class CartPage {
    readonly page: Page;
    readonly items: Locator;
    readonly quantity: Locator;
    readonly price: Locator;
    readonly totalPrice: Locator;
    readonly deleteButton: Locator;
    readonly checkoutButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;
    readonly forgotPasswordButton: Locator;
    readonly countryDropdown: Locator;
    readonly postalCodeInput: Locator;
    readonly houseNumberInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly paymentDropdown: Locator;
    readonly confirmButton: Locator;
    readonly successMessage: Locator;
    readonly cartRows: Locator;
    readonly productTitles: Locator;
    readonly loggedInMessage: Locator;
    readonly bankNameInput: Locator;
    readonly accountNameInput: Locator;
    readonly accountNumberInput: Locator;
    readonly creditCardNumberInput: Locator;
    readonly expirationDateInput: Locator;
    readonly cvvInput: Locator;
    readonly cardholderNameInput: Locator;
    readonly installmentDropdown: Locator;
    readonly giftCardNumberInput: Locator;
    readonly validationCodeInput: Locator;
    readonly cartIcon: Locator;
    readonly homeIcon: Locator;
    readonly checkoutButtonItemList : Locator;
    readonly checkoutButtonSignIn : Locator;
    readonly checkoutButtonBilling : Locator;

    constructor(page: Page) {
        this.page = page;
        this.items = page.locator('[data-test="cart-items"]');
        this.quantity = page.locator('[data-test="cart-quantity"]');
        this.price = page.locator('[data-test="cart-price"]');
        this.totalPrice = page.locator('[data-test="cart-total"]');
        this.cartRows = page.locator('tbody tr');
        this.productTitles = page.locator('[data-test="product-title"]');
        this.deleteButton = page.locator('tbody tr .btn-danger');
        this.checkoutButtonItemList = page.locator('[data-test="proceed-1"]');
        this.checkoutButtonSignIn = page.locator('[data-test="proceed-2"]');
        this.checkoutButtonBilling = page.locator('[data-test="proceed-3"]');
        this.confirmButton = page.locator('[data-test="finish"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.registerButton = page.locator('[data-test="register-button"]');
        this.forgotPasswordButton = page.locator('[data-test="forgot-password-button"]');
        this.countryDropdown = page.locator('[data-test="country"]');
        this.postalCodeInput = page.locator('[data-test="postal_code"]');
        this.houseNumberInput = page.locator('[data-test="house_number"]');
        this.streetInput = page.locator('[data-test="street"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.paymentDropdown = page.locator('[data-test="payment-method"]');
        this.successMessage = page.locator('[data-test="payment-success-message"]');
        this.loggedInMessage = page.getByText('Hello test testing, you are already logged in. You can proceed to checkout.');
        this.streetInput = page.locator('[data-test="street-input"]');
        this.bankNameInput = page.locator('[data-test="bank_name"]');
        this.accountNameInput = page.locator('[data-test="account_name"]');
        this.accountNumberInput = page.locator('[data-test="account_number"]');
        this.creditCardNumberInput = page.locator('[data-test="credit_card_number"]');
        this.expirationDateInput = page.locator('[data-test="expiration_date"]');
        this.cvvInput = page.locator('[data-test="cvv"]');
        this.cardholderNameInput = page.locator('[data-test="card_holder_name"]');
        this.installmentDropdown = page.locator('[data-test="monthly_installments"]');
        this.giftCardNumberInput = page.locator('[data-test="gift_card_number"]');
        this.validationCodeInput = page.locator('[data-test="validation_code"]');
        this.cartIcon = page.locator('[data-test="nav-cart"]');
        this.homeIcon = page.locator('[data-test="nav-home"]');
    }
async openCart() {
    await this.page.goto('https://practicesoftwaretesting.com/checkout');
    
}
async expectCartPageOpen() {
    await this.checkoutButtonItemList.click();}


async expectCartItemsCount(count: number) {
  await expect(this.cartRows).toHaveCount(count);
}

async expectCartContainsProduct(productName: string) {
  await expect(this.productTitles).toContainText(productName);
}
async expectCartIsEmpty() {
  await expect(this.cartRows).toHaveCount(0);
}
async deleteItemFromCart() {
  await this.deleteButton.click();

}
async verifyTotalPrice(expectedPrice: string) {
  await expect(this.totalPrice).toHaveText(expectedPrice);
  await this.checkoutButton.click();
}
async signIn() {
  await this.emailInput.fill(testUser.email);
  await this.passwordInput.fill(testUser.password);
  await this.loginButton.click();
  await this.checkoutButtonSignIn.click();


}
async fillBillingAddressIfEmpty() {
    await this.page.waitForTimeout(5000);
    await this.houseNumberInput.fill('17');
    await this.checkoutButtonBilling.click();
}
async payWithBankTransfer() {
    await this.paymentDropdown.selectOption('bank-transfer');
    await this.bankNameInput.fill('My Bank');
    await this.accountNameInput.fill('John Doe');
    await this.accountNumberInput.fill('123456789');
    await this.confirmButton.click();
    await expect(this.successMessage).toBeVisible();
     await this.confirmButton.click();

}
async payWithCashOnDelivery() {
    await this.paymentDropdown.selectOption('cash-on-delivery');
    await this.confirmButton.click();
    await expect(this.successMessage).toBeVisible();
}
async payWithCreditCard() {
    await this.paymentDropdown.selectOption('credit-card');
    await this.creditCardNumberInput.fill('4111-1111-1111-1111');   
    await this.expirationDateInput.fill('12/2030');
    await this.cvvInput.fill('123');
    await this.cardholderNameInput.fill('John Doe');
    await this.confirmButton.click();
    await expect(this.successMessage).toBeVisible();
}
async payWithBuyNowPayLater() {
    await this.paymentDropdown.selectOption('buy-now-pay-later');
    await this.installmentDropdown.selectOption('3');
    await this.confirmButton.click();
    await expect(this.successMessage).toBeVisible();
}
async payWithGiftCard() {
    await this.paymentDropdown.selectOption('gift-card');
    await this.giftCardNumberInput.fill('123456789012');
    await this.validationCodeInput.fill('123');
    await this.confirmButton.click();
    await expect(this.successMessage).toBeVisible();
}


async emptyCartIfNeeded() {
  await this.openCart();

  while (await this.cartRows.count() > 0) {
    await this.deleteButton.first().click();
  }

  await expect(this.cartRows).toHaveCount(0);
  await this.page.goto('https://practicesoftwaretesting.com/');
}

}

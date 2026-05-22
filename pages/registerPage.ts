import { expect, type Locator, type Page } from '@playwright/test';
import { testUser } from '../test-data/user';
import { link } from 'fs/promises';

export class RegisterPage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly surnameInput: Locator;
    readonly dobInput: Locator;
    readonly countryDropdown: Locator;
    readonly postalCodeInput: Locator;
    readonly houseNumberInput: Locator;
    readonly streetInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;
    readonly loginButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly forgotPasswordButton: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('[data-test="first-name"]');
        this.surnameInput = page.locator('[data-test="last-name"]');
        this.dobInput = page.locator('[data-test="dob"]');
        this.countryDropdown = page.locator('[data-test="country"]');
        this.postalCodeInput = page.locator('[data-test="postal_code"]');
        this.houseNumberInput = page.locator('[data-test="house_number"]');
        this.streetInput = page.locator('[data-test="street"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.phoneInput = page.locator('[data-test="phone"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.registerButton = page.locator('[data-test="register-submit"]');
        this.successMessage = page.locator('[data-test="success-message"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.forgotPasswordLink = page.locator('[data-test="forgot-password-link"]');
        this.forgotPasswordButton = page.locator('[data-test="forgot-password-submit"]');
        this.pageTitle = page.locator('[data-test="page-title"]');

    }

    async register() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
    await this.nameInput.fill(testUser.firstName);
    await this.surnameInput.fill(testUser.lastName);
    await this.dobInput.fill(testUser.dob);
    await this.countryDropdown.selectOption({ label: testUser.country });
    await this.postalCodeInput.fill(testUser.postalCode);
    await this.houseNumberInput.fill(testUser.houseNumber);
    await this.page.waitForTimeout(5000);
    await this.phoneInput.fill(testUser.phone);
    await this.emailInput.fill(testUser.email);
    await this.passwordInput.fill(testUser.password);
    await this.registerButton.click();
    await this.page.waitForTimeout(5000);


    }

    async signInAfterRegistration() {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
        await expect(this.page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
        await this.emailInput.fill(testUser.email);
        await this.passwordInput.fill(testUser.password);
        await this.loginButton.click();
        await this.page.waitForTimeout(5000);
        await expect(this.pageTitle).toHaveText('My account');

       
    }

    async expectRegistrationSuccess() {
        await expect(this.successMessage).toBeVisible();
    }
    async forgotPasswordFlow() {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
        await this.forgotPasswordLink.click();
        await this.emailInput.fill(testUser.email);
        await this.forgotPasswordButton.click();
        await expect(this.page.getByText('page.forgot-password.confirm')).toBeVisible();
    }
}

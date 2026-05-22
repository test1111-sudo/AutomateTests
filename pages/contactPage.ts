import { expect, type Locator, type Page } from '@playwright/test';
import { paymentDetails, testUser } from '../test-data/user';

export class ContactPage{
    readonly page: Page;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectDropdown: Locator;
    readonly messageInput: Locator;
    readonly submitButton: Locator;
    readonly contactNav: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('[data-test="first-name"]');
        this.lastNameInput = page.locator('[data-test="last-name"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.subjectDropdown = page.locator('[data-test="subject"]');
        this.messageInput = page.locator('[data-test="message"]');
        this.submitButton = page.locator('[data-test="contact-submit"]');
        this.contactNav = page.getByRole('link', { name: 'Contact' });
        }

     async navigateToContactPage(){
        await this.contactNav.click();
     }       

    async fillContactForm() {
        await this.nameInput.fill(testUser.firstName);
        await this.lastNameInput.fill(testUser.lastName)
        await this.emailInput.fill(testUser.email);
        await this.subjectDropdown.selectOption({ label: 'Webmaster' });
        await this.messageInput.fill(testUser.message);
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async expectSuccessMessage() {
        await expect(this.page.getByRole('alert')).toContainText('Thanks for your message!');

    }
}
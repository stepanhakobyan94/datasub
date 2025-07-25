import { Page, expect } from '@playwright/test';

export class QuoteFormPage {
  constructor(public page: Page) {}

  async navigate() {
    await this.page.goto('https://qatest.datasub.com/quote.html');
    await this.page.waitForSelector('.nav-item.nav-link.active');
  }

  async fillName(name: string) {
    await this.page.getByRole('textbox', { name: 'Your Name' }).fill(name);
  }

  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Your Email' }).fill(email);
  }

  async selectService(service: string) {
    await this.page.locator('#service').selectOption(service);
  }

  async selectAccountType(type: 'Business' | 'Personal') {
    await this.page.getByRole('radio', { name: type }).check();
  }

  async selectWithdrawalOption(option: 'Cash' | 'Card') {
    await this.page.getByRole('checkbox', { name: option }).click();
  }

  async fillMessage(message: string) {
    await this.page.getByRole('textbox', { name: 'Message' }).fill(message);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Request A Quote' }).click();
  }

  async expectSuccess() {
    await expect(this.page.getByText('Форма отправлена.')).toBeVisible();
  }

  async expectInvalidName() {
    await expect(
      this.page.getByRole('textbox', { name: 'Your Name' })
    ).toHaveClass(/is-invalid/);
  }

  async expectInvalidEmail() {
    await expect(this.page.locator('.bg-primary.rounded.h-100')).toBeVisible();
  }
}

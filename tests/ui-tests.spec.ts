import { test, expect } from '@playwright/test';
import { QuoteFormPage } from '../page-objects/QuoteFormPage';

test.describe('Request A Quote Form Tests', () => {
  let quoteForm: QuoteFormPage;

  test.beforeEach(async ({ page }) => {
    quoteForm = new QuoteFormPage(page);
    await quoteForm.navigate();
  });

  test('Positive: Submit form with valid Business + Cash data', async () => {
    await quoteForm.fillName('John Doe');
    await quoteForm.fillEmail('john.doe@example.com');
    await quoteForm.selectService('B Service');
    await quoteForm.selectAccountType('Business');
    await quoteForm.selectWithdrawalOption('Cash');
    await quoteForm.fillMessage('Automation Test');
    await quoteForm.submit();
    await quoteForm.expectSuccess();
  });

  test('Positive: Submit form with valid Individual + Credit Card data', async () => {
    await quoteForm.fillName('John Doe');
    await quoteForm.fillEmail('john.doe@example.com');
    await quoteForm.selectService('B Service');
    await quoteForm.selectAccountType('Personal');
    await quoteForm.selectWithdrawalOption('Card');
    await quoteForm.fillMessage('Automation Test');
    await quoteForm.submit();
    await quoteForm.expectSuccess();
  });

  test('Negative: Submit form with invalid email', async () => {
    await quoteForm.fillName('John Doe');
    await quoteForm.fillEmail('invalid-email');
    await quoteForm.selectService('B Service');
    await quoteForm.selectAccountType('Business');
    await quoteForm.selectWithdrawalOption('Card');
    await quoteForm.fillMessage('Automation Test');
    await quoteForm.submit();
    await quoteForm.expectInvalidEmail();
  });

  test('Negative: Submit form with empty required fields', async () => {
    await quoteForm.fillEmail('john.doe@example.com');
    await quoteForm.selectService('C Service');
    await quoteForm.selectAccountType('Personal');
    await quoteForm.selectWithdrawalOption('Card');
    await quoteForm.fillMessage('Automation Test');
    await quoteForm.submit();
    await quoteForm.expectInvalidName();
  });

  test('Positive: Submit form with Business + Credit Card', async () => {
    await quoteForm.fillName('John Doe');
    await quoteForm.fillEmail('john.doe@example.com');
    await quoteForm.selectService('B Service');
    await quoteForm.selectAccountType('Business');
    await quoteForm.selectWithdrawalOption('Cash');
    await quoteForm.fillMessage('Automation Test');
    await quoteForm.submit();
    await quoteForm.expectSuccess();
  });

  test('Positive: Submit form with Individual + Cash', async () => {
    await quoteForm.fillName('John Doe');
    await quoteForm.fillEmail('john.doe@example.com');
    await quoteForm.selectService('B Service');
    await quoteForm.selectAccountType('Personal');
    await quoteForm.selectWithdrawalOption('Cash');
    await quoteForm.fillMessage('Automation Test');
    await quoteForm.submit();
    await quoteForm.expectSuccess();
  });
});

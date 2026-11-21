import {test, expect } from '@playwright/test';

test.describe('Storefront Smoke @smoke', () =>{
    test('loads homepage and navigates to products catalog', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Automation Exercise/);

        await page.getByRole('link', {name : /Products/i }).click();
        await expect(page).toHaveURL(/\/products/);
        await expect(page.getByRole('heading', {name: 'All Products'})).
            toBeVisible();
    });
});
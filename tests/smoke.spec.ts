import {test, expect } from '@playwright/test';

test.describe('Storefront Smoke @smoke', () =>{
    // The site shows Google ads, including a full-screen "vignette" ad that can
    // hijack navigation (URL becomes /#google_vignette). Block ad networks so
    // tests are deterministic and don't depend on third-party ads.
    test.beforeEach(async ({ page }) => {
        await page.route(
            /googlesyndication\.com|doubleclick\.net|googleadservices\.com|adservice\.google\.com|fundingchoicesmessages\.google\.com/,
            route => route.abort()
        );
    });

    test('loads homepage and navigates to products catalog', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Automation Exercise/);

        await page.getByRole('link', {name : /Products/i }).click();
        await expect(page).toHaveURL(/\/products/);
        await expect(page.getByRole('heading', {name: 'All Products'})).
            toBeVisible();
    });
});
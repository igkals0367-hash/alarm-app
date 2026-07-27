import { test, expect } from '@playwright/test'

test('an alarm survives a page reload', async ({page}) => {
    await page.goto('/')

    await page.locator('input[type="time"]').fill('07:00')
    await page.locator('input[type="text"]').fill('Gym')
    await page.getByRole('button', { name: 'Add alarm' }).click()

    await expect(page.getByText('Gym')).toBeVisible()

    await page.reload()

    await expect(page.getByText('Gym')).toBeVisible()
})
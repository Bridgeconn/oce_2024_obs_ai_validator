import { test, expect } from '@playwright/test';
test("Validate", async({browser, page}) => { 
    //Creating new default cognito instance and page without using global variables from playwright
   
   
    await page.goto("http://localhost:5173/");
    await page.getByText("Open Bible Stories AI Validator").isVisible();
    await page.getByRole('button', { name: 'Upload' }).click();
    await page.setInputFiles('input[type="file"]', '01.md');
    // await page.waitForTimeout(5000);
    await page.getByText(" Translate the story").isVisible();

    //Selecting langauge
    await page.locator('svg').click();
    await page.locator('#react-select-3-input').fill('Hin');
    await page.getByRole('option', { name: 'Hindi (Devanagari)' }).click();
    await page.getByRole('button', { name: 'Translate' }).click();
    await page.waitForLoadState("networkidle");
    await page.getByRole('button', { name: 'Validate' }).click();
    

});
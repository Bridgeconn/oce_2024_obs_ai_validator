import { test, expect } from '@playwright/test';
test("LanguageChange", async({browser, page}) => { 
    //Creating new default cognito instance and page without using global variables from playwright
   
   
    await page.goto("http://localhost:5173/");
    await page.locator('svg').click();
    await page.locator('#react-select-3-input').fill('Hin');
    await page.getByRole('option', { name: 'Hindi (Devanagari)' }).click();


});
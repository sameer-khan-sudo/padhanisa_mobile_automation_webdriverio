// Function to dismiss nudge/bottom sheet
export async function dismissNudge() {
  const bottomSheetLocator = $(
    '//android.view.View[contains(@content-desc," ")]/android.widget.ImageView[1]'
  );
  try {
    // Wait for the bottom sheet to be displayed (timeout: 10 seconds)
    await bottomSheetLocator.waitForDisplayed({ timeout: 10000 });
    console.log("Nudge Displayed");
    await driver.back();
  } catch (error) {
    console.log("Nudge Not Displayed within the timeout");
  }
}

// Function to click on any element
export async function clickOnElement(elementLocator: ChainablePromiseElement) {
  try {
    await elementLocator.click(); // Click the element
    console.log(`✅ Clicked on element: ${await elementLocator.selector}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error clicking on element: ${await elementLocator.selector} - ${error.message}`);
      throw new Error(`❌ Failed to click on element: ${await elementLocator.selector} - ${error.message}`);
    } else {
      console.error(`❌ Unexpected error clicking on element: ${await elementLocator.selector}`, error);
      throw new Error(`❌ Failed to click on element: ${await elementLocator.selector}`);
    }
  }
}

// Function to close keyboard
export async function closeKeyboard() {
  try {
    await driver.pause(500)
    await driver.action('pointer')
      .move({ duration: 0, x: 899, y: 233 })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    console.log('Closed keyboard successfully')
  } catch (error) {
    console.log('Failed to close keybaord', error)
    throw new Error('Failed to close keybaord')
  }
}


// Function for entering data into text field
export async function enterTextInField(textFieldLocator: ChainablePromiseElement, value: string) {
  try {
    await textFieldLocator.waitForDisplayed({ timeout: 5000 });
    await textFieldLocator.click();
    await textFieldLocator.setValue(value);
    await closeKeyboard();
    console.log(`🖊️ Entered data in ${textFieldLocator} : ${value}`);
  } catch (error) {
    // console.error(`❌ Error entering text in field: ${error}`);
  }
}


/**
 * Reusable method for performing assertions on a given locator.
 * @param locator - The WebdriverIO element locator.
 * @param assertionType - The type of assertion (e.g., 'displayed', 'enabled', 'exists', 'clickable', etc.).
 */
export async function assertElement(locator: ChainablePromiseElement, assertionType: string) {
  switch (assertionType.toLowerCase()) {
    case 'displayed':
      await expect(locator).toBeDisplayed();
      console.log("✅ Element is displayed.");
      break;
    case 'enabled':
      await expect(locator).toBeEnabled();
      console.log("✅ Element is enabled.");
      break;
    case 'exists':
      await expect(locator).toExist();
      console.log("✅ Element exists in the DOM.");
      break;
    case 'clickable':
      await expect(locator).toBeClickable();
      console.log("✅ Element is clickable.");
      break;
    default:
      console.error("❌ Invalid assertion type provided.");
      break;
  }

}

// Funtion to verify the actual text(s) with expected text(s)
export async function verifyActualAndExpectedText(textElementLocators: ChainablePromiseElement[], expectedTexts: string[]) {
  if (textElementLocators.length !== expectedTexts.length) {
    throw new Error('🔍 Mismatch between number of locators and expected texts.');
  }

  for (let i = 0; i < textElementLocators.length; i++) {
    const actualText = await textElementLocators[i].getAttribute('content-desc');
    const expectedText = expectedTexts[i];

    if (actualText === expectedText) {
      console.log(`✅ Text Verification Passed: "${actualText}" === "${expectedText}"`);
    } else {
      console.error(`❌ Text Verification Failed: "${actualText}" !== "${expectedText}"`);
      throw new Error(`Text does not match. Expected: "${expectedText}", Found: "${actualText}"`);
    }
  }
}

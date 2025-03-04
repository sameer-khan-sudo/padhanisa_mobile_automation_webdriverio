import LoginPage from "../pageobjects/login.page";
import { clickOnElement, dismissNudge } from "../utils/common.utils";

describe("PADHANISA App", () => {
  it("should launch the app and navigate to login", async () => {
    console.log("App launched successfully!");
    await clickOnElement(LoginPage.getOtpButton);
  });

  it("should enter mobile number and click Get OTP", async () => {
    await LoginPage.enterPhoneNumber("9927484781");
    await clickOnElement(LoginPage.getOtpButton)

    // Wait for the "Select Profile" element to be displayed
    const selectProfileLocator = $(
      'android=new UiSelector().description("Select Profile")'
    );
    await selectProfileLocator.waitForDisplayed();
    await expect(selectProfileLocator).toBeDisplayed();

    // Click on the profile element
    const profileElement = $(
      'android=new UiSelector().descriptionContains("Sameer")'
    );
    await profileElement.click();
    await driver.pause(6000)
    // ✅ Use dismissNudge() directly
    await dismissNudge();
  });
});

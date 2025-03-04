import { ChainablePromiseElement } from "webdriverio";
import { clickOnElement, closeKeyboard } from "../utils/common.utils";

// Locators 
class LoginPage {
  public get signInButton(): ChainablePromiseElement {
    return $("~Sign In"); // Using accessibility ID
  }

  public get phoneNumberField(): ChainablePromiseElement {
    return $('android=new UiSelector().className("android.widget.EditText")');
  }

  public get getOtpButton(): ChainablePromiseElement {
    return $("~Get OTP"); // Using accessibility ID
  }

  public async enterPhoneNumber(phone: string): Promise<void> {
    await clickOnElement(this.phoneNumberField)
    await this.phoneNumberField.setValue(phone);
    await closeKeyboard();
  }
}

// Export as a singleton instance ----------------------------------------------
export default new LoginPage();

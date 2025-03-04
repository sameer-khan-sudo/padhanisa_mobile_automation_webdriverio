import { clickOnElement } from "../utils/common.utils";

class SelectProfilePage {

    // Locators
    public get selectProfileHeader() {
        return $('android=new UiSelector().description("Select Profile")');
    }

    public get whoIsLearningLabel() {
        return $('android=new UiSelector().description("Who is Learning?")');
    }

    public get appLogo() {
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)');
    }

    public getUserProfileLocator(userName: string) {
        return $(`android=new UiSelector().descriptionContains("${userName}")`);
    }

    public async selectUserProfile(userName: string): Promise<void> {
        try {
            await browser.waitUntil(async () => {
                const userProfile = this.getUserProfileLocator(userName);
                return await userProfile.isDisplayed();
            }, {
                timeout: 5000, // Adjust the timeout as needed
                timeoutMsg: `User Profile with name "${userName}" not found on the screen.`
            });
    
            const userProfile = this.getUserProfileLocator(userName);
            await clickOnElement(userProfile);
        } catch (error) {
            throw new Error(`Error selecting User Profile ("${userName}")}`);
        }
    }
    

}

export default new SelectProfilePage();

class SongListing {


    // Locators
    public get selectSongHeader() {
        return $('android=new UiSelector().description("Select A Song")');
    }

    public get searchBarLocator(){
        return $('android=new UiSelector().className("android.widget.ImageView").instance(0)')
    }
    public get searchBarFieldLocator(){
        return $('android=new UiSelector().className("android.widget.EditText")')
    }

    public get checkRangeButtonLocator(){
        return $('android=new UiSelector().description("Check Range")')
    }

    public get startClasButtonLocator(){
        return $('android=new UiSelector().descriptionContains("Start Class").instance(0)')
    }
    public get singButtonLocator(){
        return $('android=new UiSelector().descriptionContains("Start Class").instance(0)')
    }

    public get lyricsButtonLocator(){
        return $('android=new UiSelector().description("Lyrics").instance(0)')
    }
}

export default new SongListing();
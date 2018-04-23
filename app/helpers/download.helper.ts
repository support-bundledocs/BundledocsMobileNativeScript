import * as utils from "utils/utils";

export class DownloadHelper {

    //class used for downloading the bundles/manual
    public download(url: string) {
        utils.openUrl(url);
    }
}
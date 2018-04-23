import { Injectable } from '@angular/core';
import { AppBundle } from "../../model/AppBundle";
import { AuthService } from '../auth.service';
import { DownloadHelper } from "../../helpers/download.helper"

@Injectable()
export class BundledocsBundlesService {

    public constructor(
        private _authService:AuthService,
        private _downloadHelper: DownloadHelper
    ) { }

    download(appBundle: AppBundle) {
        let accessToken: string = this._authService.getAccessToken();
        //tried string interpolation but wasn't successful, this is the url used to download the bundle 
        let downloadUrl:string = 
        "https://app.bundledocs.com/api/v1"+
        "/bundles/"+appBundle.PartitionKey+"/"+appBundle.RowKey+"/download?Bearer="+accessToken;
            console.log(downloadUrl);

            //sends the downloadUrl to the downloadhelper.ts class for further assessment 
        this._downloadHelper.download(downloadUrl);
    }
}
//All of the imports necessary for the login class
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { WebView, LoadEventData } from "ui/web-view";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { AccessTokenHelper } from "../../helpers/accessToken.helper";

//define the login component
@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.component.html",
})
//login component class that implements the 'AfterViewInit' import
export class LoginComponent implements OnInit {
    //URL using accessToken to authenticate
    private _authenticationUrl: string = "https://app.bundledocs.com/auth/oauth2/authorize?response_type=token&client_id={{client_id}}&redirect_uri={{redirect_uri}}&state={{state}}";
    get authenticationUrl(): string { return this._authenticationUrl; }

    @ViewChild("webView")
    private _webViewRef: ElementRef;

    public constructor(
        private _page: Page,
        private _ngZone: NgZone,
        private _changeDetectionRef: ChangeDetectorRef,
        private _router: Router,
        private _authService: AuthService,
        private _accessTokenHelper: AccessTokenHelper,
    ) { }

    //Called at runtime
    ngOnInit() {
        console.log('login.component.ngOnInit');

        //hidden the action bar on the login component as it conflicts with the webview
        this._page.actionBarHidden = true;

        const webview: WebView = this._webViewRef.nativeElement;
        const ngZone: NgZone = this._ngZone;
        const router: Router = this._router;
        const authService: AuthService = this._authService;
        const accessTokenHelper: AccessTokenHelper = this._accessTokenHelper;

        //this gets called when the webview is loaded
        webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
            try {
                const authenticationUrl: string = args.url;

                //test for existance of the access token in the url
                var isInUrl: boolean = accessTokenHelper.isAccessTokenInUrl(authenticationUrl);

                if (isInUrl) {
                    //when an access token is in the url
                    var accessToken = accessTokenHelper.toAccessTokenFromUrl(authenticationUrl);

                    //save the access token
                    authService.setAccessToken(accessToken);

                    //navigate router to secure component with our access token                                
                    ngZone.run(() => {
                        router.navigate(["/secure"], { queryParams: { accessToken: accessToken } }).then((success) => {
                            console.log(success);
                        });
                    });
                }
            }
            catch (exception) {
                console.log("login.component.WebView.loadFinishedEvent");
                console.log(exception.toString());
            }
        });
    }
}
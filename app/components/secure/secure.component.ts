//high priority class, most components exist in this class
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { WebView, LoadEventData } from "ui/web-view";
import { Router } from "@angular/router";
import { RouterModule, Routes } from '@angular/router';
import { SearchBar } from "ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";

import { AppBundle } from "../../model/AppBundle";
import { AppUser } from "../../model/AppUser";
import { AuthService } from "../../services/auth.service";
import { BundledocsUserService } from "../../services/bundledocs/users.service";
import { BundledocsBundlesService } from "../../services/bundledocs/bundles.service";
import { DownloadHelper } from "../../helpers/download.helper";

import { Page, visibilityProperty } from "ui/page";
import { ActionItem } from "ui/action-bar";

import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Observable } from "tns-core-modules/ui/page/page";
import { TnsSideDrawer } from 'nativescript-sidedrawer'
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";

@Component({
    moduleId: module.id,
    selector: "ns-secure",
    templateUrl: "secure.component.html"
})
export class SecureComponent implements OnInit {
    public count: number = 0; //used to decide whether the searchbar is visible or hidden
    private _bdUser: AppUser;
    private _mainContentText: string;

    //gets the bundledocs user info and returns it. Go to definition to see class
    get bdUser(): AppUser {
        return this._bdUser; 
    }

    //important for defining whether the search bar is visible or hidden
    //sets a private variable that will be used to determine outcome in the onClickSearch() class
    @ViewChild("txtSearchPhrase")
    private _txtSearchPhrase: ElementRef;

    //similar to above, this is used to decide whether the margin of the list view should be set.
    //when the search bar is visible, the list view needs to be pushed down, and when it goes away, 
    //it needs to be put back in the right place
    @ViewChild("lstBundles")
    private _lstBundles:ElementRef;

    //string that is entered in the searchbar 
    private _searchPhrase: string;
    get searchPhrase(): string {
        return this._searchPhrase;
    }

    //observable array that is used for holding the user bundles 
    private _bdUserBundles: ObservableArray<AppBundle>;
    get bdUserBundles(): ObservableArray<AppBundle> {
        return this._bdUserBundles;
    }

    public constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private _router: Router, //angular routing used to change between routes/classes
        private _authService: AuthService, //used for user authentication
        private _bdUserService: BundledocsUserService, 
        private _bdBundlesService: BundledocsBundlesService,
        private _downloadHelper: DownloadHelper
    ) { }

    //This is used for the side drawer
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    //updates real time on the console 
    onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        console.log("SearchBar text changed! New value: " + searchBar.text);
    }

    //this class decides whether to display the searchbar or not, 1 or 0
    //also used to push the listview down to accomodate for the searchbar when visible
    onClickSearch() {
        this.count++;
        console.log(this.count);
        if (this.count == 1) {
            (<SearchBar>this._txtSearchPhrase.nativeElement).visibility = "visible";
            this.count--;
            this.count--;
            (<RadListView>this._lstBundles.nativeElement).marginTop = 50;
        }
        else if (this.count == 0) {
            (<SearchBar>this._txtSearchPhrase.nativeElement).visibility = "hidden";
            (<RadListView>this._lstBundles.nativeElement).marginTop = 0;
        }
    }

    //refreshing the listview
    onPullToRefreshInitiated(args: ListViewEventData) {
        this.initBundles();
        let listView: RadListView = args.object;
        listView.notifyPullToRefreshFinished();
    }

    //all these actions happen once class is initialised (once logged in)
    ngOnInit() {
        this.initBundles();
        this._changeDetectionRef.detectChanges();
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        this.mainContentText = "Side Drawer Button";
    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    //class used for opening and displaying the side drawer 
    //count is used once again for the purpose of deciding
    //whether the drawer is opened or closed
    public openDrawer() {
        this.drawer.showDrawer();
        this.count++;
        console.log(this.count);
        if (this.count == 1) {
            this.count--;
            this.count--;
        }
        else if (this.count == 0) {
            this.onCloseDrawerTap();
        }
    }

    //called once count is 0
    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    private initBundles() {
        this._bdUserBundles = new ObservableArray<AppBundle>();
        //subscribe to the data
        this._bdUserService.me().subscribe(response => {
            this._bdUser = response.data[0];

            //push each data item onto the obserbvable array
            for (let i = 0; i < this._bdUser.Briefs.length; i++) {
                let currentBrief = this._bdUser.Briefs[i];
                this._bdUserBundles.push(currentBrief);
            }
        },
            err => console.log(err)
        );
    }

    //TODO, not fully functioal yet 
    logout() {
        console.log('secure.component.logout');

        this._authService.setAccessToken(null);
        this._router.navigate(["/"]);
    }

    //opens up compose message to support@legalit from whatever 
    //account you have signed in on your device
    emailSupport() {
        this._downloadHelper.download("mailto:support@bundledocs.com");
    }

    //downloads whatever bundle is clicked 
    downloadBundle(bundle: AppBundle) {
        this._bdBundlesService.download(bundle);
    }

    //downloads the user manual describing bundledocs
    downloadManual() {
        this._downloadHelper.download("https://app.bundledocs.com/bundledocs-app-user-manual");
    }

}

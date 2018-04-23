//important class used to import everything such as routing, sideDrawer etc..
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { NativeScriptRouterModule, NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { SecureComponent } from "./components/secure/secure.component";

import { TokenInterceptor } from './interceptors/token.interceptor';

import { AuthService } from "./services/auth.service";

import { BundledocsUserService } from "./services/bundledocs/users.service";
import { AccessTokenHelper } from "./helpers/accessToken.helper";
import { DownloadHelper } from "./helpers/download.helper";
import { BundledocsBundlesService } from "./services/bundledocs/bundles.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        CommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,

        HttpClientModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    exports: [
        NativeScriptModule,
        NativeScriptRouterModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SecureComponent
    ],
    providers: [
        HttpClientModule,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        BundledocsUserService,
        BundledocsBundlesService,
        AccessTokenHelper,
        DownloadHelper
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]   
})
export class AppModule { }
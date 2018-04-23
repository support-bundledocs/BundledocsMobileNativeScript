import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import * as webViewModule from "tns-core-modules/ui/web-view";

import { LoginComponent } from "./components/login/login.component";
import { SecureComponent } from "./components/secure/secure.component";
import { Component } from "@angular/core/src/metadata/directives";

//any paths you wish to route to must be entered in here 
const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "secure", component: SecureComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
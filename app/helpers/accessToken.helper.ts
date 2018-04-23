export class AccessTokenHelper {

    public toAccessTokenFromUrl(url: string) {
        let accessToken: string = "";

        if (!this.isAccessTokenInUrl(url)) {
            throw "give me a url that has an access token";
        }
        
        //this parses access token from url
        let accessTokenPartOne: string[] = url.split('access_token=');
        let accessTokenPartOneReverse: string[] = accessTokenPartOne.reverse();
        accessToken = accessTokenPartOneReverse.join('').split('&', 1)[0];        

        return accessToken;
    }

    public isAccessTokenInUrl = (url: string) => {
        //test for access token
        return (url.indexOf("access_token") > -1);
    }
}
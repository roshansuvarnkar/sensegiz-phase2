// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
// apiHost:'http://sd2-api.sensegiz.com',
apiHost:'https://testdba.sensegiz.com:3000',
  // apiHost:'http://sd2-api.sensegiz.com:3000',
    // apiHost:'http://3.6.176.216:3000',
    // apiHost:'http://65.0.27.166:3000',
    //  apiHost:'http://3.6.7.251:3000',
  // apiHost:'http://65.0.60.192:3000',

 //apiHost:'http://65.1.126.197:3000',
 //socketHost:'http://65.1.126.197:3010',
 socketHost:'https://testdba.sensegiz.com:3010',
 //apiHost:'http://15.207.101.93:3000',
 //socketHost:'http://15.207.101.93:3010',
  ENCRYPTKEY:"KeYiSGDQdtgUbfu7LpHpGY8G4VzCczMG",
  production: false
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

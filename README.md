# huawei-router-api
A wrapper to connect with and query the API on the Huawei 4G routers (notably the Huawei B315) and any other supporting models.

## Installation
  npm install dialog-router-api --save

## Notes
I was messing about with the web-admin panel of the router and found that it was merely a client side web-page/site that communicates with a backend API via AJAX requests.

There's a lot more to the router's API than just the ones I've been able to provide here, Some of the functions of API require you to login, and currently ~~this doesn't seem to work at all with mine, even with the offical [Huawei Android App](https://play.google.com/store/apps/details?id=com.huawei.mw&hl=en). (router is locked down by Dialog? Different firmware?)~~ thanks to [Rolf Sormo](https://github.com/rolfsormo) for his implementation of the [login feature](https://github.com/ishan-marikar/dialog-router-api/pull/2), it seems to work.

Thanks to [Henrik S Pedersen](http://blog.hsp.dk/php-api-huawei-e5180-router/) and [Hacker Ramblings](https://blog.hqcodeshop.fi/archives/259-Huawei-E5186-AJAX-API.html) for posting their findings on the internet.

## Usage

```js
  var router = require('dialog-router-api').create({
    gateway: '192.168.8.1'
    // The IP address of your router, can be found by doing
    // ipconfig on windows or netstat -r on linux (right under 'Gateway')
  });

  router.getToken(function(error, token) {
    router.getBasicSettings(token, function(error, response){
      console.log(response);
    });
  });
```

## API
### getToken(error, token)
Responds with a token and a cookie used by the following methods to authenticate and communicate with the API.

```js
{ cookies: 'SessionID=nOintv3yIw1utMbHCcZh063IcJKtcV4rVAoSBDNTc+NJIixBN7ukOg8MSaGf+Fck2uiBmmozJ5go63Hs8/wm44ySCrluICP6rsmzVvFzJHXFmrMm4NV0fi8NmJk+QVHY',
  token: '34/Z8of05pVMyK7+SL81x6XgWx28r/ny'
}
```
### login(token, username, password, callback)
Logins in to the router with the provided credentials.

### getMonthStatistics(token, callback)
Responds with the monthly statistics (as shown on the admin dashboard of the router).

```js
{
  CurrentMonthDownload: [ '5222230621' ],
  // in bytes
  CurrentMonthUpload: [ '302853159' ],
  // in bytes
  MonthDuration: [ '209127' ],
  // in seconds, I assume
  MonthLastClearTime: [ '2016-2-16' ]
  // in light-years (jk)
}
```

### getCurrentPLMN
Should respond with the Public Land Mobile Network Information, but in my case, it does not.

```js
{
  State: [ '0' ],
  FullName: [ '41311' ],
  ShortName: [ '41311' ],
  Numeric: [ '41311' ],
  // What the fuck?
  Rat: [ '7' ]
}
```

### getSignal(token, callback)
Responds with the signal strengths of the router

```js
{
  pci: [ '367' ],
  sc: [ '' ],
  cell_id: [ '292609' ],
  rsrq: [ '-7dB' ],
  rsrp: [ '-93dBm' ],
  rssi: [ '-65dBm' ],
  sinr: [ '14dB' ],
  rscp: [ '' ],
  ecio: [ '' ],
  mode: [ '7' ]
}
```

### getStatus(token, callback)
Responds with the basic status information of the router.

```js
{
  ConnectionStatus: [ '901' ],
  WifiConnectionStatus: [ '' ],
  SignalStrength: [ '' ],
  SignalIcon: [ '4' ],
  CurrentNetworkType: [ '19' ],
  CurrentServiceDomain: [ '2' ],
  RoamingStatus: [ '0' ],
  BatteryStatus: [ '' ],
  BatteryLevel: [ '' ],
  BatteryPercent: [ '' ],
  simlockStatus: [ '0' ],
  WanIPAddress: [ '' ],
  WanIPv6Address: [ '' ],
  PrimaryDns: [ '' ],
  SecondaryDns: [ '' ],
  PrimaryIPv6Dns: [ '' ],
  SecondaryIPv6Dns: [ '' ],
  CurrentWifiUser: [ '1' ],
  TotalWifiUser: [ '32' ],
  currenttotalwifiuser: [ '32' ],
  ServiceStatus: [ '2' ],
  SimStatus: [ '1' ],
  WifiStatus: [ '1' ],
  CurrentNetworkTypeEx: [ '101' ],
  maxsignal: [ '5' ],
  wifiindooronly: [ '0' ],
  wififrequence: [ '0' ],
  classify: [ 'cpe' ],
  flymode: [ '0' ],
  cellroam: [ '1' ],
  voice_busy: [ '0' ]
}
```

### getTrafficStatistics(token, callback)
Reponds with the total traffic statistics of the router.

```js
{
  CurrentConnectTime: [ '7994' ],
  CurrentUpload: [ '7534237' ],
  CurrentDownload: [ '69825936' ],
  CurrentDownloadRate: [ '64' ],
  CurrentUploadRate: [ '130' ],
  TotalUpload: [ '304369972' ],
  TotalDownload: [ '5243043843' ],
  TotalConnectTime: [ '215501' ],
  showtraffic: [ '1' ]
}
```

### getBasicSettings(token, callback)
Responds with the basic settings of the router.

```js
{ WifiSsid: [ 'Dialog 4G' ],
  WifiChannel: [ '6' ],
  WifiHide: [ '1' ],
  WifiCountry: [ 'US' ],
  WifiMode: [ 'b/g/n' ],
  WifiRate: [ '0' ],
  WifiTxPwrPcnt: [ '100' ],
  WifiMaxAssoc: [ '32' ],
  WifiEnable: [ '1' ],
  WifiFrgThrshld: [ '2346' ],
  WifiRtsThrshld: [ '2347' ],
  WifiDtmIntvl: [ '1' ],
  WifiBcnIntvl: [ '100' ],
  WifiWme: [ '1' ],
  WifiPamode: [ '0' ],
  WifiIsolate: [ '0' ],
  WifiProtectionmode: [ '1' ],
  Wifioffenable: [ '1' ],
  Wifiofftime: [ '600' ],
  wifibandwidth: [ '0' ],
  wifiautocountryswitch: [ '0' ],
  wifiantennanum: [ '2' ],
  wifiguestofftime: [ '0' ],
  WifiRestart: [ '0' ] }
```

## Tests
  ```HUAWEI_GW_IP=192.168.8.1 HUAWEI_GW_PASSWORD=abc123 HUAWEI_GW_USERNAME=admin npm test```

You most likely need to set your device IP and the admin credentials on the command-line like in this example.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## Contributors
  - [Rolf Sormo](https://github.com/rolfsormo)

## Bugs
Plenty. If you find any, please do let me know. I also don't mind pull-requests, so if you want to contribute, please do. c:

## Release History
- 0.1.0 Initial release

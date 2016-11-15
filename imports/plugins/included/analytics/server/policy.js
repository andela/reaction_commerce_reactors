import { BrowserPolicy } from "meteor/browser-policy-common";

BrowserPolicy.content.allowOriginForAll("www.google-analytics.com");
BrowserPolicy.content.allowOriginForAll("*.doubleclick.net");
BrowserPolicy.content.allowOriginForAll("cdn.mxpnl.com");
BrowserPolicy.content.allowOriginForAll("cdn.segment.com");
BrowserPolicy.content.allowOriginForAll("*.facebook.com");
BrowserPolicy.content.allowOriginForAll("connect.facebook.net");
BrowserPolicy.content.allowOriginForAll("fonts.googleapis.com");
BrowserPolicy.content.allowOriginForAll("fonts.gstatic.com");
BrowserPolicy.content.allowOriginForAll("js.paystack.co");
<<<<<<< d7567ecf9d883a4409070eaaf9c105670a8f4738
BrowserPolicy.content.allowOriginForAll("paystack.com");
BrowserPolicy.content.allowOriginForAll("*.siftscience.com");
=======
>>>>>>> feature(paystack-option): adds pay with paystack button and adjusts security policy to allow for loading the paystack script

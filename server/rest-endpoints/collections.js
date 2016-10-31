import {Accounts} from "/lib/collections";
import {AnalyticsEvents} from "/lib/collections";
import {Assets} from "/lib/collections";
import {Cart} from "/lib/collections";
import {Discounts} from "/lib/collections";
import {Emails} from "/lib/collections";
import {Inventory} from "/lib/collections";
import {Orders} from "/lib/collections";
import {Packages} from "/lib/collections";
import {Products} from "/lib/collections";
import {Revisions} from "/lib/collections";
import {Shops} from "/lib/collections";
import {Tags} from "/lib/collections";
import {Templates} from "/lib/collections";
import {Themes} from "/lib/collections";
import {Translations} from "/lib/collections";


export function addApiCollections(Api) {
  // Generates: GET, POST on /api/items and GET, PUT, DELETE on
  // /api/items/:id for the Items collection
  Api.addCollection(Accounts);
  Api.addCollection(AnalyticsEvents);
  Api.addCollection(Assets);
  Api.addCollection(Cart);
  Api.addCollection(Emails);
  Api.addCollection(Inventory);
  Api.addCollection(Discounts);
  Api.addCollection(Orders);
  Api.addCollection(Packages);
  Api.addCollection(Products);
  Api.addCollection(Revisions);
  Api.addCollection(Shops);
  Api.addCollection(Tags);
  Api.addCollection(Templates);
  Api.addCollection(Themes);
  Api.addCollection(Translations);
}

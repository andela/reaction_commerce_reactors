import SMSStatusPage from "../components/sms_status_page";
import SMSDashboardTabs from "../components/sms_dashboard_tabs";
import SMSSettings from "../containers/sms_settings";

// main page content
Template.smsStatusPage.helpers({
  SMSStatusPage() {
    return {
      component: SMSStatusPage
    };
  }
});

// navigation tabs
Template.smsDashboardTabs.helpers({
  SMSDashboardTabs() {
    return {
      component: SMSDashboardTabs
    };
  }
});

// settings popout (Reaction.showActionView())
Template.smsSettings.helpers({
  SMSSettings() {
    return {
      component: SMSSettings
    };
  }
});

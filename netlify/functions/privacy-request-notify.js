/**
 * ElevenRO public site has no FCM stack — privacy alerts are sent from HydrogenRO
 * CRM functions when that path is used. Shared DB means HRO-deployed notify is enough
 * once privacy-request is live on a stack that has fcm-helper.
 */
async function notifyAdminsPrivacyRequest() {
  return { sent: 0, reason: 'fcm_unavailable_on_elevenro_site' };
}

module.exports = { notifyAdminsPrivacyRequest };

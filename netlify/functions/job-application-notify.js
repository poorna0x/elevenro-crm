/**
 * ElevenRO's public site has no FCM stack. Production careers submits go to
 * HydrogenRO's job-application function, which sends the admin push.
 */
async function notifyAdminsJobApplication() {
  return { sent: 0, reason: 'fcm_unavailable_on_elevenro_site' };
}

module.exports = { notifyAdminsJobApplication };

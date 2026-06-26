/**
 * ElevenRO site — synchronous OG/title meta for WhatsApp & Google (no deferred JS).
 */
(function () {
  window.__PUBLIC_SITE_KEY__ = 'elevenro';

  var origin = 'https://elevenro.com';
  var ogImage = origin + '/elevenro-og.webp';
  var title = 'Eleven RO - Best RO Water Purifier Service in Bengaluru | Same-Day Service';
  var description =
    'Eleven RO - trusted RO water purifier service in Bengaluru, Karnataka. Professional RO installation, repair, maintenance and filter replacement. Same-day service across Bangalore. Call +91-9880693311.';
  var ogTitle = title;
  var ogDescription =
    'Expert RO water purifier installation, repair and maintenance in Bengaluru by Eleven RO. Same-day service across South Bangalore. Call +91-9880693311.';

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '');
  }

  function w(html) {
    document.write(html);
  }

  w('<title>' + esc(title) + '</title>');
  w('<meta name="title" content="' + esc(title) + '" />');
  w('<meta name="description" content="' + esc(description) + '" />');
  w('<meta property="og:type" content="website" />');
  w('<meta property="og:url" content="' + esc(origin) + '" />');
  w('<meta property="og:title" content="' + esc(ogTitle) + '" />');
  w('<meta property="og:description" content="' + esc(ogDescription) + '" />');
  w('<meta property="og:image" content="' + esc(ogImage) + '" />');
  w('<meta property="og:image:width" content="1200" />');
  w('<meta property="og:image:height" content="630" />');
  w('<meta property="og:image:alt" content="Eleven RO — RO water purifier service in Bengaluru" />');
  w('<meta property="og:site_name" content="Eleven RO" />');
  w('<meta property="og:locale" content="en_IN" />');
  w('<meta name="twitter:card" content="summary_large_image" />');
  w('<meta name="twitter:url" content="' + esc(origin) + '" />');
  w('<meta name="twitter:title" content="' + esc(ogTitle) + '" />');
  w('<meta name="twitter:description" content="' + esc(ogDescription) + '" />');
  w('<meta name="twitter:image" content="' + esc(ogImage) + '" />');
})();

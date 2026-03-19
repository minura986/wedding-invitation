const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'Home Coming', 'HomeCinvitation.html'),
  path.join(__dirname, 'Home Coming', 'HomeCinvitation-1.html')
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Theme replacements
  content = content.replace('--lavender: #c8b5d8;', '--lavender: #ffb3b3;');
  content = content.replace('--lavender-mid: #a98cc0;', '--lavender-mid: #ff6666;');
  content = content.replace('--lavender-deep: #7a5c96;', '--lavender-deep: #cc0000;');
  content = content.replace('--plum: #5c3d7a;', '--plum: #990000;');
  content = content.replace('--plum-dark: #3b2550;', '--plum-dark: #660000;');
  content = content.replace('rgba(169, 140, 192, 0.25)', 'rgba(204, 0, 0, 0.25)'); // border

  content = content.replace(/Home|Wedding Invitation/, 'Home Coming Invitation');

  const replaces = [
    [
      '<p class="hero-host">Mr. &amp; Mrs. Tuan Zarook A Samsudeen</p>',
      '<p class="hero-host">Mr. &amp; Mrs. G.K. Dharmasena</p>'
    ],
    [
      '<p class="wedding-script">Wedding</p>',
      '<p class="wedding-script">Home Coming</p>'
    ],
    [
      '<p class="daughter-text">of their beloved daughter</p>',
      '<p class="daughter-text">of their son</p>'
    ],
    [
      '<span class="bride-name">Shrahi Shameera</span>\r\n      <span class="with-text">with</span>\r\n      <span class="groom-name">Minura Sankalpa</span>',
      '<span class="bride-name">Minura Sankalpa</span>\n      <span class="with-text">with</span>\n      <span class="groom-name">Shrahi Shameera</span>'
    ],
    [
      '<span class="bride-name">Shrahi Shameera</span>\n      <span class="with-text">with</span>\n      <span class="groom-name">Minura Sankalpa</span>',
      '<span class="bride-name">Minura Sankalpa</span>\n      <span class="with-text">with</span>\n      <span class="groom-name">Shrahi Shameera</span>'
    ],
    [
      '<p class="groom-parents">Son of Mr. &amp; Mrs. G.K. Dharmasena of Galle</p>',
      '<p class="groom-parents">daughter of Mr. &amp; Mrs. Samsudeen of Kadawatha</p>'
    ],
    [
      '<span class="date-day">14</span>\r\n          <span class="date-part">2026</span>\r\n        </div>\r\n        <p class="day-name">Thursday</p>',
      '<span class="date-day">16</span>\n          <span class="date-part">2026</span>\n        </div>\n        <p class="day-name">Saturday</p>'
    ],
    [
      '<span class="date-day">14</span>\n          <span class="date-part">2026</span>\n        </div>\n        <p class="day-name">Thursday</p>',
      '<span class="date-day">16</span>\n          <span class="date-part">2026</span>\n        </div>\n        <p class="day-name">Saturday</p>'
    ],
    [
      '<p class="hero-time" style="margin-top:18px;">6:15 PM Onwards</p>',
      '<p class="hero-time" style="margin-top:18px;">11.00 AM Onwards</p>'
    ],
    [
      '<p class="venue-name">The Glasgow Banquet Hall</p>\r\n        <p class="venue-addr">34th km post, Colombo - Kandy Road, Kalagedihena</p>',
      '<p class="venue-name">Dharmasena\'s Home</p>\n        <p class="venue-addr">no 223, Ananda Mawatha Kithulampitiya, Galle</p>'
    ],
    [
      '<p class="venue-name">The Glasgow Banquet Hall</p>\n        <p class="venue-addr">34th km post, Colombo - Kandy Road, Kalagedihena</p>',
      '<p class="venue-name">Dharmasena\'s Home</p>\n        <p class="venue-addr">no 223, Ananda Mawatha Kithulampitiya, Galle</p>'
    ],
    [
      '<h2 class="v-title">Pre-Wedding Gallery</h2>',
      '<h2 class="v-title">Pre-Home Coming Gallery</h2>'
    ],
    [
      '<p class="d-val">14 May 2026</p>\r\n        <p class="d-sub">Thursday<br>6:15 PM Onwards</p>',
      '<p class="d-val">16 May 2026</p>\n        <p class="d-sub">Saturday<br>11.00 AM Onwards</p>'
    ],
    [
      '<p class="d-val">14 May 2026</p>\n        <p class="d-sub">Thursday<br>6:15 PM Onwards</p>',
      '<p class="d-val">16 May 2026</p>\n        <p class="d-sub">Saturday<br>11.00 AM Onwards</p>'
    ],
    [
      '<p class="d-val">The Glasgow Banquet Hall</p>\r\n        <p class="d-sub">34th km post<br>Colombo–Kandy Road, Kalagedihena</p>',
      '<p class="d-val">Dharmasena\'s Home</p>\n        <p class="d-sub">no 223, Ananda Mawatha<br>Kithulampitiya, Galle</p>'
    ],
    [
      '<p class="d-val">The Glasgow Banquet Hall</p>\n        <p class="d-sub">34th km post<br>Colombo–Kandy Road, Kalagedihena</p>',
      '<p class="d-val">Dharmasena\'s Home</p>\n        <p class="d-sub">no 223, Ananda Mawatha<br>Kithulampitiya, Galle</p>'
    ],
    [
      '<p class="d-val">Dinner</p>\r\n        <p class="d-sub">Celebrations &amp;<br>dinner to follow</p>',
      '<p class="d-val">Lunch</p>\n        <p class="d-sub">Celebrations &amp;<br>lunch to follow</p>'
    ],
    [
      '<p class="d-val">Dinner</p>\n        <p class="d-sub">Celebrations &amp;<br>dinner to follow</p>',
      '<p class="d-val">Lunch</p>\n        <p class="d-sub">Celebrations &amp;<br>lunch to follow</p>'
    ],
    [
      '<p style="color: var(--muted); font-size: 14px; margin-top: 10px;">The Glasgow Banquet Hall<br>34th km post, Colombo - Kandy Road, Kalagedihena</p>',
      '<p style="color: var(--muted); font-size: 14px; margin-top: 10px;">Dharmasena\'s Home<br>no 223, Ananda Mawatha Kithulampitiya, Galle</p>'
    ],
    [
      'src="https://maps.google.com/maps?hl=en&amp;q=The%20Glasgow%20Hotel%20-%20The%20Banquet%20Hall%2C%20Kalagedihena&amp;t=m&amp;z=17&amp;iwloc=B&amp;output=embed"',
      'src="https://maps.google.com/maps?hl=en&amp;q=no%20223%2C%20Ananda%20Mawatha%20Kithulampitiya%2C%20Galle&amp;t=m&amp;z=17&amp;iwloc=B&amp;output=embed"'
    ],
    [
      'query=The+Glasgow+Banquet+Hall+Kalagedihena',
      'query=no+223+Ananda+Mawatha+Kithulampitiya+Galle'
    ],
    [
      '<p class="f-tagline">14 · 05 · 2026 &nbsp;·&nbsp; Kalagedihena</p>',
      '<p class="f-tagline">16 · 05 · 2026 &nbsp;·&nbsp; Galle</p>'
    ],
    [
      '<p class="f-names">Shrahi &amp; Minura</p>',
      '<p class="f-names">Minura &amp; Shrahi</p>'
    ],
    [
      'Mr. &amp; Mrs. Tuan Zarook A Samsudeen<br>\r\n      555/21B, 04th Lane, Elhenawatta<br>\r\n      Rammuthugala, Kadawatha',
      'Mr. &amp; Mrs. G.K. Dharmasena<br>\n      no 223, Ananda Mawatha<br>\n      Kithulampitiya, Galle'
    ],
    [
      'Mr. &amp; Mrs. Tuan Zarook A Samsudeen<br>\n      555/21B, 04th Lane, Elhenawatta<br>\n      Rammuthugala, Kadawatha',
      'Mr. &amp; Mrs. G.K. Dharmasena<br>\n      no 223, Ananda Mawatha<br>\n      Kithulampitiya, Galle'
    ],
    [
      'See you on 14th May 2026!',
      'See you on 16th May 2026!'
    ]
  ];

  for (let r of replaces) {
    if (content.includes(r[0])) {
      content = content.replace(r[0], r[1]);
    }
  }

  // Regex for blocks to delete
  content = content.replace(/      <div class="d-card">\s*<span class="d-icon">🌸<\/span>\s*<p class="d-lbl">Poruwa Ceremony<\/p>\s*<p class="d-val">6:24 PM<\/p>\s*<p class="d-sub">Traditional Sri Lankan<br>wedding ritual<\/p>\s*<\/div>/, '');
  content = content.replace(/<div class="rsvp-contact" style="margin-top:32px; text-align: center;">\s*<p\s*style="margin-bottom:8px;color:var\(--lavender-deep\);font-size:9px;letter-spacing:3px;text-transform:uppercase; font-weight: bold;">\s*Or Contact Us Directly<\/p>\s*<p style="font-family: 'Lato', sans-serif; font-size: 14px; color: var\(--plum\); letter-spacing: 1px;">\s*070 757 7561 &nbsp;\/&nbsp; 071 757 8287 &nbsp;\/&nbsp; 071 757 7561\s*<\/p>\s*<\/div>/, '');

  fs.writeFileSync(file, content, 'utf8');
  console.log('Saved', file);
}

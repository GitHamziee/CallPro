"use client";

import Script from "next/script";

// ─────────────────────────────────────────────────────────────
// Replace these two values with your actual Tawk.to IDs.
// Find them in: Tawk.to Dashboard → Administration → Chat Widget
// The embed URL looks like: https://embed.tawk.to/{PROPERTY_ID}/{WIDGET_ID}
// ─────────────────────────────────────────────────────────────
const TAWK_PROPERTY_ID = "69a13c924afa321c34c793e9";
const TAWK_WIDGET_ID = "1jiet97hl";

export default function TawkChat() {
  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),
                s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}

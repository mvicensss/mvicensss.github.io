"use client";
import Script from "next/script";

export function Analytics() {
	const beamToken = process.env.NEXT_PUBLIC_BEAM_TOKEN;
	return (
		<>
		{beamToken && (
                <script
                    src="https://beamanalytics.b-cdn.net/beam.min.js"
                    data-token={beamToken}
                    async
                />
            )}
		<Script
                src="https://www.googletagmanager.com/gtag/js?id=G-PJ28W1P9D2"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-PJ28W1P9D2');
                `}
            </Script>
		</>
	);
}

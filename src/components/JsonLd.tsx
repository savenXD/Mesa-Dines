export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mesadines.com/#organization",
        "name": "Mesa Dines",
        "url": "https://mesadines.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mesadines.com/logo.png"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://mesadines.com/#software",
        "name": "Mesa Dines",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStockOnlineOnly"
        },
        "provider": {
          "@id": "https://mesadines.com/#organization"
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

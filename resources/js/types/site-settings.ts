export interface SiteBrandingImage {
  url: string
  default_url: string
  customized: boolean
}

export type SiteSettings = {
  branding: {
    favicon: SiteBrandingImage
    main_logo: SiteBrandingImage
    favicon_dark: SiteBrandingImage
    main_logo_dark: SiteBrandingImage
  }
  site_name: string
  site_description: string
  site_keywords: string
  footer_credit_name: string
  email: string
  phone: string
  address: string
  [key: string]: unknown
}

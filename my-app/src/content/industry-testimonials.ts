import type { Testimonial } from "@/components/sections/testimonials";

/** Matches the featured quote on the home proof section (Martinez HVAC). */
export const TESTIMONIAL_MARTINEZ_HVAC: Testimonial = {
  id: "martinez-hvac",
  clientName: "Carlos Martinez",
  roleTitle: "Owner",
  businessName: "Martinez HVAC",
  quote:
    "Peak season used to mean missed emergency calls. Now we capture every after-hours call and we've added $6,800 in recovered jobs—best investment we've made.",
};

/**
 * Aligned with the Chen's Auto metrics on the home proof section (12 extra appointments,
 * after-hours coverage). Used for plumbing industry social proof.
 */
export const TESTIMONIAL_CHENS_AUTO: Testimonial = {
  id: "chens-auto",
  clientName: "Chen's Auto",
  roleTitle: "Owner",
  businessName: undefined,
  quote:
    "After hours used to mean voicemail and lost jobs. In the first 30 days we added twelve extra appointments and every emergency call gets answered—our shop stays booked without burning out the front desk.",
};

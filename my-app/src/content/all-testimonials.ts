import type { Testimonial } from "@/components/sections/testimonials";
import { TESTIMONIAL_CHENS_AUTO, TESTIMONIAL_MARTINEZ_HVAC } from "@/content/industry-testimonials";

/** From Portfolio case studies (dental / med spa scenario). */
export const TESTIMONIAL_ELITE_DENTAL: Testimonial = {
  id: "elite-dental",
  clientName: "Practice Owner",
  businessName: "Elite Dental",
  quote:
    "Our no-show rate dropped dramatically. Our team focuses on patients, not scheduling. Game changer.",
};

/** From Portfolio case studies (auto repair scenario). */
export const TESTIMONIAL_BAYOU_AUTO: Testimonial = {
  id: "bayou-auto",
  clientName: "Owner",
  businessName: "Bayou Auto",
  quote:
    "Customers love the instant service. We're booking more and our team isn't overwhelmed anymore.",
};

/**
 * All testimonial objects used across the site (industry landings, proof, portfolio-style case studies).
 * Martinez HVAC and Chen's Auto align with the home proof section; Elite Dental and Bayou Auto align with Portfolio samples.
 */
export const ALL_SITE_TESTIMONIALS: Testimonial[] = [
  TESTIMONIAL_MARTINEZ_HVAC,
  TESTIMONIAL_CHENS_AUTO,
  TESTIMONIAL_ELITE_DENTAL,
  TESTIMONIAL_BAYOU_AUTO,
];

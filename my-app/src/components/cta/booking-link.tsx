import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  getBookingUrl,
  isExternalBookingUrl,
  type BookingLinkKey,
} from "@/lib/booking-url";

export interface BookingLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: React.ReactNode;
  /** Semantic CTA key — defaults to general strategy call. */
  kind?: BookingLinkKey;
}

export const BookingLink = React.forwardRef<HTMLAnchorElement, BookingLinkProps>(
  ({ children, className, kind = "generalStrategyCall", ...rest }, ref) => {
    const bookingUrl = getBookingUrl(kind);
    const external = isExternalBookingUrl(bookingUrl);

    if (external) {
      return (
        <a
          ref={ref}
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(className)}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link ref={ref} to={bookingUrl} className={cn(className)} {...rest}>
        {children}
      </Link>
    );
  }
);

BookingLink.displayName = "BookingLink";

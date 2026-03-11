import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getBookingUrl, isExternalBookingUrl } from "@/lib/booking-url";

export interface BookingLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const BookingLink = React.forwardRef<HTMLAnchorElement, BookingLinkProps>(
  ({ children, className, ...rest }, ref) => {
    const bookingUrl = getBookingUrl();
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
      <Link
        ref={ref as any}
        to={bookingUrl}
        className={cn(className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }
);

BookingLink.displayName = "BookingLink";


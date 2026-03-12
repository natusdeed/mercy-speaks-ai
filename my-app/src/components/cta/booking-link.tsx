import * as React from "react";
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

    return (
      <a
        ref={ref}
        href={bookingUrl}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={cn(className)}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

BookingLink.displayName = "BookingLink";


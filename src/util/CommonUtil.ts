import { StatusColor } from "./Types";

export namespace CommonUtil {
    export namespace CurrencyHelper {
        export function convertCentsToDollars(cents: number): string {
            const dollars = cents / 100;
            return dollars.toFixed(2);
        }
    }

    export function openJSON(data: any) {
        const jsonString = JSON.stringify(data, null, 2); // Format with indentation
        const newWindow = window.open("", "_blank");
        if (newWindow) {
            newWindow.document.write("<pre>" + jsonString + "</pre>");
            newWindow.document.close();
        }
    }

    export namespace DateHelper {
        // March 25, 2022
        export function formatDateToMonthDayYear(dateString: string): string {
            const date = new Date(dateString);
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC", // Ensuring the timezone is set to UTC to avoid local timezone offsets
            };

            return date.toLocaleDateString("en-US", options);
        }

        export function formatTimeToHourMin(dateString: string): string {
            const date = new Date(dateString);
            const options: Intl.DateTimeFormatOptions = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // Set to true for AM/PM format
                timeZone: "UTC",
            };

            return date.toLocaleTimeString("en-US", options);
        }
    }

    export function getStatusColor(
        status: keyof typeof StatusColor | undefined
    ): string {
        if (status === undefined) return "bg-neutral-500";
        return StatusColor[status];
    }
}

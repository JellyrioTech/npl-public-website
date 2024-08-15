export namespace CommonUtil {
    export namespace CurrencyHelper {
        export function convertCentsToDollars(cents: number): string {
            const dollars = cents / 100;
            return dollars.toFixed(2);
        }
    }
}


export const displayPrice = (price: number): string => {
    return price.toLocaleString('nl-BE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export const displayPrice = (price: number): string => {
    return price.toLocaleString('nl-BE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export const taxPercentageDisplay = "6%";
export const taxPercentage = 0.06;
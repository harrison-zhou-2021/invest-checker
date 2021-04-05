export const getNumberFromString = (str: string): number =>
    +str.replace(/\D+/g, '');

export const getNumberWithCommas = (n: number): string => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

import { VendorRecord } from "./VendorRecord";

export const safeJsonParse = (jsonString: string | null) => {
    if (jsonString === null) return jsonString;
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Invalid JSON:", error);
        return null;
    }
};
export const safeJsonStringify = (data: VendorRecord[]):string  => {
    try {
        return JSON.stringify(data);
    } catch (error) {
        console.error("Invalid data:", error, data);
        return '';
    }
};
export function getDatePartOfKey(): string {
    const now = new Date();
    const part = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    return part;
}
function getFullKey(source:string): string {
    const storageKey = `${source}:${getDatePartOfKey()}`;
    return storageKey;
}
export function getDataFromLocalStorageIfPossible(sourceKey: string): VendorRecord[] | null {
    if (typeof window !== "undefined") {
        const storageKey = getFullKey(sourceKey);
        const storedString = localStorage.getItem(storageKey);
        const storedData = safeJsonParse(storedString);
        if (storedData) {
            return storedData;
        }
    }
    return null;
}
export function saveDataToLocalStorageIfPossible(sourceKey:string, data: VendorRecord[]|null)  {
    if (typeof window !== "undefined" && data !== null) {
        localStorage.setItem(getFullKey(sourceKey),safeJsonStringify(data))
    }
}
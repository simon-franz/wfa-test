import { ulid as generateUlid, decodeTime } from 'ulid';
export function ulid() {
    return generateUlid();
}
export function ulidTimestamp(id) {
    return new Date(decodeTime(id));
}
export function isValidUlid(id) {
    if (typeof id !== 'string' || id.length !== 26) {
        return false;
    }
    const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    return ulidRegex.test(id);
}
//# sourceMappingURL=ulid.js.map
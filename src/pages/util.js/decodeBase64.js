export default function decode(str) {
    const decoded = decodeURIComponent(atob(str));
    return decoded.toString();
};
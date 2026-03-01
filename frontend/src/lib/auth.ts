export const getTrackerId = () => {
    const match = document.cookie.match(/(?:^|; )tracker_id=([^;]*)/);
    if (match) {
        return match[1];
    }
    const newId = crypto.randomUUID();
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = `tracker_id=${newId};expires=${d.toUTCString()};path=/`;
    return newId;
};

// Aliases to support existing component imports
export const getAuthToken = () => getTrackerId();
export const getUsername = () => `Builder-${getTrackerId().substring(0, 4).toUpperCase()}`;

export const getAuthHeaders = () => {
    const token = getTrackerId();
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

export function formatDate(isoDate: string) {
    return new Date(isoDate).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

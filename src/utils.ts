export const waitTimeout = <T = unknown>(timeout: number, data?: T) => {
    return new Promise<T>(resolve => {
        setTimeout(resolve, timeout, data);
    });
};

export const waitAnimationFrame = <T = unknown>(data?: T) => {
    return new Promise<T>(resolve => {
        requestAnimationFrame(() => {
            resolve(data);
        });
    });
};

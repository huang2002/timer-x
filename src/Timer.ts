interface TaskBase {
    id: any;
    solve(data: unknown): void;
    abort(reason?: unknown): void;
    data: unknown;
    paused: boolean;
}

interface TimeoutTask extends TaskBase {
    absolute: true;
    origin: number;
    timeout: number;
    remaining: number;
}

interface AnimationFrameTask extends TaskBase {
    absolute: false;
}

type Task = TimeoutTask | AnimationFrameTask;

const cancelTask = (task: Task) => {
    if (task.absolute) {
        clearTimeout(task.id);
    } else {
        cancelAnimationFrame(task.id);
    }
};

const setTask = (task: Task) => {
    if (task.absolute) {
        task.origin = Date.now();
        task.id = setTimeout(task.solve, task.remaining, task.data);
    } else {
        task.id = requestAnimationFrame(task.solve);
    }
};

export class Timer {

    private _tasks = new Array<Task>();

    waitTimeout<T = unknown>(timeout: number, data?: T) {
        return new Promise<T>((resolve, reject) => {
            this._tasks.push({
                absolute: true,
                origin: Date.now(),
                timeout,
                remaining: timeout,
                id: setTimeout(resolve, timeout, data),
                solve: resolve,
                abort: reject,
                data,
                paused: false,
            });
        });
    }

    waitAnimationFrame<T = unknown>(data?: T) {
        return new Promise<T>((resolve, reject) => {
            const solve = () => {
                resolve(data);
            };
            this._tasks.push({
                absolute: false,
                id: requestAnimationFrame(solve),
                solve: solve,
                abort: reject,
                data,
                paused: false,
            });
        });
    }

    abort(reason?: unknown) {
        this._tasks.forEach(task => {
            cancelTask(task);
            task.abort(reason);
        });
        this._tasks.length = 0;
    }

    flush() {
        this._tasks.forEach(task => {
            cancelTask(task);
            task.solve(task.data);
        });
        this._tasks.length = 0;
    }

    pause() {
        const now = Date.now();
        this._tasks.forEach(task => {
            cancelTask(task);
            task.paused = true;
            if (task.absolute) {
                task.remaining -= now - task.origin;
                task.origin = now;
            }
        });
    }

    resume() {
        this._tasks.forEach(task => {
            if (task.paused) {
                task.paused = false;
                setTask(task);
            }
        });
    }

    reset() {
        this._tasks.forEach(task => {
            if (task.paused) {
                if (task.absolute) {
                    task.remaining = task.timeout;
                }
            } else {
                cancelTask(task);
                setTask(task);
            }
        });
    }

}

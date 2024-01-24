import * as React from "react";
import { Async } from "@uifabric/utilities/lib/Async";

/**
 * Options for the useDebounce hook.
 */
export type DebounceOptions = {
    /**
     * If true, the func will be called on the leading edge of the timeout. Meaning that the func
     * will be invoked immediately the first time debounce is called, then not again for *at least* `wait`
     * more milliseconds.
     *
     * This is false by default.
     */
    leading?: boolean;
    /**
     * The maximum amount of time to wait before invoking the func. The default is infinite. So by default, if
     * the debounce method is called repeatedly (which keeps resetting its timer), the underlying func may never be
     * called - if there is never `wait` amount of time between invocations. The `maxWait` option allows you to
     * cap the maximum amount of time that a debounce invocation can be delayed before invoking the underlying func.
     */
    maxWait?: number;
    /**
     * If true (the default), the func will be called on the trailing edge of the timeout. Meaning that the func
     * will be called after `wait` amount of milliseconds since the last time debounce was called.
     */
    trailing?: boolean;
};

/**
 * Creates a function that will delay the execution of func until after wait milliseconds have
 * elapsed since the last time it was invoked. Provide an options object to indicate that func
 * should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent calls
 * to the debounced function will return the result of the most-recent func call.
 *
 * Note: If leading and trailing options are true func will be called on the trailing edge of
 * the timeout only if the debounced function is invoked more than once during the wait
 * timeout.
 *
 * Note: This can be mocked in unit tests to return a method that executes synchronously in order to avoid timing issues.
 *
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay. Note that modifying this after first render will cause a new debounced function to be returned, cancelling any pending invocations of the previously returned function.
 * @param options - The options object.  Note that modifying this after first render will cause a new debounced function to be returned, cancelling any pending invocations of the previously returned function.
 * @returns A memoized callback function that wraps the provided func method with Fluent's debounce implementation
 */
export function useDebounce<T extends (...args: any[]) => any>(func: T, wait?: number, options: DebounceOptions = {}): T {
    const { leading, maxWait, trailing } = options;
    const async = useAsync();

    const funcRef = React.useRef<T>();
    funcRef.current = func;
    return React.useMemo(() => {
        return async.debounce(((...args: any[]) => funcRef.current(...args)) as T, wait, { leading, maxWait, trailing });
    }, [funcRef, async, wait, leading, maxWait, trailing]);
}

/**
 * Hook that returns a method to forcefully update the current component.
 *
 * @returns Function to call to force a re-render of the component
 */
export function useForceUpdate(): () => void {
    const [,updateCounter] = React.useState(0);
    return () => {
        updateCounter(prevCount => prevCount + 1);
    };
}

// The useAsync hook is not available from our current drop of Fluent7.
function useAsync() {
    const asyncRef = React.useRef<Async>();
    if (!asyncRef.current) {
        asyncRef.current = new Async();
    }
    React.useEffect(() => {
        return () => {
            asyncRef.current.dispose();
        };
    }, []);
    return asyncRef.current;
}


export class Queue<T> {
    public size: number = 0;

    private _inputQueue: T[] = [];
    private _outputQueue: T[] = [];
    private _popIndex: number = 0;

    public push(item: T): void {
        this._inputQueue.push(item);
        this.size++;
    }

    public pop(): T | undefined {
        if(this.size === 0) return undefined;
        if (this._outputQueue.length === 0 && this._inputQueue.length > 0) {
            this._swapQueues()
        }
        if(this._popIndex >= this._outputQueue.length) {
            this._swapQueues()
        }
        const item = this._outputQueue.at(this._popIndex);
        this._popIndex++;
        this.size--;
        return item;
    }

    public first(n: number): T[] {
        let firstIndex = this._popIndex;
        let count = 0;
        let result: T[] = [];
        while(count < n && firstIndex <= this.size) {
            if(firstIndex >= this._outputQueue.length) {
                const element = this._inputQueue.at(firstIndex - this._outputQueue.length);
                if(element) {
                    result.push(element)
                }
            } else {
                const element = this._outputQueue.at(firstIndex);
                if(element) {
                    result.push(element)
                }
            }
            firstIndex++;
            count++;
        }
        return result;
    }

    private _swapQueues(): void {
        this._outputQueue = this._inputQueue;
        this._inputQueue = [];
        this._popIndex = 0;
    }
}



// Without the pop index ; but O(n) sometimes
// export class Queue<T> {
//     private _queue: T[] = [];
//     private _reverseQueue: T[] = [];
//     public size: number = 0;

//     public push(item: T): void {
//         this._queue.push(item);
//         this.size++;
//     }

//     public pop(): T | undefined {
//         console.log(">> pop queue: ", this._queue, "reverse queue: ", this._reverseQueue);
//         if (this.size === 0) {
//             return undefined;
//         }

//         if (this._reverseQueue.length === 0) {
//             while (this._queue.length > 0) {
//                 this._reverseQueue.push(this._queue.pop()!);
//             }
//         }

//         console.log("<< pop queue: ", this._queue, "reverse queue: ", this._reverseQueue);
//         this.size--;
//         return this._reverseQueue.pop();
//     }
// }

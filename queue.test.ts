import { expect, test } from 'vitest'
import { Queue } from './queue'

test('initializes with a size of 0', () => {
    const queue = new Queue<number>();
    expect(queue.size).toBe(0);
});

test('pushes an item to the queue', () => {
    const queue = new Queue<number>();
    queue.push(1);
    expect(queue.size).toBe(1);
});

test('pushes an item to the queue and pop it', () => {
    const queue = new Queue<number>();
    queue.push(1);
    expect(queue.size).toBe(1);
    const item = queue.pop();
    expect(item).toBe(1);
    expect(queue.size).toBe(0);
});

test('pops the correct item from the queue', () => {
    const queue = new Queue<number>();
    queue.push(1);
    queue.push(2);
    const item = queue.pop();
    expect(item).toBe(1);
    expect(queue.size).toBe(1);
});

test('returns undefined when popping from an empty queue', () => {
    const queue = new Queue<number>();
    const item = queue.pop();
    expect(item).toBeUndefined();
});

test('correctly alternates between push and pop operations', () => {
    const queue = new Queue<number>();
    queue.push(1);
    queue.push(2);
    expect(queue.pop()).toBe(1);
    queue.push(3);
    expect(queue.pop()).toBe(2);
    expect(queue.pop()).toBe(3);
    expect(queue.size).toBe(0);
});

test('maintains correct size with multiple operations', () => {
    const queue = new Queue<number>();
    queue.push(1);
    queue.push(2);
    queue.pop();
    queue.push(3);
    queue.pop();
    expect(queue.size).toBe(1);
});

test('alternate push and pop', () => {
    const queue = new Queue<number>()
    queue.push(1);
    queue.push(2);
    expect(queue.pop()).toBe(1);
    queue.push(3);
    queue.push(4);
    queue.push(5);
    queue.push(6);
    expect(queue.size).toBe(5);
    expect(queue.pop()).toBe(2);
    expect(queue.pop()).toBe(3);
    expect(queue.pop()).toBe(4);
    expect(queue.pop()).toBe(5);
    queue.push(7);
    expect(queue.pop()).toBe(6);
    queue.push(8);
    expect(queue.size).toBe(2);
    expect(queue.pop()).toBe(7);
    expect(queue.pop()).toBe(8);
})

test('size remains 0 after popping the only element', () => {
    const queue = new Queue<number>();
    queue.push(1);
    queue.pop();
    expect(queue.size).toBe(0);
});

test('size does not go negative after excessive pops', () => {
    const queue = new Queue<number>();
    queue.pop();
    queue.pop();
    queue.pop();
    expect(queue.size).toBe(0);
});

test('handles types other than numbers', () => {
    const queue = new Queue<string>();
    queue.push('hello');
    queue.push('world');
    expect(queue.pop()).toBe('hello');
    expect(queue.pop()).toBe('world');
    expect(queue.size).toBe(0);
});


test('get first n items', () => {
    const queue = new Queue<number>();
    queue.push(1);
    queue.push(2);
    queue.push(3);
    expect(queue.pop()).toBe(1);
    queue.push(4);
    queue.push(5);
    queue.push(6);

    expect(queue.first(3)).toEqual([2, 3, 4]);
    expect(queue.first(5)).toEqual([2, 3, 4, 5, 6]);
    expect(queue.first(10)).toEqual([2, 3, 4, 5, 6]);
    expect(queue.first(0)).toEqual([]);
    expect(queue.first(-1)).toEqual([]);

});
import Node from '../node.js';
import Deque from '../deque.js';

// supports O(1) data retrival via key
class HashedDeque extends Deque {
    #table;

    constructor() {
        super();
        this.#table = new Map();
    }

    prepend(node) {
        const key = node.key || node.val.key;
        super().prepend(node);
        this.#table.set(key, node);
    }

    append(node) {
        const key = node.key || node.val.key;
        super().append(node);
        this.#table.set(key, node);
    }

    shift(contents = false) {
        const node = super().shift(contents);
        const key = contents ? node.key : node.val.key;
        this.#table.delete(key);
        return node;
    }

    pop() {
        const node = super().pop(contents);
        const key = contents ? node.key : node.val.key;
        this.#table.delete(key);
        return node;
    }

    remove(node, contents = false) {
        const node = super().remove(node, contents);
        const key = contents ? node.key : node.val.key;
        this.#table.delete(key);
        return node;
    }

    peek(key) {
        if (this.#size === 0) {
            return null;
        } else if (this.#table.has(key)) {
            return this.#table.get(key).val;
        } else {
            return null;
        }
    }

    contains(key) {
        return this.#table.has(key);
    }
}

export default HashedDeque;
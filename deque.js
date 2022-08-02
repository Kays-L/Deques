import Node from '../node.js';

class Deque {
    #size;
    #head;
    #tail;

    constructor() {
        this.#head = new Node();
        this.#tail = new Node();
        this.#head.next = this.#tail;
        this.#tail.prev = this.#head;
        this.#size = 0;
    }

    prepend(node) {
        if (node.val === undefined || node.prev === undefined || node.next === undefined) {
            node = new Node(node);
        }
        const next = this.#head.next;
        this.#head.next = node;
        node.prev = this.#head;
        node.next = next;
        next.prev = node;
        ++this.#size;
        return node;
    }

    append(node) {
        if (node.val === undefined || node.prev === undefined || node.next === undefined) {
            node = new Node(node);
        }
        const prev = this.#tail.prev;
        this.#tail.prev = node;
        node.prev = prev;
        node.next = this.#tail;
        prev.next = node;
        ++this.#size;
        return node;
    }

    shift(contents = false) {
        if (this.#size === 0) {
            return null;
        }
        const node = this.#head.next;
        const next = node.next;
        next.prev = this.#head;
        this.#head.next = next;
        node.prev = null, node.next = null;
        --this.#size;
        return contents ? node.val : node;
    }

    pop(contents = false) {
        if (this.#size === 0) {
            return null;
        }
        const node = this.#tail.prev;
        const prev = node.prev;
        prev.next = this.#tail;
        this.#tail.prev = prev;
        node.prev = null, node.next = null;
        --this.#size;
        return contents ? node.val : node;
    }

    remove(node, contents = false) {
        if (this.#size === 0) {
            return null;
        } else {
            const prev = node.prev;
            const next = node.next;
            if (prev !== null) {
                prev.next = next;
            }
            if (next !== null) {
                next.prev = prev;
            }
            node.prev = null, node.next = null;
            --this.#size;
            return contents ? node.val : node;
        }
    }

    size() {
        return this.#size;
    }

    first() {
        if (this.#size === 0) {
            return null;
        } else {
            return this.#head.next.val;
        }
    }

    last() {
        if (this.#size === 0) {
            return null;
        } else {
            return this.#tail.prev.val;
        }
    }

    empty() {
        return this.#size === 0;
    }

    print() {
        const values = [];
        let cur = this.#head.next;
        for (let i = 0; i < this.#size; ++i) {
            values.push(cur.val);
            cur = cur.next;
        }
        console.log('cache: ');
        console.log(values);
    }
}

export default Deque;
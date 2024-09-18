class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(priority, key) {
        this.nodes.push({ key, priority });
        this.sort();
    }

    dequeue() {
        return this.nodes.shift();
    }

    sort() {
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return !this.nodes.length;
    }
}

export default PriorityQueue;

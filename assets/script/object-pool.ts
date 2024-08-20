import { instantiate, Node, Prefab } from 'cc';

export class ObjectPool {
    private _prefab: Prefab;
    private _pool: Node[] = [];

    constructor(prefab: Prefab) {
        if (!prefab) {
            throw new Error('Prefab cannot be null or undefined');
        }
        this._prefab = prefab;
    }

    get(): Node {
        if (this._pool.length > 0) {
            const node = this._pool.pop()!;
            node.active = true; 
            return node;
        } else {
            const node = instantiate(this._prefab) as Node;
            return node;
        }
    }

    put(node: Node) {
        node.active = false; 
        this._pool.push(node);
    }
}

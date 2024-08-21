import { Node, Label, Vec3, Color } from 'cc';

export class ObjectPool {
    private _pool: Node[] = [];
    private _prefab: Node;

    constructor(prefab: Node) {
        this._prefab = prefab;
    }

    get(): Node {
        if (this._pool.length > 0) {
            const node = this._pool.pop()!;
            node.active = true;
            return node;
        }
        return this._createNode();
    }

    put(node: Node): void {
        node.active = false;
        this._pool.push(node);
    }

    private _createNode(): Node {
        const node = new Node();
        const label = node.addComponent(Label);
        label.fontSize = 30;
        return node;
    }
}

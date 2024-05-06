import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address"

type Item = {
    id: string;
    name: string;
    price: number;
};

type Props = {
    id: Id;
    name: string;
    document: string;
    address: Address;
    items?: Item[],
    createdAt?: Date
    updatedAt?: Date
};

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items?: Item[]

    constructor(props: Props) {
        super(props.id, props.createdAt, props.updatedAt)
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props?.items;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): Item[] {
        return this._items;
    }
}
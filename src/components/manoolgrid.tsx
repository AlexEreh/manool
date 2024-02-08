'use client'
import Table, {ColumnsType, EXPAND_COLUMN, genTable} from 'rc-table'
import Image from "next/image"
import React, {Key} from "react";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import {TriggerEventHandler} from "rc-table/es/interface";

export class ItemRow {
    public first: string
    public second: string
    public third: string
    public fourth: string
    public key: React.Key
    public children: ItemRow[]

    constructor(key: React.Key, ...items: string[]) {
        this.first = items[0]
        this.second = items[1]
        this.third = items[2]
        this.fourth = items[3]
        this.key = key
        this.children = []
    }
}

export interface ManoolItemProps {
    value: string,
    onClick: () => void
}

export function ManoolItem(props: ManoolItemProps) {
    return <div
        className="flex flex-col gap-0 flex-wrap"
        onClick={() => {
            props.onClick()
        }}>
        <Image src="/img.png" alt="Manool Image" width={200} height={200} layout="raw"/>
        <div className="flex justify-center py-2">
            <p className="text-wrap text-center">{props.value}</p>
        </div>
    </div>
}


const data = ["СЧАСТЬЕ", "ГРУСТЬ", "РАЗДРАЖЕНИЕ", "ОДИНОЧЕСТВО", "УДИВЛЕНИЕ", "СКЕПСИС", "ЯРОСТЬ", "ЗАДУМЧИВОСТЬ", "СТЫД", "УСТАЛОСТЬ", "САРКАЗМ", "СТРАСТЬ"]
const rows: ItemRow[] = [
    new ItemRow(0, ...data.slice(0, 4)),
    new ItemRow(1, ...data.slice(4, 8)),
    new ItemRow(2, ...data.slice(8, 12)),
]

export interface ManoolItemRowExpProps {
    record: ItemRow,
    index: number,
    indent: number,
    expanded: boolean
}

export function ManoolItemRowExpFirst(props: ManoolItemRowExpProps) {
    return (props.expanded && props.record.key == rows[props.record.key as number].key) ? <div
        className="flex justify-center flex-row gap-0">
        <Image src="/manulahuel.jpg" alt="Manool Ahuel" width={200} height={200} layout="raw"/>
    </div> : <></>
}

export function ManoolItemRowExpSecond(props: ManoolItemRowExpProps) {
    return (props.expanded && props.record.key == rows[props.record.key as number].key) ? <div
        className="flex justify-center flex-row gap-0">
        <Image src="/manulahuel.jpg" className="hue-rotate-90 blur-sm" alt="Manool Ahuel" width={200} height={200}
               layout="raw"/>
    </div> : <></>
}

export function ManoolItemRowExpThird(props: ManoolItemRowExpProps) {
    return (props.expanded && props.record.key == rows[props.record.key as number].key) ? <div
        className="flex justify-center flex-row gap-0">
        <Image src="/manulahuel.jpg" className="hue-rotate-180 contrast-200" alt="Manool Ahuel" width={200} height={200}
               layout="raw"/>
    </div> : <></>
}

export function ManoolItemRowExp(props: ManoolItemRowExpProps) {
    const rem = props.index % 3
    const rows: React.JSX.Element[] = [];
    for (let i = 0; i < rem + 1; i++) {
        switch (rem) {
            case 0:
                rows.push(ManoolItemRowExpFirst(props));
                break;
            case 1:
                rows.push(ManoolItemRowExpSecond(props));
                break;
            case 2:
                rows.push(ManoolItemRowExpThird(props));
                break;
            default:
                return <></>
        }
    }
    return <div className="flex flex-col">{rows}</div>
}

const expandedElementBuilder = (record: ItemRow, index: number, indent: number, expanded: boolean) => {
    return ManoolItemRowExp({record, index, indent, expanded})
}

export interface ExpandIconProps {
    expanded: boolean,
    onExpand: () => void
}

export function ExpandIcon(props: ExpandIconProps): React.JSX.Element {
    return (props.expanded) ?
        <div className="px-5">
            <FaArrowUp onClick={props.onExpand} className="bg-sky-400 px-2 w-10 h-10 text-white rounded-full"/>
        </div> :
        <div className="px-5">
            <FaArrowDown onClick={props.onExpand} className="bg-sky-400 px-2 w-10 h-10 text-white rounded-full"/>
        </div>
}

export default function ManoolGrid() {
    const [expandedRowKeys, setExpandedRowKeys] = React.useState<readonly Key[]>([]);
    const [expandedColumn, setExpandedColumn] = React.useState<boolean>(false);
    const columns: ColumnsType<ItemRow> = [
        EXPAND_COLUMN,
        {
            dataIndex: 'first',
            render: (_value: string, row: ItemRow, index: number) =>
                ManoolItem({
                    value: _value,
                    onClick: () => {
                        setExpandedColumn(!expandedColumn)
                    }
                }),
        },
        {
            hidden: !expandedColumn,
            dataIndex: 'second',
            render: (_value: string, row: ItemRow, index: number) => ManoolItem({
                value: _value,
                onClick: () => {
                }
            }),
        },
        {
            dataIndex: 'third',
            render: (_value: string, row: ItemRow, index: number) => ManoolItem({
                value: _value, onClick: () => {
                }
            }),
        },
        {
            dataIndex: 'fourth',
            render: (_value: string, row: ItemRow, index: number) => ManoolItem({
                value: _value, onClick: () => {
                }
            }),
        }
    ]

    let onExpand: (expanded: boolean, record: ItemRow) => void = (expanded, record) => {
        let newKeys = expandedRowKeys.map(a => Object.assign({}, a))
        let index = newKeys.findIndex((value, index, obj) => {
            return obj[index] == value
        })
        if (index == -1) {
            newKeys.push(record.key)
        } else {
            newKeys.splice(index, 1)
        }
        setExpandedRowKeys(newKeys)
    };

    return <>
        <Table
            tableLayout={"fixed"}
            className="flex flex-wrap"
            columns={columns}
            expandable={{
                showExpandColumn: true,
                expandedRowKeys: expandedRowKeys,
                expandIcon: (props) => ExpandIcon({
                    expanded: props.expanded,
                    onExpand: () => {
                        onExpand(props.expanded, props.record)
                    }
                }),
                onExpand: onExpand,
                rowExpandable: () => true,
                onExpandedRowsChange: setExpandedRowKeys,
                expandedRowRender: expandedElementBuilder
            }}
            data={rows}
        />
    </>
}
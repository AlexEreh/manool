'use client'
import Table from 'rc-table'
import Image from "next/image"
import React, {Key} from "react";

export class ItemRow {
    public first: string
    public second: string
    public third: string
    public fourth: string
    public key: React.Key

    constructor(key: React.Key, ...items: string[]) {
        this.first = items[0]
        this.second = items[1]
        this.third = items[2]
        this.fourth = items[3]
        this.key = key
    }
}

export interface ManoolItemProps { text: string }

export function ManoolItem(props: ManoolItemProps) {
    return <div className="flex flex-col gap-0 flex-wrap">
        <Image src="/img.png" alt="Manool Image" width={200} height={200} layout="raw"/>
        <div className="flex justify-center py-2">
            <p className="text-wrap text-center">{props.text}</p>
        </div>
    </div>
}

export interface ManoolItemRowProps { item: ItemRow }

export function ManoolItemRow(props: ManoolItemRowProps) {
    return <div className="flex flex-row gap-0">
        <ManoolItem text={props.item.first}/>
        <ManoolItem text={props.item.second}/>
        <ManoolItem text={props.item.third}/>
        <ManoolItem text={props.item.fourth}/>
    </div>
}

const columns = [{render: (_value: string, row: ItemRow) => ManoolItemRow({item: row})}]
const data = ["СЧАСТЬЕ", "ГРУСТЬ", "РАЗДРАЖЕНИЕ", "ОДИНОЧЕСТВО", "УДИВЛЕНИЕ", "СКЕПСИС", "ЯРОСТЬ", "ЗАДУМЧИВОСТЬ", "СТЫД", "УСТАЛОСТЬ", "САРКАЗМ", "СТРАСТЬ"]
const rows: ItemRow[] = [new ItemRow(0, ...data.slice(0, 4)), new ItemRow(1, ...data.slice(4, 8)), new ItemRow(2, ...data.slice(8, 12)),]

export interface ManoolItemRowExpProps {
    record: ItemRow,
    index: number,
    indent: number,
    expanded: boolean
}

export function ManoolItemRowExpFirst(props: ManoolItemRowExpProps) {
    return (props.expanded && props.record.key == rows[props.record.key as number].key) ? <div
        className="flex justify-center flex-row gap-0"
        onClick={() => {

        }}>
        <Image src="/manulahuel.jpg" style={{

        }} alt="Manool Ahuel" width={200} height={200} layout="raw"/>
    </div> : <></>
}

export function ManoolItemRowExpSecond(props: ManoolItemRowExpProps) {
    return (props.expanded && props.record.key == rows[props.record.key as number].key) ? <div
        className="flex justify-center flex-row gap-0"
        onClick={() => {

        }}>
        <Image src="/manulahuel.jpg" className="hue-rotate-90 blur-sm" alt="Manool Ahuel" width={200} height={200} layout="raw"/>
    </div> : <></>
}

export function ManoolItemRowExpThird(props: ManoolItemRowExpProps) {
    return (props.expanded && props.record.key == rows[props.record.key as number].key) ? <div
        className="flex justify-center flex-row gap-0"
        onClick={() => {

        }}>
        <Image src="/manulahuel.jpg" className="hue-rotate-180 contrast-200" alt="Manool Ahuel" width={200} height={200} layout="raw"/>
    </div> : <></>
}

export function ManoolItemRowExp(props: ManoolItemRowExpProps) {
    const rem = props.index % 3
    const rows: React.JSX.Element[] = [];
    for (let i = 0; i < rem + 1; i++) {
        switch (rem) {
            case 0: rows.push(ManoolItemRowExpFirst(props)); break;
            case 1: rows.push(ManoolItemRowExpSecond(props)); break;
            case 2: rows.push(ManoolItemRowExpThird(props)); break;
            default: return <></>
        }
    }
    return <div className="flex flex-col">{rows}</div>
}

const expandedElementBuilder = (record: ItemRow, index: number, indent: number, expanded: boolean) => {
    return ManoolItemRowExp({record, index, indent, expanded})
}

export default function ManoolGrid() {
    const [expandedRowKeys, setExpandedRowKeys] = React.useState<readonly Key[]>([]);
    return <>
        <Table
            tableLayout={"fixed"}
            className="flex flex-wrap"
            columns={columns}
            expandable={{
                expandedRowKeys: expandedRowKeys,
                rowExpandable: () => true,
                expandRowByClick: true,
                onExpandedRowsChange: setExpandedRowKeys,
                expandedRowRender: expandedElementBuilder
            }}
            data={rows}
        />
    </>
}
"use client";
import SuperSet from "@/component/miniatures/SuperSet";

export default function TestPage() {
    return (
        <div>
            <SuperSet exerciseNames={['ex1', 'ex2']} allUnits={new Set(['kg', 'lbs'])} />
        </div>
    )
}
"use client";

import { getAllExerciseNames } from '../../services/exercise.js';
import { getAllSetTypes, addASchedule } from '../../services/schedule.js';
import { getHistoricalData, updateExistingSchedule } from "../../services/history.js";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import SetToDropDownConvertor from '../../component/SetToDropDownConvertor.js';
import CreateSchemaPopupModule from '@/component/popups/createSchemaModule.js';
import styles from './schedule.module.css';

export default function Schedule() {
    const searchParams = useSearchParams();
    const queryDate = searchParams.get('date');

    const [allExerciseNames, setAllExerciseNames] = useState([]);
    const [allSetTypes, setAllSetTypes] = useState([]);
    const [allUnits, setAllUnits] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [showCreateScheduleDialog, setShowCreateScheduleDialog] = useState(false);


    const createSchedule = () => {
        setShowCreateScheduleDialog(!showCreateScheduleDialog);
    };

    useEffect(() => {
        if (searchParams.has('date')) {
            setDate(queryDate);
        } else {
            setDate(new Date().toISOString().split('T')[0]);
        }
        getAllSetTypes().then((data) => {
            setAllSetTypes(data['setType']);
            setAllUnits(data['weightUnit']);
        }).catch((error) => {
            console.error('Error:', error);
        });

        getAllExerciseNames().then((data) => {
            setAllExerciseNames(data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, [date]);

    return (
        <main>
            <input type="date" className={styles.date} value={date} onChange={(e) => setDate(e.target.value)} />
            {showCreateScheduleDialog && <CreateSchemaPopupModule allSetTypes={allSetTypes} allExerciseNames={allExerciseNames} allUnits={allUnits} setShowCreateScheduleDialog={setShowCreateScheduleDialog}/>}
            <button type="button" onClick={createSchedule} className={styles.createSchemaButton} />
        </main>
    );
}

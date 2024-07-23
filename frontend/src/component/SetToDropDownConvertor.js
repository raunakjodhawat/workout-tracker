import styles from './setToDropDownConvertor.module.css';

export default function SetToDropDownConvertor({options, selected, id, className}) {
    return (
        <div className={className != undefined ? className:  styles.container}>
            <select id = {id} className={styles.select} required defaultValue={selected}>
                {Array.from(options).map((v, i) => (
                    <option key={i}>{v}</option>
                ))}
            </select>
        </div>
    );
}
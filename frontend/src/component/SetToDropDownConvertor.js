import styles from './setToDropDownConvertor.module.css';

export default function SetToDropDownConvertor({options, selected, id}) {
    return (
        <div className={styles.container}>
            <select id = {id} className={styles.select} required defaultValue={selected}>
                {Array.from(options).map((v, i) => (
                    <option key={i}>{v}</option>
                ))}
            </select>
        </div>
    );
}